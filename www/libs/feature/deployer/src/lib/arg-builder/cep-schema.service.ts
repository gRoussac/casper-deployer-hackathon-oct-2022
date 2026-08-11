import { Injectable } from '@angular/core';
import {
  CepArgField,
  CepSchema,
  cepFieldToNamedArg,
  NamedCLTypeArg,
} from '@casper-api/api-interfaces';
import init, { schemaJson, supportedCeps } from 'ceps-client-wasm-schema';

const CEP_IDS = ['cep18', 'cep78', 'cep85', 'cep95'] as const;
export type CepId = (typeof CEP_IDS)[number];

/** Loads ceps schema-only wasm and caches CEP-18/78/85/95 arg schemas. */
@Injectable({ providedIn: 'root' })
export class CepSchemaService {
  private readonly cache = new Map<string, CepSchema>();
  private initPromise: Promise<void> | null = null;
  private ready = false;

  /** Ensure wasm is initialized and schemas cached. */
  async ensureReady(): Promise<void> {
    if (this.ready) {
      return;
    }
    if (!this.initPromise) {
      this.initPromise = this.load();
    }
    await this.initPromise;
  }

  /** Synchronous get after ensureReady (or empty if not loaded). */
  getSchema(cep: string): CepSchema | undefined {
    return this.cache.get(normalizeCepId(cep));
  }

  installArgs(cep: string): NamedCLTypeArg[] {
    const schema = this.getSchema(cep);
    return (schema?.install ?? []).map((f) => cepFieldToNamedArg(f));
  }

  entrypointArgs(cep: string, entryPoint: string): NamedCLTypeArg[] {
    const schema = this.getSchema(cep);
    const fields: CepArgField[] = schema?.entrypoints?.[entryPoint] ?? [];
    return fields.map((f) => cepFieldToNamedArg(f));
  }

  supported(): string[] {
    return [...this.cache.keys()];
  }

  private async load(): Promise<void> {
    await init({
      module_or_path: 'assets/ceps_client_wasm_bg.wasm',
    });
    const ids = (supportedCeps() as string[]) || [...CEP_IDS];
    for (const id of ids) {
      const raw = schemaJson(id);
      const parsed = JSON.parse(raw) as CepSchema;
      this.cache.set(normalizeCepId(id), parsed);
    }
    this.ready = true;
  }
}

/** Map UI tab label to ceps id. */
export function tabToCepId(tabLabel: string): CepId | null {
  const key = tabLabel.replace('-', '').toLowerCase();
  if (key === 'cep18' || key === '18') {
    return 'cep18';
  }
  if (key === 'cep78' || key === '78') {
    return 'cep78';
  }
  if (key === 'cep85' || key === '85') {
    return 'cep85';
  }
  if (key === 'cep95' || key === '95') {
    return 'cep95';
  }
  return null;
}

function normalizeCepId(cep: string): string {
  return cep.trim().toLowerCase();
}

/** Seed cache from pre-parsed schemas (unit tests). */
export function seedCepSchemaCache(
  service: CepSchemaService,
  schemas: CepSchema[],
): void {
  const anyService = service as unknown as {
    cache: Map<string, CepSchema>;
    ready: boolean;
  };
  for (const schema of schemas) {
    anyService.cache.set(normalizeCepId(schema.cep), schema);
  }
  anyService.ready = true;
}
