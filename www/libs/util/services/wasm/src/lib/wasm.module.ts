import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESCROW_TOKEN, fetchWasmFactory, provideSafeAsync } from './wasm.service';

const providers = provideSafeAsync(ESCROW_TOKEN, fetchWasmFactory);

@NgModule({
  imports: [CommonModule],
  providers
})
export class WasmModule { }
