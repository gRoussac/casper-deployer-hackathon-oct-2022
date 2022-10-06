
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, ImportedNgModuleProviders, importProvidersFrom, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { UtilHihlightWebworkerModule } from '@casper-escrow/util-hightlight-webworker';
import { ENV_CONFIG } from '@casper-escrow/util-tokens';
import { WasmModule } from '@casper-escrow/util-wasm';
import { AppComponent } from './app/app.component';
import { config } from './config';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const providers: Array<Provider | ImportedNgModuleProviders> = [
  importProvidersFrom([
    HttpClientModule,
    WasmModule
  ])
];

providers.push({
  provide: ENV_CONFIG,
  useValue: config
});

bootstrapApplication(AppComponent, { providers })
  .then(() => {
    //
  })
  .catch(() => {
    //
  });