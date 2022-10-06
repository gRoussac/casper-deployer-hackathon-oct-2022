import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { HighlightService } from '@casper-escrow/util-hightlight-webworker';
import { Subject } from 'rxjs';
import { Result } from './result';

@Injectable({
  providedIn: null
})
export class ResultService {

  private readonly result = new Subject<Result>;
  private readonly window = this.document.defaultView;

  constructor(
    private readonly highlightService: HighlightService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  getResult() {
    return this.result.asObservable();
  }

  async setResult<T>(title: string, result: object | string) {
    const res = result as T;
    const resultHtml = await this.highlightService.highlightMessage<T>(
      res
    );
    const isString = typeof result === 'string';
    this.result.next({
      title,
      result: isString ? res as string : JSON.stringify(res),
      resultHtml: isString ? res as string : resultHtml,
    });
  }

  copyClipboard(value: string) {
    this.window?.navigator.clipboard.writeText(value).catch(e => console.error(e));
  }

}
