import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
