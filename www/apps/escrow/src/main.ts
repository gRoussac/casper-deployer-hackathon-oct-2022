import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, ImportedNgModuleProviders, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Provider } from '@nestjs/common';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const providers: Array<Provider | ImportedNgModuleProviders> = [
  importProvidersFrom([
    // HttpClientModule
  ])
];

bootstrapApplication(AppComponent, { providers })
  .then(() => {
    //
  })
  .catch(() => {
    //
  });