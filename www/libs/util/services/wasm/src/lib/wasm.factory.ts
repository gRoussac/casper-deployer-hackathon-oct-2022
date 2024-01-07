import { ApplicationInitStatus, APP_INITIALIZER, inject, InjectionToken, Provider } from "@angular/core";
import init, { Deployer } from "deployer";

export const DEPLOYER_TOKEN = new InjectionToken<Deployer>('deployer');

export const fetchWasmFactory = async (): Promise<Deployer> => {
  const wasm = await init('assets/deployer_bg.wasm');
  return wasm && Deployer.new();
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