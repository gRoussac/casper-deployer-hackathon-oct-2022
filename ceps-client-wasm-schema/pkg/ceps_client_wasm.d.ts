/* tslint:disable */
/* eslint-disable */

/**
 * CEP-18 schema JSON.
 */
export function cep18SchemaJson(): string;

/**
 * CEP-78 schema JSON.
 */
export function cep78SchemaJson(): string;

/**
 * CEP-85 schema JSON.
 */
export function cep85SchemaJson(): string;

/**
 * CEP-95 schema JSON.
 */
export function cep95SchemaJson(): string;

/**
 * JSON schema for a CEP id (`cep18`, `cep78`, `cep85`, `cep95`).
 */
export function schemaJson(cep: string): string;

/**
 * Supported CEP id strings.
 */
export function supportedCeps(): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly cep18SchemaJson: () => [number, number];
    readonly cep78SchemaJson: () => [number, number];
    readonly cep85SchemaJson: () => [number, number];
    readonly cep95SchemaJson: () => [number, number];
    readonly schemaJson: (a: number, b: number) => [number, number, number, number];
    readonly supportedCeps: () => [number, number, number];
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
