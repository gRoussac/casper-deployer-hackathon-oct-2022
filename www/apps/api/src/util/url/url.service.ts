import { Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlService {
  isValidHttpUrl(url_test: string): boolean {
    let url: URL;
    try {
      url = new URL(url_test);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  shortUrl(url_test: string): string {
    url_test = url_test ? url_test : environment.apiUrl;
    let url: URL;
    try {
      url = new URL(url_test);
    } catch (_) {
      return url_test;
    }
    return url.origin + url.pathname;
  }
}
