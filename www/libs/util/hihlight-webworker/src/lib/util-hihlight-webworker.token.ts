import { InjectionToken } from '@angular/core';
import PromiseWorker from 'promise-worker';

export const HIGHLIGHT_WEBWORKER_FACTORY = new InjectionToken<() => [Worker, PromiseWorker]>(
  'highlight'
);