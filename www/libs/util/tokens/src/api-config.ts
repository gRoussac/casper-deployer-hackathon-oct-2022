import { InjectionToken } from "@angular/core";
import { EnvironmentConfig } from "@casper-escrow/api-interfaces";

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>('EnvironmentConfig');