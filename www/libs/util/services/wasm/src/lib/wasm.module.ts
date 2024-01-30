import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEPLOYER_TOKEN, SDK_TOKEN, fetchSDKFactory, fetchWasmFactory, provideSafeAsync } from './wasm.factory';

const providerWasm = provideSafeAsync(DEPLOYER_TOKEN, fetchWasmFactory);
const providerSDK = provideSafeAsync(SDK_TOKEN, fetchSDKFactory);

@NgModule({
  imports: [CommonModule],
  providers: [providerWasm, providerSDK]
})
export class WasmModule { }
