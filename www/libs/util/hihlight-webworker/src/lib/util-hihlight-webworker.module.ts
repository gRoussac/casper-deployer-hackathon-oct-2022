import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HIGHLIGHT_WEBWORKER_FACTORY } from './util-hihlight-webworker.token';
import PromiseWorker from 'promise-worker';
import { HighlightService } from './highlight.service';

const highlightProvider = {
  provide: HIGHLIGHT_WEBWORKER_FACTORY,
  useValue: function (): [Worker, PromiseWorker] {
    const worker = new Worker(new URL(
      './util-hihlight-webworker', import.meta.url), {
      name: 'highlight.worker',
      type: 'module',
    });
    return [worker, new PromiseWorker(worker)];
  },
};

@NgModule({
  imports: [CommonModule],
  providers: [highlightProvider, HighlightService]
})
export class UtilHihlightWebworkerModule { }
