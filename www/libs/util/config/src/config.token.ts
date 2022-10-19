import { InjectionToken } from "@angular/core";
import { EnvironmentConfig } from "./config";

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>('EnvironmentConfig');