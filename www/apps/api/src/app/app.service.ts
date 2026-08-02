import { Injectable } from '@nestjs/common';
import {
  DeployReturn,
  Peer,
  TransactionReturn,
  Users,
} from '@casper-api/api-interfaces';
import { environment } from '../environments/environment';
import { SDKService } from '../sdk/sdk.service';
import {
  Deploy,
  DictionaryItemStrParams,
  GetDeployResult,
  GetTransactionResult,
  PublicKey,
  PurseIdentifier,
  Transaction,
  getSpeculativeExecDeployOptions,
  getSpeculativeExecTxnOptions,
} from 'casper-rust-wasm-sdk-nodejs';

@Injectable()
export class AppService {
  constructor(private readonly sdkService: SDKService) {}

  getUsers(): Users {
    return environment.users;
  }

  async getPeers(apiUrl: string): Promise<Peer[]> {
    return (await this.sdkService.getCasperSDK(apiUrl).get_peers()).peers?.map(
      (peer, index) => {
        peer.address = this.rewritePeerAsRpcUrl(peer.address, apiUrl, index);
        return peer;
      },
    );
  }

  /**
   * Casper 2 / NCTL 2: peer gossip ports are not JSON-RPC.
   * Rewrite selectable peer URLs for the network profile of the current apiUrl.
   * Never force legacy launcher port 7777.
   */
  private rewritePeerAsRpcUrl(
    peerAddress: string,
    apiUrl: string,
    index: number,
  ): string {
    const [rawHost] = (peerAddress || '').split(':');
    const host =
      !rawHost || rawHost === '0.0.0.0' || rawHost === '127.0.0.1'
        ? 'localhost'
        : rawHost;

    let api: URL;
    try {
      api = new URL(apiUrl.includes('://') ? apiUrl : `http://${apiUrl}`);
    } catch {
      return `http://${host}:11101`;
    }

    if (
      api.hostname.includes('testnet.casper.network') ||
      apiUrl.includes('node.testnet.casper.network')
    ) {
      return 'https://node.testnet.casper.network';
    }
    if (
      api.hostname.includes('mainnet.casper.network') ||
      apiUrl.includes('node.mainnet.casper.network')
    ) {
      return 'https://node.mainnet.casper.network';
    }

    const apiPort = parseInt(api.port || '11101', 10);
    const isLocal =
      api.hostname === 'localhost' ||
      api.hostname === '127.0.0.1' ||
      host === 'localhost';

    // NCTL 2 docker: RPC 11101-11105
    if (isLocal || (apiPort >= 11101 && apiPort <= 11105)) {
      const rpcPort = 11101 + (index % 5);
      return `http://${host}:${rpcPort}`;
    }

    // Custom: reuse scheme + port from the selected node
    const portPart = api.port ? `:${api.port}` : '';
    return `${api.protocol}//${host}${portPart}`;
  }

  async getStatus(apiUrl: string): Promise<string> {
    return JSON.stringify(
      (await this.sdkService.getCasperSDK(apiUrl).get_node_status())
        .api_version && 'status',
    );
  }

  async getStateRootHash(apiUrl: string, stringify = false): Promise<string> {
    const stateRootHash = (
      await this.sdkService.getCasperSDK(apiUrl).get_state_root_hash()
    ).toString();
    if (stringify) {
      return JSON.stringify(stateRootHash);
    }
    return stateRootHash;
  }

  async getPurseURef(
    publicKey: string,
    apiUrl: string,
    stringify = false,
  ): Promise<string> {
    if (!publicKey) {
      return;
    }
    const sdk = this.sdkService.getCasperSDK(apiUrl);

    try {
      const purse = new PublicKey(publicKey).toPurseUref().toFormattedString();
      if (stringify) {
        return JSON.stringify(purse);
      }
      return purse;
    } catch (err) {
      console.warn('toPurseUref failed, trying get_entity/get_account', err);
    }

    try {
      const entity = await sdk.get_entity(
        sdk.get_entity_options({
          entity_identifier_as_string: publicKey,
        }),
      );
      const purse =
        entity?.entity_result?.AddressableEntity?.entity?.main_purse ||
        entity?.entity_result?.AddressableEntity?.entity?.entity?.main_purse;
      if (purse) {
        if (stringify) {
          return JSON.stringify(purse);
        }
        return purse;
      }
    } catch (err) {
      console.warn('get_entity purse lookup failed', err);
    }

    const options = sdk.get_account_options({
      account_identifier_as_string: publicKey,
    });
    const account = (await sdk.get_account(options)).account;
    if (stringify) {
      return JSON.stringify(account.main_purse);
    }
    return account.main_purse;
  }

  async getBlockState(
    stateRootHash: string,
    key: string,
    path: string[] = [],
    apiUrl: string,
  ): Promise<object> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const trimmedPath = (path || []).map((p) => p.trim()).filter(Boolean);
    const options = sdk.query_global_state_options({
      state_root_hash_as_string: stateRootHash,
      key_as_string: key,
      path: trimmedPath,
      path_as_string: trimmedPath.join('/'),
    });
    return (await sdk.query_global_state(options)).stored_value;
  }

  async getBalance(
    stateRootHash: string,
    purseURef: string,
    apiUrl: string,
    stringify = false,
  ) {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    if (!stateRootHash) {
      stateRootHash = await this.getStateRootHash(apiUrl);
    }
    const options = sdk.query_balance_options({
      purse_identifier_as_string: purseURef,
      state_root_hash_as_string: stateRootHash,
    });
    const balance_value = (await sdk.query_balance(options)).balance;
    if (stringify) {
      return JSON.stringify(balance_value);
    }
    return balance_value;
  }

  async getBalanceOfByPublicKey(
    publicKey: string,
    apiUrl: string,
    stringify = false,
  ): Promise<string> {
    if (!publicKey) {
      return;
    }
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    try {
      const options = sdk.query_balance_options({
        purse_identifier: new PurseIdentifier(new PublicKey(publicKey)),
      });
      const balance_value = (await sdk.query_balance(options)).balance;
      if (stringify) {
        return JSON.stringify(balance_value);
      }
      return balance_value;
    } catch (err) {
      console.warn(
        'query_balance by PublicKey failed, falling back to purse uref',
        err,
      );
    }
    const stateRootHash = await this.getStateRootHash(apiUrl);
    const purse_identifier_as_string = await this.getPurseURef(
      publicKey,
      apiUrl,
    );
    const options = sdk.query_balance_options({
      state_root_hash_as_string: stateRootHash,
      purse_identifier_as_string,
    });
    const balance_value = (await sdk.query_balance(options)).balance;
    if (stringify) {
      return JSON.stringify(balance_value);
    }
    return balance_value;
  }

  async getDeploy(
    deployHash: string,
    apiUrl: string,
  ): Promise<GetDeployResult> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const options = sdk.get_deploy_options({
      deploy_hash_as_string: deployHash,
    });
    return (await sdk.get_deploy(options)).toJson();
  }

  async getTransaction(
    transactionHash: string,
    apiUrl: string,
  ): Promise<GetTransactionResult> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const options = sdk.get_transaction_options({
      transaction_hash_as_string: transactionHash,
    });
    return (await sdk.get_transaction(options)).toJson();
  }

  async putDeploy(
    signedDeploy: Deploy,
    speculative = false,
    apiUrl: string,
  ): Promise<DeployReturn> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    if (signedDeploy && !signedDeploy.validateDeploySize()) {
      console.error(signedDeploy);
      return;
    }
    if (speculative) {
      console.debug('speculative', speculative);
      return (
        await sdk.speculative_exec_deploy({
          deploy: signedDeploy,
        } as getSpeculativeExecDeployOptions)
      ).toJson();
    }
    return (await sdk.put_deploy(signedDeploy)).toJson();
  }

  async putTransaction(
    signedTransaction: Transaction,
    speculative = false,
    apiUrl: string,
  ): Promise<TransactionReturn> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    if (signedTransaction && !signedTransaction.verify()) {
      console.warn('transaction verify failed', signedTransaction);
    }
    if (speculative) {
      console.debug('speculative transaction', speculative);
      const result = await sdk.speculative_exec({
        transaction: signedTransaction.toJson(),
      } as getSpeculativeExecTxnOptions);
      const json = result.toJson();
      return {
        transaction_hash:
          json?.transaction_hash?.toString?.() || json?.transaction_hash || '',
        ...json,
      };
    }
    const result = await sdk.put_transaction(signedTransaction);
    const json = result.toJson();
    const transaction_hash =
      result.transaction_hash?.toString?.() ||
      json?.transaction_hash?.toString?.() ||
      json?.transaction_hash ||
      '';
    return { transaction_hash, ...json };
  }

  async getDictionaryItemByURef(
    stateRootHash: string,
    dictionaryItemKey: string,
    seedUref: string,
    apiUrl: string,
  ): Promise<object> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const dictionary_item_params = new DictionaryItemStrParams();
    dictionary_item_params.setUref(seedUref, dictionaryItemKey);
    const options = sdk.get_dictionary_item_options({
      state_root_hash_as_string: stateRootHash,
      dictionary_item_params: dictionary_item_params.toJson(),
    });
    return (await sdk.get_dictionary_item(options)).stored_value;
  }

  async getDictionaryItemByName(
    stateRootHash: string,
    contractHash: string,
    dictionaryName: string,
    dictionaryItemKey: string,
    apiUrl: string,
  ): Promise<object> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    const key = contractHash?.trim() || '';
    const attempts: Array<(params: DictionaryItemStrParams) => void> = [];

    if (key.startsWith('entity-') || key.startsWith('account-hash-')) {
      attempts.push((params) =>
        params.setEntityNamedKey(key, dictionaryName, dictionaryItemKey),
      );
    }
    if (key.startsWith('account-hash-')) {
      attempts.push((params) =>
        params.setAccountNamedKey(key, dictionaryName, dictionaryItemKey),
      );
    }
    attempts.push((params) =>
      params.setEntityNamedKey(key, dictionaryName, dictionaryItemKey),
    );
    attempts.push((params) =>
      params.setContractNamedKey(key, dictionaryName, dictionaryItemKey),
    );
    attempts.push((params) =>
      params.setAccountNamedKey(key, dictionaryName, dictionaryItemKey),
    );

    let lastError: unknown;
    for (const setup of attempts) {
      try {
        const dictionary_item_params = new DictionaryItemStrParams();
        setup(dictionary_item_params);
        const options = sdk.get_dictionary_item_options({
          state_root_hash_as_string: stateRootHash,
          dictionary_item_params: dictionary_item_params.toJson(),
        });
        return (await sdk.get_dictionary_item(options)).stored_value;
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError;
  }
}
