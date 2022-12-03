
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, ImportedNgModuleProviders, importProvidersFrom, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { config, ENV_CONFIG } from '@casper-util/config';
import { WasmModule } from '@casper-util/wasm';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { Toaster, TOASTER_TOKEN } from '@casper-util/toaster';
declare const toastr: Toaster;

if (environment.production) {
  enableProdMode();
}

const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@casper-deployer/deployer')
        .then(m => m.DeployerComponent)
  }, {
    path: 'escrow',
    loadComponent: () =>
      import('@casper-escrow/escrower')
        .then(m => m.EscrowerComponent)
  },
];

const providers: Array<Provider | ImportedNgModuleProviders> = [
  importProvidersFrom([
    HttpClientModule,
    WasmModule,
    RouterModule.forRoot(ROUTES)
  ])
];

providers.push({
  provide: ENV_CONFIG,
  useValue: config
});

providers.push({
  provide: TOASTER_TOKEN,
  useValue: toastr
});

bootstrapApplication(AppComponent, { providers })
  .then(() => {
    //
  })
  .catch(() => {
    //
  });