/* tslint:disable */
/* eslint-disable */
/**
*/
export class Deployer {
  free(): void;
/**
*/
  constructor();
/**
* @returns {string}
*/
  hello(): string;
/**
* @param {string} _account_hash
* @returns {string}
*/
  account_hash_to_base64_encode(_account_hash: string): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_deployer_free: (a: number) => void;
  readonly deployer_new: () => number;
  readonly deployer_hello: (a: number, b: number) => void;
  readonly deployer_account_hash_to_base64_encode: (a: number, b: number, c: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
