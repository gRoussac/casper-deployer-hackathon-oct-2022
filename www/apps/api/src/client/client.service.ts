import { Injectable } from '@nestjs/common';
import { CasperClient } from 'casper-js-sdk';
import { UrlService } from '../util/url/url.service';

@Injectable()

export class ClientService {
  private _apiUrl!: string;
  private casperClient!: CasperClient;

  constructor(
    private readonly urlService: UrlService
  ) { }

  getClient(apiUrl?: string) {
    if (apiUrl && this._apiUrl === apiUrl) {
      return this.casperClient;
    }
    apiUrl = this.urlService.shortUrl(apiUrl);
    if (apiUrl && !this.urlService.isValidHttpUrl(apiUrl)) {
      throw ('url seems invalid');
    }
    this._apiUrl = apiUrl;
    this.casperClient = new CasperClient(apiUrl);
    return this.casperClient;
  }
}
