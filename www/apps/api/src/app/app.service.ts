import { Injectable } from '@nestjs/common';
import { DeployReturn, Peer, Purse, Users } from '@casper-api/api-interfaces';
import { environment } from '../environments/environment';
import { CLPublicKey, DeployUtil, GetDeployResult } from "casper-js-sdk";
import { BigNumber } from '@ethersproject/bignumber';
import { StoredValue } from 'casper-js-sdk/dist/lib/StoredValue';
import { ClientService } from '../client/client.service';
import { ServiceService } from '../service/service.service';

@Injectable()
export class AppService {

  constructor(
    private readonly client: ClientService,
    private readonly service: ServiceService
  ) { }

  getUsers(): Users {
    return environment.users;
  }

  async getPeers(apiUrl: string): Promise<Peer[]> {
    return (await this.service.getService(apiUrl).getPeers()).peers?.map(peer => {
      const address = peer.address.split(':');
      peer.address = ['http://', address.shift(), ':', '7777'].join('');
      return peer;
    });
  }

  async getStateRootHash(apiUrl: string, stringify = false): Promise<string> {
    const stateRootHash = await this.service.getService(apiUrl).getStateRootHash();
    if (stringify) {
      return JSON.stringify(stateRootHash);
    }
    return stateRootHash;
  }

  async getStatus(apiUrl: string): Promise<string> {
    return JSON.stringify((await this.service.getService(apiUrl).getStatus()).api_version && 'status');
  }

  async getPurse(publicKey: string, apiUrl: string): Promise<Purse> {
    const balance = (await this.getAccountBalance(publicKey, apiUrl)).toString();
    return { balance };
  }

  async getPurseURef(stateRootHash: string, publicKey: string, apiUrl: string, stringify = false): Promise<string> {
    const purse_uref = await this.service.getService(apiUrl).getAccountBalanceUrefByPublicKey(stateRootHash, CLPublicKey.fromHex(publicKey));
    if (stringify) {
      return JSON.stringify(purse_uref);
    }
    return purse_uref;
  }

  async getBlockState(stateRootHash: string, key: string, path: string[] = [], apiUrl: string): Promise<StoredValue> {
    const storedValue = await this.service.getService(apiUrl).getBlockState(stateRootHash, key, path);
    return storedValue;
  }

  async getBalance(stateRootHash: string, purseURef: string, apiUrl: string, stringify = false): Promise<BigNumber | string> {
    if (!stateRootHash) {
      stateRootHash = await this.getStateRootHash(apiUrl);
    }
    const balanceBN = await this.service.getService(apiUrl).getAccountBalance(stateRootHash, purseURef);
    if (stringify) {
      const balance = balanceBN.toString();
      return JSON.stringify(balance);
    }
    return balanceBN;
  }

  async getDeploy(deployHash: string, apiUrl: string): Promise<GetDeployResult> {
    return await this.service.getService(apiUrl).getDeployInfo(deployHash);
  }

  async putDeploy(signedDeploy: DeployUtil.Deploy, speculative = false, apiUrl: string): Promise<DeployReturn> {
    if (signedDeploy && !DeployUtil.validateDeploy(signedDeploy)) {
      console.error(signedDeploy);
      return;
    }
    // TODO await this.checkDeploySize(signedDeploy)
    if (speculative) {
      console.log('speculative', speculative);
      // TODO this seems buggy returns Method not found
      return await this.service.getService(apiUrl).speculativeDeploy(signedDeploy);
    }
    return await this.service.getService(apiUrl).deploy(signedDeploy);
  }

  // TODO returns void ???
  async checkDeploySize(deploy: DeployUtil.Deploy, apiUrl: string): Promise<void> {
    return await this.service.getService(apiUrl).checkDeploySize(deploy);
  }

  async getDictionaryItemByURef(stateRootHash: string, dictionaryItemKey: string, seedUref: string, rawData = false, apiUrl: string): Promise<StoredValue> {
    return await this.service.getService(apiUrl).getDictionaryItemByURef(stateRootHash, dictionaryItemKey, seedUref, { rawData });
  }

  async getDictionaryItemByName(stateRootHash: string, contractHash: string, dictionaryName: string, dictionaryItemKey: string, rawData = false, apiUrl: string): Promise<StoredValue> {
    return await this.service.getService(apiUrl).getDictionaryItemByName(stateRootHash, contractHash, dictionaryName, dictionaryItemKey, { rawData });
  }

  async getBalanceOfByPublicKey(publicKey: string, apiUrl: string, stringify = false): Promise<BigNumber | string> {
    const balanceBN = await this.client.getClient(apiUrl).balanceOfByPublicKey(CLPublicKey.fromHex(publicKey));
    if (stringify) {
      const balance = balanceBN.toString();
      return JSON.stringify(balance);
    }
    return balanceBN;
  }

  private async getAccountBalance(publicKey: string, apiUrl: string): Promise<BigNumber> {
    if (!publicKey) { return; }
    const casperService = this.service.getService(apiUrl);
    const stateRootHash = await this.getStateRootHash(apiUrl);
    const purseURef = await casperService.getAccountBalanceUrefByPublicKey(stateRootHash, CLPublicKey.fromHex(publicKey));
    return await this.getBalance(stateRootHash, purseURef, apiUrl) as BigNumber;
  }
}
