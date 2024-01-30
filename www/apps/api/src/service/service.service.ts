import { Injectable } from '@nestjs/common';
import { CasperServiceByJsonRPC } from 'casper-js-sdk';
import { UrlService } from '../util/url/url.service';

@Injectable()
export class ServiceService {

  private apiUrl!: string;
  private casperService!: CasperServiceByJsonRPC;

  constructor(
    private readonly urlService: UrlService
  ) { }

  getService(apiUrl: string): CasperServiceByJsonRPC {
    if (apiUrl && this.apiUrl === apiUrl) {
      return this.casperService;
    }
    apiUrl = this.urlService.shortUrl(apiUrl);
    if (!apiUrl || !this.urlService.isValidHttpUrl(apiUrl)) {
      throw TypeError('url seems invalid');
    }
    this.apiUrl = apiUrl;
    this.casperService = new CasperServiceByJsonRPC(apiUrl);
    return this.casperService;
  }
}
