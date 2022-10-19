import { ApplicationInitStatus, APP_INITIALIZER, inject, InjectionToken, Provider } from "@angular/core";
import init, { Escrow } from "escrow";

export const ESCROW_TOKEN = new InjectionToken<Escrow>('escrow');

export const fetchWasmFactory = async (): Promise<Escrow> => {
  const wasm = await init('assets/escrow_bg.wasm');
  return wasm && Escrow.new();
};

export function provideSafeAsync<T>(
  token: T | InjectionToken<T>,
  initializer: () => Promise<T>
): Provider[] {
  const container: { value?: T; } = { value: undefined };
  return [
    {
      provide: APP_INITIALIZER,
      useValue: async () => {
        container.value = await initializer();
      },
      multi: true,
    },
    {
      provide: token,
      useFactory: () => {
        if (!inject(ApplicationInitStatus).done) {
          throw new Error(
            `Cannot inject ${token} until bootstrap is complete.`
          );
        }
        return container.value;
      },
    },
  ];
}