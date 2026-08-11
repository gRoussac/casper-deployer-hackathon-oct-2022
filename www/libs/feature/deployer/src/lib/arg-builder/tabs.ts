import { Tabs } from '@casper-ui/tabs';
import { CepId } from './cep-schema.service';

/** Tab list for the Args builder (Custom last). */
export const defaultTabs: { name: Tabs; cepId: CepId | null }[] = [
  { name: Tabs['CEP-18'], cepId: 'cep18' },
  { name: Tabs['CEP-78'], cepId: 'cep78' },
  { name: Tabs['CEP-85'], cepId: 'cep85' },
  { name: Tabs['CEP-95'], cepId: 'cep95' },
  { name: Tabs.Custom, cepId: null },
];
