
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, ImportedNgModuleProviders, importProvidersFrom, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { config, ENV_CONFIG } from '@casper-util/config';
import { WasmModule } from '@casper-util/wasm';
import { AppComponent } from './app/app.component';
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