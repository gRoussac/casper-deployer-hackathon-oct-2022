import { Inject, Injectable } from '@angular/core';
import { api_interface, Error, Purse, Users } from '@casper-api/api-interfaces';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';

@Injectable({
  providedIn: null
})
export class UsersService {

  constructor(
    @Inject(ENV_CONFIG) private readonly config: EnvironmentConfig,
    private readonly http: HttpClient
  ) { }

  get(): Observable<Users> {
    return this.http.get<Users>(`${this.config['api_prefix']}${api_interface.Users}`);
  }

  getPurse(publicKey: string, apiUrl?: string): Observable<Purse | Error> {
    let params = new HttpParams();
    params = params.append('publicKey', publicKey);
    apiUrl && (params = params.append('apiUrl', apiUrl));
    return this.http
      .get<Purse | Error>(`${this.config['api_prefix']}${api_interface.Purse}`, { params })
      .pipe(
        map((response: Purse | Error) => {
          (response as Error).name && console.error(response);
          return response;
        }));
  }
}
