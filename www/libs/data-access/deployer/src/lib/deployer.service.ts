import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { api_interface, DeployReturn, Peer, State } from '@casper-escrow/api-interfaces';
import { map, Observable, Subject, timeout } from 'rxjs';
import { DeployUtil, GetDeployResult } from 'casper-js-sdk';
import { StoredValue } from 'casper-js-sdk/dist/lib/StoredValue';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-deployer/config';

@Injectable({
  providedIn: 'root'
})
export class DeployerService {

  private readonly state = new Subject<State>;

  constructor(
    @Inject(ENV_CONFIG) private readonly config: EnvironmentConfig,
    private readonly http: HttpClient
  ) { }

  setState(state: State) {
    this.state.next(state);
  }

  getState() {
    return this.state.asObservable();
  }

  getStateRootHash(apiUrl: string): Observable<string> {
    let params = new HttpParams();
    params = params.append('apiUrl', apiUrl);
    return this.http
      .get<string | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.GetStateRootHash}`, { params })
      .pipe(
        map(response => {
          const stateRootHash = this.handleResponse<string>(response);
          this.setState({
            stateRootHash,
            apiUrl
          });
          return stateRootHash;
        })
      );
  }

  getPeers(apiUrl: string): Observable<Peer[] | string> {
    let params = new HttpParams();
    params = params.append('apiUrl', apiUrl);

    return this.http
      .get<Peer[] | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.Peers}`, { params })
      .pipe(
        map(response => this.handleResponse<Peer[]>(response)),
        timeout(20000),
      );
  }

  getStatus(apiUrl: string): Observable<string> {
    let params = new HttpParams();
    params = params.append('apiUrl', apiUrl);
    this.setState({
      status: ''
    });
    return this.http
      .get<string | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.Status}`, { params })
      .pipe(
        map(response => {
          const status = this.handleResponse<string>(response);
          this.setState({
            apiUrl,
            status
          });
          return status;
        }),
        timeout(20000)
      );
  }

  getPurseURef(stateRootHash: string, publicKey: string, apiUrl?: string): Observable<string> {
    let params = new HttpParams();
    params = params.append('stateRootHash', stateRootHash);
    params = params.append('publicKey', publicKey);
    apiUrl && (params = params.append('apiUrl', apiUrl));

    return this.http
      .get<string | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.PurseURef}`, { params })
      .pipe(
        map(response => {
          const purseURef = this.handleResponse<string>(response);
          return purseURef;
        }),
        timeout(20000)
      );
  }

  getBalance(stateRootHash: string, purseURef: string, apiUrl?: string): Observable<string> {
    let params = new HttpParams();
    apiUrl && (params = params.append('apiUrl', apiUrl));
    params = params.append('stateRootHash', stateRootHash);
    params = params.append('purseURef', purseURef);

    return this.http
      .get<string | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.Balance}`, { params })
      .pipe(
        map(response => this.handleResponse<string>(response)),
        timeout(20000),
      );
  }

  getBalanceOfByPublicKey(publicKey: string, apiUrl?: string): Observable<string> {
    let params = new HttpParams();
    apiUrl && (params = params.append('apiUrl', apiUrl));
    params = params.append('publicKey', publicKey);

    return this.http
      .get<string | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.BalanceOfByPublicKey}`, { params })
      .pipe(
        map(response => this.handleResponse<string>(response)),
        timeout(20000),
      );
  }

  getBlockState(stateRootHash: string, key: string, paths?: string, apiUrl?: string): Observable<StoredValue | string> {
    let params = new HttpParams();
    params = params.append('stateRootHash', stateRootHash);
    params = params.append('key', key);
    const path = paths && paths?.split(this.config['path_sep']).map(path => path.trim());
    path && (params = params.append('path', JSON.stringify(path)));
    apiUrl && (params = params.append('apiUrl', apiUrl));

    return this.http
      .get<StoredValue | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.State}`, { params })
      .pipe(
        map(response => {
          const storedValue = this.handleResponse<StoredValue>(response);
          return storedValue;
        }),
        timeout(20000)
      );
  }

  getDictionaryItemByName(stateRootHash: string, contractHash: string, dictionaryName: string, dictionaryItemKey: string, seedUref: string, apiUrl?: string): Observable<StoredValue | string> {
    let params = new HttpParams();
    params = params.append('stateRootHash', stateRootHash);
    params = params.append('contractHash', contractHash);
    params = params.append('dictionaryName', dictionaryName);
    params = params.append('dictionaryItemKey', dictionaryItemKey);
    params = params.append('seedUref', seedUref);
    params = params.append('rawData', false);
    apiUrl && (params = params.append('apiUrl', apiUrl));

    return this.http
      .get<StoredValue | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.Dictionary}`, { params })
      .pipe(
        map(response => {
          const storedValue = this.handleResponse<StoredValue>(response);
          return storedValue;
        }),
        timeout(20000)
      );
  }

  getDeploy(deployHash: string, apiUrl?: string): Observable<GetDeployResult | string> {
    let params = new HttpParams();
    apiUrl && (params = params.append('apiUrl', apiUrl));
    params = params.append('deployHash', deployHash);
    return this.http
      .get<GetDeployResult | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.Deploy_info}`, { params })
      .pipe(
        map(response => this.handleResponse<GetDeployResult>(response)),
        timeout(20000),
      );
  }

  putDeploy(signedDeploy: DeployUtil.Deploy, apiUrl?: string, speculative?: boolean): Observable<DeployReturn | string> {
    let params = new HttpParams();
    apiUrl && (params = params.append('apiUrl', apiUrl));
    speculative && (params = params.append('speculative', speculative));
    params = params.append('signedDeploy', JSON.stringify(DeployUtil.deployToJson(signedDeploy)));
    return this.http
      .post<DeployReturn | Error>(`${this.config['api_prefix']}${api_interface.Deployer}/${api_interface.Put_Deploy}`, params)
      .pipe(
        map(response => this.handleResponse<DeployReturn>(response)),
        timeout(20000),
      );
  }

  private handleResponse<T>(response: T | Error): string | T {
    if (Object.prototype.hasOwnProperty.call(response, "name")) {
      console.error(response);
      return JSON.stringify(response as T);
    }
    return response as T;
  }
}
