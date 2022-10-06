import { Inject, Injectable } from '@angular/core';
import { api_interface, EnvironmentConfig, Error, Purse, Users } from '@casper-escrow/api-interfaces';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENV_CONFIG } from '@casper-escrow/util-tokens';

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

  getPurse(publicKey: string): Observable<Purse | Error> {
    let params = new HttpParams();
    params = params.append('publicKey', publicKey);
    return this.http
      .get<Purse | Error>(`${this.config['api_prefix']}${api_interface.Purse}`, { params })
      .pipe(
        map((response: Purse | Error) => {
          (response as Error).name && console.error(response);
          return response;
        }));
  }
}
