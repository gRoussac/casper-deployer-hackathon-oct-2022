import { Injectable } from '@nestjs/common';
import { CasperClient } from 'casper-js-sdk';
import { UrlService } from '../util/url/url.service';

@Injectable()
export class ClientService {
  private apiUrl!: string;
  private casperClient!: CasperClient;

  constructor(
    private readonly urlService: UrlService
  ) { }

  getClient(apiUrl: string) {
    if (apiUrl && this.apiUrl === apiUrl) {
      return this.casperClient;
    }
    apiUrl = this.urlService.shortUrl(apiUrl);
    if (!apiUrl || !this.urlService.isValidHttpUrl(apiUrl)) {
      throw TypeError('url seems invalid');
    }
    this.apiUrl = apiUrl;
    this.casperClient = new CasperClient(apiUrl);
    return this.casperClient;
  }
}
