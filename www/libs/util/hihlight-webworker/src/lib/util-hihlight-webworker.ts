/// <reference lib="webworker" />

// this file is excluded from the compilation of the `highlight-webworker` library
// this is due to the fact that an app has to import it directly (instead of a path
// coming from a ts alias path)
//https://github.com/angular/angular-cli/issues/15059

import { highlight } from './util-hihlight';
import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker(function (message: object) {
  return highlight(message);
});