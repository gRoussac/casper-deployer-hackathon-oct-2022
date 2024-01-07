import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEPLOYER_TOKEN, fetchWasmFactory, provideSafeAsync } from './wasm.factory';

const providers = provideSafeAsync(DEPLOYER_TOKEN, fetchWasmFactory);

@NgModule({
  imports: [CommonModule],
  providers
})
export class WasmModule { }
