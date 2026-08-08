import { Injectable } from '@nestjs/common';
import {
  DeployReturn,
  Peer,
  TransactionReturn,
} from '@casper-api/api-interfaces';
import { SDKService } from '../sdk/sdk.service';
import {
  Deploy,
  DictionaryItemStrParams,
  GetDeployResult,
  GetTransactionResult,
  PublicKey,
  PurseIdentifier,
  Transaction,
} from 'casper-rust-wasm-sdk-nodejs';

@Injectable()
export class AppService {
  constructor(private readonly sdkService: SDKService) {}

  async getPeers(apiUrl: string): Promise<Peer[]> {
    const peers =
      (await this.sdkService.getCasperSDK(apiUrl).get_peers()).peers || [];

    // Collapse duplicate gossip entries before index-based NCTL rewrite.
    const seenGossip = new Set<string>();
    const unique = peers.filter((peer) => {
      const key = peer.address || '';
      if (!key || seenGossip.has(key)) {
        return false;
      }
      seenGossip.add(key);
      return true;
    });

    const rewritten = unique.map((peer, index) => ({
      ...peer,
      address: this.rewritePeerAsRpcUrl(peer.address, apiUrl, index),
    }));

    const seenRpc = new Set<string>();
    return rewritten.filter((peer) => {
      if (!peer.address || seenRpc.has(peer.address)) {
        return false;
      }
      seenRpc.add(peer.address);
      return true;
    });
  }

  /**
   * Map `info_get_peers` addresses into selectable URLs.
   *
   * - Local NCTL: rewrite gossip → RPC ports 11101–11105 (never launcher 7777).
   * - Public testnet/mainnet: keep each peer's host:port as `http://host:port`.
     These are network/gossip peers from the node (often :35000), not the official
     JSON-RPC preset — do not collapse them all to node.{test,main}net.casper.network
     (that filled the select with identical duplicates).
   * - Custom API with an explicit port: reuse that scheme/port on each peer host.
   */
  private rewritePeerAsRpcUrl(
    peerAddress: string,
    apiUrl: string,
    index: number,
  ): string {
    const [rawHost, rawPort] = (peerAddress || '').split(':');
    const host =
      !rawHost || rawHost === '0.0.0.0' || rawHost === '127.0.0.1'
        ? 'localhost'
        : rawHost;
    const peerPort = rawPort || '35000';

    let api: URL;
    try {
      api = new URL(apiUrl.includes('://') ? apiUrl : `http://${apiUrl}`);
    } catch {
      return `http://${host}:${peerPort}`;
    }

    const apiPort = api.port ? parseInt(api.port, 10) : NaN;
    const isLocal =
      api.hostname === 'localhost' ||
      api.hostname === '127.0.0.1' ||
      host === 'localhost';

    // NCTL 2 docker: RPC 11101-11105 (only when the selected API is local/NCTL)
    if (
      isLocal ||
      (Number.isFinite(apiPort) && apiPort >= 11101 && apiPort <= 11105)
    ) {
      const rpcPort = 11101 + (index % 5);
      return `http://${host}:${rpcPort}`;
    }

    const isPublicCasper =
      api.hostname.includes('testnet.casper.network') ||
      api.hostname.includes('mainnet.casper.network') ||
      apiUrl.includes('node.testnet.casper.network') ||
      apiUrl.includes('node.mainnet.casper.network');

    if (isPublicCasper || !api.port) {
      return `http://${host}:${peerPort}`;
    }

    // Custom: reuse scheme + port from the selected node
    return `${api.protocol}//${host}:${api.port}`;
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

  async putDeploy(signedDeploy: Deploy, apiUrl: string): Promise<DeployReturn> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    if (signedDeploy && !signedDeploy.validateDeploySize()) {
      console.error(signedDeploy);
      return;
    }
    return (await sdk.put_deploy(signedDeploy)).toJson();
  }

  async putTransaction(
    signedTransaction: Transaction,
    apiUrl: string,
  ): Promise<TransactionReturn> {
    const sdk = this.sdkService.getCasperSDK(apiUrl);
    if (signedTransaction && !signedTransaction.verify()) {
      console.warn('transaction verify failed', signedTransaction);
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
