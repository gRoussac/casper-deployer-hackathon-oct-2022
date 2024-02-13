/* tslint:disable */
/* eslint-disable */
/**
* Converts a hexadecimal string to a regular string.
*
* # Arguments
*
* * `hex_string` - The hexadecimal string to convert.
*
* # Returns
*
* A regular string containing the converted value.
* @param {string} hex_string
* @returns {string}
*/
export function hexToString(hex_string: string): string;
/**
* Converts a hexadecimal string to a Uint8Array.
*
* # Arguments
*
* * `hex_string` - The hexadecimal string to convert.
*
* # Returns
*
* A Uint8Array containing the converted value.
* @param {string} hex_string
* @returns {Uint8Array}
*/
export function hexToUint8Array(hex_string: string): Uint8Array;
/**
* Converts a Uint8Array to a `Bytes` object.
*
* # Arguments
*
* * `uint8_array` - The Uint8Array to convert.
*
* # Returns
*
* A `Bytes` object containing the converted value.
* @param {Uint8Array} uint8_array
* @returns {Bytes}
*/
export function uint8ArrayToBytes(uint8_array: Uint8Array): Bytes;
/**
* Converts motes to CSPR (Casper tokens).
*
* # Arguments
*
* * `motes` - The motes value to convert.
*
* # Returns
*
* A string representing the CSPR amount.
* @param {string} motes
* @returns {string}
*/
export function motesToCSPR(motes: string): string;
/**
* Pretty prints a JSON value.
*
* # Arguments
*
* * `value` - The JSON value to pretty print.
* * `verbosity` - An optional verbosity level for pretty printing.
*
* # Returns
*
* A pretty printed JSON value as a JsValue.
* @param {any} value
* @param {Verbosity | undefined} [verbosity]
* @returns {any}
*/
export function jsonPrettyPrint(value: any, verbosity?: Verbosity): any;
/**
* Converts a secret key to a corresponding public key.
*
* # Arguments
*
* * `secret_key` - The secret key in PEM format.
*
* # Returns
*
* A JsValue containing the corresponding public key.
* If an error occurs during the conversion, JsValue::null() is returned.
* @param {string} secret_key
* @returns {any}
*/
export function privateToPublicKey(secret_key: string): any;
/**
* Gets the current timestamp.
*
* # Returns
*
* A JsValue containing the current timestamp.
* @returns {any}
*/
export function getTimestamp(): any;
/**
* Encodes the given metadata using the lower-level Blake2b hashing algorithm.
*
* # Arguments
*
* * `meta_data` - A string containing the metadata to be hashed.
*
* # Returns
*
* A JsValue containing the hash generated using the Blake2b algorithm.
* @param {string} meta_data
* @returns {any}
*/
export function encodeLowerBlake2b(meta_data: string): any;
/**
* Converts a key and value into a formatted dictionary item key for ditionaries queries.
*
* # Arguments
*
* * `key` - A string representation of a account/contract hash as a Key.
* * `value` - A string representation of the value, for now restricted to parse as U256 or Key
*
* # Returns
*
* A string representing the formatted dictionary item key.
* @param {Key} key
* @param {string} value
* @returns {string}
*/
export function makeDictionaryItemKey(key: Key, value: string): string;
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
export function fromTransfer(key: Uint8Array): TransferAddr;
/**
*/
export enum CLTypeEnum {
  Bool = 0,
  I32 = 1,
  I64 = 2,
  U8 = 3,
  U32 = 4,
  U64 = 5,
  U128 = 6,
  U256 = 7,
  U512 = 8,
  Unit = 9,
  String = 10,
  Key = 11,
  URef = 12,
  PublicKey = 13,
  Option = 14,
  List = 15,
  ByteArray = 16,
  Result = 17,
  Map = 18,
  Tuple1 = 19,
  Tuple2 = 20,
  Tuple3 = 21,
  Any = 22,
}
/**
*/
export enum Verbosity {
  Low = 0,
  Medium = 1,
  High = 2,
}
/**
*/
export class AccessRights {
  free(): void;
/**
* @returns {number}
*/
  static NONE(): number;
/**
* @returns {number}
*/
  static READ(): number;
/**
* @returns {number}
*/
  static WRITE(): number;
/**
* @returns {number}
*/
  static ADD(): number;
/**
* @returns {number}
*/
  static READ_ADD(): number;
/**
* @returns {number}
*/
  static READ_WRITE(): number;
/**
* @returns {number}
*/
  static ADD_WRITE(): number;
/**
* @returns {number}
*/
  static READ_ADD_WRITE(): number;
/**
* @param {number} access_rights
*/
  constructor(access_rights: number);
/**
* @param {boolean} read
* @param {boolean} write
* @param {boolean} add
* @returns {AccessRights}
*/
  static from_bits(read: boolean, write: boolean, add: boolean): AccessRights;
/**
* @returns {boolean}
*/
  is_readable(): boolean;
/**
* @returns {boolean}
*/
  is_writeable(): boolean;
/**
* @returns {boolean}
*/
  is_addable(): boolean;
/**
* @returns {boolean}
*/
  is_none(): boolean;
}
/**
*/
export class AccountHash {
  free(): void;
/**
* @param {string} account_hash_hex_str
*/
  constructor(account_hash_hex_str: string);
/**
* @param {string} formatted_str
* @returns {AccountHash}
*/
  static fromFormattedStr(formatted_str: string): AccountHash;
/**
* @param {PublicKey} public_key
* @returns {AccountHash}
*/
  static fromPublicKey(public_key: PublicKey): AccountHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @returns {string}
*/
  toHexString(): string;
/**
* @param {Uint8Array} bytes
* @returns {AccountHash}
*/
  static fromUint8Array(bytes: Uint8Array): AccountHash;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class AccountIdentifier {
  free(): void;
/**
* @param {string} formatted_str
*/
  constructor(formatted_str: string);
/**
* @param {string} formatted_str
* @returns {AccountIdentifier}
*/
  static fromFormattedStr(formatted_str: string): AccountIdentifier;
/**
* @param {PublicKey} key
* @returns {AccountIdentifier}
*/
  static fromPublicKey(key: PublicKey): AccountIdentifier;
/**
* @param {AccountHash} account_hash
* @returns {AccountIdentifier}
*/
  static fromAccountHash(account_hash: AccountHash): AccountIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class ArgsSimple {
  free(): void;
}
/**
*/
export class BlockHash {
  free(): void;
/**
* @param {string} block_hash_hex_str
*/
  constructor(block_hash_hex_str: string);
/**
* @param {Digest} digest
* @returns {BlockHash}
*/
  static fromDigest(digest: Digest): BlockHash;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class BlockIdentifier {
  free(): void;
/**
* @param {BlockIdentifier} block_identifier
*/
  constructor(block_identifier: BlockIdentifier);
/**
* @param {BlockHash} hash
* @returns {BlockIdentifier}
*/
  static from_hash(hash: BlockHash): BlockIdentifier;
/**
* @param {bigint} height
* @returns {BlockIdentifier}
*/
  static fromHeight(height: bigint): BlockIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class Body {
  free(): void;
/**
*/
  DeployProcessed?: DeployProcessed;
}
/**
*/
export class Bytes {
  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} uint8_array
* @returns {Bytes}
*/
  static fromUint8Array(uint8_array: Uint8Array): Bytes;
}
/**
*/
export class CLType {
  free(): void;
/**
* @returns {CLType}
*/
  static Bool(): CLType;
/**
* @returns {CLType}
*/
  static I32(): CLType;
/**
* @returns {CLType}
*/
  static I64(): CLType;
/**
* @returns {CLType}
*/
  static U8(): CLType;
/**
* @returns {CLType}
*/
  static U32(): CLType;
/**
* @returns {CLType}
*/
  static U64(): CLType;
/**
* @returns {CLType}
*/
  static U128(): CLType;
/**
* @returns {CLType}
*/
  static U256(): CLType;
/**
* @returns {CLType}
*/
  static U512(): CLType;
/**
* @returns {CLType}
*/
  static Unit(): CLType;
/**
* @returns {CLType}
*/
  static String(): CLType;
/**
* @returns {CLType}
*/
  static Key(): CLType;
/**
* @returns {CLType}
*/
  static URef(): CLType;
/**
* @returns {CLType}
*/
  static PublicKey(): CLType;
/**
* @param {CLType} _inner_type
* @returns {CLType}
*/
  static Option(_inner_type: CLType): CLType;
/**
* @param {CLType} _inner_type
* @returns {CLType}
*/
  static List(_inner_type: CLType): CLType;
/**
* @returns {CLType}
*/
  static ByteArray(): CLType;
/**
* @param {CLType} _inner_type
* @param {CLType} _error_type
* @returns {CLType}
*/
  static Result(_inner_type: CLType, _error_type: CLType): CLType;
/**
* @param {CLType} _key_type
* @param {CLType} _value_type
* @returns {CLType}
*/
  static Map(_key_type: CLType, _value_type: CLType): CLType;
/**
* @param {CLType} _value_type
* @returns {CLType}
*/
  static Tuple1(_value_type: CLType): CLType;
/**
* @param {CLType} _value_type
* @param {CLType} _value_type2
* @returns {CLType}
*/
  static Tuple2(_value_type: CLType, _value_type2: CLType): CLType;
/**
* @param {CLType} _value_type
* @param {CLType} _value_type2
* @param {CLType} _value_type3
* @returns {CLType}
*/
  static Tuple3(_value_type: CLType, _value_type2: CLType, _value_type3: CLType): CLType;
/**
* @returns {CLType}
*/
  static Any(): CLType;
/**
* @param {CLTypeEnum} cl_type
*/
  constructor(cl_type: CLTypeEnum);
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class ContractHash {
  free(): void;
/**
* @param {string} input
*/
  constructor(input: string);
/**
* @param {string} input
* @returns {ContractHash}
*/
  static fromFormattedStr(input: string): ContractHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {ContractHash}
*/
  static fromUint8Array(bytes: Uint8Array): ContractHash;
}
/**
*/
export class ContractPackageHash {
  free(): void;
/**
* @param {string} input
*/
  constructor(input: string);
/**
* @param {string} input
* @returns {ContractPackageHash}
*/
  static fromFormattedStr(input: string): ContractPackageHash;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {Uint8Array} bytes
* @returns {ContractPackageHash}
*/
  static fromUint8Array(bytes: Uint8Array): ContractPackageHash;
}
/**
*/
export class Deploy {
  free(): void;
/**
* @param {any} deploy
*/
  constructor(deploy: any);
/**
* @returns {any}
*/
  toJson(): any;
/**
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  static withPaymentAndSession(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  static withTransfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
/**
* @param {string} ttl
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withTTL(ttl: string, secret_key?: string): Deploy;
/**
* @param {string} timestamp
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withTimestamp(timestamp: string, secret_key?: string): Deploy;
/**
* @param {string} chain_name
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withChainName(chain_name: string, secret_key?: string): Deploy;
/**
* @param {PublicKey} account
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withAccount(account: PublicKey, secret_key?: string): Deploy;
/**
* @param {string} entry_point_name
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withEntryPointName(entry_point_name: string, secret_key?: string): Deploy;
/**
* @param {ContractHash} hash
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withHash(hash: ContractHash, secret_key?: string): Deploy;
/**
* @param {ContractPackageHash} package_hash
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withPackageHash(package_hash: ContractPackageHash, secret_key?: string): Deploy;
/**
* @param {Bytes} module_bytes
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withModuleBytes(module_bytes: Bytes, secret_key?: string): Deploy;
/**
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withSecretKey(secret_key?: string): Deploy;
/**
* @param {string} amount
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withStandardPayment(amount: string, secret_key?: string): Deploy;
/**
* @param {any} payment
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withPayment(payment: any, secret_key?: string): Deploy;
/**
* @param {any} session
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  withSession(session: any, secret_key?: string): Deploy;
/**
* @returns {boolean}
*/
  validateDeploySize(): boolean;
/**
* @param {string} secret_key
* @returns {Deploy}
*/
  sign(secret_key: string): Deploy;
/**
* @returns {string}
*/
  TTL(): string;
/**
* @returns {string}
*/
  timestamp(): string;
/**
* @returns {string}
*/
  chainName(): string;
/**
* @returns {string}
*/
  account(): string;
/**
* @returns {any}
*/
  args(): any;
/**
* @param {any} js_value_arg
* @param {string | undefined} [secret_key]
* @returns {Deploy}
*/
  addArg(js_value_arg: any, secret_key?: string): Deploy;
/**
*/
  readonly hash: DeployHash;
}
/**
*/
export class DeployHash {
  free(): void;
/**
* @param {string} deploy_hash_hex_str
*/
  constructor(deploy_hash_hex_str: string);
/**
* @param {Digest} digest
* @returns {DeployHash}
*/
  static fromDigest(digest: Digest): DeployHash;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class DeployProcessed {
  free(): void;
/**
*/
  account: string;
/**
*/
  block_hash: string;
/**
*/
  dependencies: (string)[];
/**
*/
  deploy_hash: string;
/**
*/
  execution_result: ExecutionResult;
/**
*/
  timestamp: string;
/**
*/
  ttl: string;
}
/**
*/
export class DeployStrParams {
  free(): void;
/**
* @param {string} chain_name
* @param {string} session_account
* @param {string | undefined} [secret_key]
* @param {string | undefined} [timestamp]
* @param {string | undefined} [ttl]
*/
  constructor(chain_name: string, session_account: string, secret_key?: string, timestamp?: string, ttl?: string);
/**
*/
  setDefaultTimestamp(): void;
/**
*/
  setDefaultTTL(): void;
/**
*/
  chain_name: string;
/**
*/
  secret_key: string;
/**
*/
  session_account: string;
/**
*/
  timestamp?: string;
/**
*/
  ttl?: string;
}
/**
*/
export class DeploySubscription {
  free(): void;
/**
* @param {string} deploy_hash
* @param {Function} event_handler_fn
*/
  constructor(deploy_hash: string, event_handler_fn: Function);
/**
*/
  deployHash: string;
/**
*/
  eventHandlerFn: Function;
}
/**
*/
export class DeployWatcher {
  free(): void;
/**
* @param {string} events_url
*/
  constructor(events_url: string);
/**
* @param {string} deploy_hash
*/
  unsubscribe(deploy_hash: string): void;
/**
*/
  stop(): void;
/**
*/
  start(): void;
/**
* @param {(DeploySubscription)[]} deploy_subscriptions
*/
  subscribe(deploy_subscriptions: (DeploySubscription)[]): void;
}
/**
*/
export class DictionaryAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class DictionaryItemIdentifier {
  free(): void;
/**
* @param {string} account_hash
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromAccountInfo(account_hash: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} contract_addr
* @param {string} dictionary_name
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromContractInfo(contract_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} seed_uref
* @param {string} dictionary_item_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromSeedUref(seed_uref: string, dictionary_item_key: string): DictionaryItemIdentifier;
/**
* @param {string} dictionary_key
* @returns {DictionaryItemIdentifier}
*/
  static newFromDictionaryKey(dictionary_key: string): DictionaryItemIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class DictionaryItemStrParams {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} key
* @param {string} dictionary_name
* @param {string} dictionary_item_key
*/
  setAccountNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
/**
* @param {string} key
* @param {string} dictionary_name
* @param {string} dictionary_item_key
*/
  setContractNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
/**
* @param {string} seed_uref
* @param {string} dictionary_item_key
*/
  setUref(seed_uref: string, dictionary_item_key: string): void;
/**
* @param {string} value
*/
  setDictionary(value: string): void;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class Digest {
  free(): void;
/**
* @param {string} digest_hex_str
*/
  constructor(digest_hex_str: string);
/**
* @param {string} digest_hex_str
* @returns {Digest}
*/
  static fromString(digest_hex_str: string): Digest;
/**
* @param {Uint8Array} bytes
* @returns {Digest}
*/
  static fromDigest(bytes: Uint8Array): Digest;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
}
/**
*/
export class EraId {
  free(): void;
/**
* @param {bigint} value
*/
  constructor(value: bigint);
/**
* @returns {bigint}
*/
  value(): bigint;
}
/**
*/
export class EventParseResult {
  free(): void;
/**
*/
  body: Body;
/**
*/
  err?: string;
}
/**
*/
export class ExecutionResult {
  free(): void;
/**
*/
  Failure?: Failure;
/**
*/
  Success?: Success;
}
/**
*/
export class Failure {
  free(): void;
/**
*/
  error_message: string;
}
/**
*/
export class GetAccountResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly account: any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly merkle_proof: string;
}
/**
*/
export class GetAuctionInfoResult {
  free(): void;
/**
* Converts the GetAuctionInfoResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the auction state as a JsValue.
*/
  readonly auction_state: any;
}
/**
*/
export class GetBalanceResult {
  free(): void;
/**
* Converts the GetBalanceResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the balance value as a JsValue.
*/
  readonly balance_value: any;
/**
* Gets the Merkle proof as a string.
*/
  readonly merkle_proof: string;
}
/**
*/
export class GetBlockResult {
  free(): void;
/**
* Converts the GetBlockResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the block information as a JsValue.
*/
  readonly block: any;
}
/**
*/
export class GetBlockTransfersResult {
  free(): void;
/**
* Converts the GetBlockTransfersResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the block hash as an Option<BlockHash>.
*/
  readonly block_hash: BlockHash | undefined;
/**
* Gets the transfers as a JsValue.
*/
  readonly transfers: any;
}
/**
* A struct representing the result of the `get_chainspec` function.
*/
export class GetChainspecResult {
  free(): void;
/**
* Converts the `GetChainspecResult` to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the chainspec bytes as a JsValue.
*/
  readonly chainspec_bytes: any;
}
/**
*/
export class GetDeployResult {
  free(): void;
/**
* Converts the result to a JSON JavaScript value.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JavaScript value.
*/
  readonly api_version: any;
/**
* Gets the deploy information.
*/
  readonly deploy: Deploy;
}
/**
*/
export class GetDictionaryItemResult {
  free(): void;
/**
* Converts the GetDictionaryItemResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the dictionary key as a String.
*/
  readonly dictionary_key: string;
/**
* Gets the merkle proof as a String.
*/
  readonly merkle_proof: string;
/**
* Gets the stored value as a JsValue.
*/
  readonly stored_value: any;
}
/**
*/
export class GetEraInfoResult {
  free(): void;
/**
* @returns {any}
*/
  toJson(): any;
/**
*/
  readonly api_version: any;
/**
*/
  readonly era_summary: any;
}
/**
* Wrapper struct for the `GetEraSummaryResult` from casper_client.
*/
export class GetEraSummaryResult {
  free(): void;
/**
* Converts the GetEraSummaryResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the era summary as a JsValue.
*/
  readonly era_summary: any;
}
/**
* Wrapper struct for the `GetNodeStatusResult` from casper_client.
*/
export class GetNodeStatusResult {
  free(): void;
/**
* Converts the GetNodeStatusResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the available block range as a JsValue.
*/
  readonly available_block_range: any;
/**
* Gets the block sync information as a JsValue.
*/
  readonly block_sync: any;
/**
* Gets the build version as a String.
*/
  readonly build_version: string;
/**
* Gets the chainspec name as a String.
*/
  readonly chainspec_name: string;
/**
* Gets information about the last added block as a JsValue.
*/
  readonly last_added_block_info: any;
/**
* Gets the last progress information as a JsValue.
*/
  readonly last_progress: any;
/**
* Gets information about the next upgrade as a JsValue.
*/
  readonly next_upgrade: any;
/**
* Gets the public signing key as an Option<PublicKey>.
*/
  readonly our_public_signing_key: PublicKey | undefined;
/**
* Gets the list of peers as a JsValue.
*/
  readonly peers: any;
/**
* Gets the reactor state information as a JsValue.
*/
  readonly reactor_state: any;
/**
* Gets the round length as a JsValue.
*/
  readonly round_length: any;
/**
* Gets the starting state root hash as a Digest.
*/
  readonly starting_state_root_hash: Digest;
/**
* Gets the uptime information as a JsValue.
*/
  readonly uptime: any;
}
/**
* A wrapper for the `GetPeersResult` type from the Casper client.
*/
export class GetPeersResult {
  free(): void;
/**
* Converts the result to JSON format as a JavaScript value.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JSON value.
*/
  readonly api_version: any;
/**
* Gets the peers as a JSON value.
*/
  readonly peers: any;
}
/**
* Wrapper struct for the `GetStateRootHashResult` from casper_client.
*/
export class GetStateRootHashResult {
  free(): void;
/**
* Alias for state_root_hash_as_string
* @returns {string}
*/
  toString(): string;
/**
* Converts the GetStateRootHashResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the state root hash as an Option<Digest>.
*/
  readonly state_root_hash: Digest | undefined;
/**
* Gets the state root hash as a String.
*/
  readonly state_root_hash_as_string: string;
}
/**
* Wrapper struct for the `GetValidatorChangesResult` from casper_client.
*/
export class GetValidatorChangesResult {
  free(): void;
/**
* Converts the GetValidatorChangesResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the validator changes as a JsValue.
*/
  readonly changes: any;
}
/**
*/
export class GlobalStateIdentifier {
  free(): void;
/**
* @param {GlobalStateIdentifier} global_state_identifier
*/
  constructor(global_state_identifier: GlobalStateIdentifier);
/**
* @param {BlockHash} block_hash
* @returns {GlobalStateIdentifier}
*/
  static fromBlockHash(block_hash: BlockHash): GlobalStateIdentifier;
/**
* @param {bigint} block_height
* @returns {GlobalStateIdentifier}
*/
  static fromBlockHeight(block_height: bigint): GlobalStateIdentifier;
/**
* @param {Digest} state_root_hash
* @returns {GlobalStateIdentifier}
*/
  static fromStateRootHash(state_root_hash: Digest): GlobalStateIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class HashAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class IntoUnderlyingByteSource {
  free(): void;
/**
* @param {ReadableByteStreamController} controller
*/
  start(controller: ReadableByteStreamController): void;
/**
* @param {ReadableByteStreamController} controller
* @returns {Promise<any>}
*/
  pull(controller: ReadableByteStreamController): Promise<any>;
/**
*/
  cancel(): void;
/**
*/
  readonly autoAllocateChunkSize: number;
/**
*/
  readonly type: string;
}
/**
*/
export class IntoUnderlyingSink {
  free(): void;
/**
* @param {any} chunk
* @returns {Promise<any>}
*/
  write(chunk: any): Promise<any>;
/**
* @returns {Promise<any>}
*/
  close(): Promise<any>;
/**
* @param {any} reason
* @returns {Promise<any>}
*/
  abort(reason: any): Promise<any>;
}
/**
*/
export class IntoUnderlyingSource {
  free(): void;
/**
* @param {ReadableStreamDefaultController} controller
* @returns {Promise<any>}
*/
  pull(controller: ReadableStreamDefaultController): Promise<any>;
/**
*/
  cancel(): void;
}
/**
*/
export class Key {
  free(): void;
/**
* @param {Key} key
*/
  constructor(key: Key);
/**
* @returns {any}
*/
  toJson(): any;
/**
* @param {URef} key
* @returns {Key}
*/
  static fromURef(key: URef): Key;
/**
* @param {DeployHash} key
* @returns {Key}
*/
  static fromDeployInfo(key: DeployHash): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromAccount(key: AccountHash): Key;
/**
* @param {HashAddr} key
* @returns {Key}
*/
  static fromHash(key: HashAddr): Key;
/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
  static fromTransfer(key: Uint8Array): TransferAddr;
/**
* @param {EraId} key
* @returns {Key}
*/
  static fromEraInfo(key: EraId): Key;
/**
* @param {URefAddr} key
* @returns {Key}
*/
  static fromBalance(key: URefAddr): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromBid(key: AccountHash): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromWithdraw(key: AccountHash): Key;
/**
* @param {DictionaryAddr} key
* @returns {Key}
*/
  static fromDictionaryAddr(key: DictionaryAddr): Key;
/**
* @returns {DictionaryAddr | undefined}
*/
  asDictionaryAddr(): DictionaryAddr | undefined;
/**
* @returns {Key}
*/
  static fromSystemContractRegistry(): Key;
/**
* @returns {Key}
*/
  static fromEraSummary(): Key;
/**
* @param {AccountHash} key
* @returns {Key}
*/
  static fromUnbond(key: AccountHash): Key;
/**
* @returns {Key}
*/
  static fromChainspecRegistry(): Key;
/**
* @returns {Key}
*/
  static fromChecksumRegistry(): Key;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @param {any} input
* @returns {Key}
*/
  static fromFormattedString(input: any): Key;
/**
* @param {URef} seed_uref
* @param {Uint8Array} dictionary_item_key
* @returns {Key}
*/
  static fromDictionaryKey(seed_uref: URef, dictionary_item_key: Uint8Array): Key;
/**
* @returns {boolean}
*/
  isDictionaryKey(): boolean;
/**
* @returns {AccountHash | undefined}
*/
  intoAccount(): AccountHash | undefined;
/**
* @returns {HashAddr | undefined}
*/
  intoHash(): HashAddr | undefined;
/**
* @returns {URefAddr | undefined}
*/
  asBalance(): URefAddr | undefined;
/**
* @returns {URef | undefined}
*/
  intoURef(): URef | undefined;
/**
* @returns {Key | undefined}
*/
  urefToHash(): Key | undefined;
/**
* @returns {Key | undefined}
*/
  withdrawToUnbond(): Key | undefined;
}
/**
* Wrapper struct for the `ListRpcsResult` from casper_client.
*/
export class ListRpcsResult {
  free(): void;
/**
* Converts the ListRpcsResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the name of the RPC.
*/
  readonly name: string;
/**
* Gets the schema of the RPC as a JsValue.
*/
  readonly schema: any;
}
/**
*/
export class Path {
  free(): void;
/**
* @param {any} path
*/
  constructor(path: any);
/**
* @param {any} path
* @returns {Path}
*/
  static fromArray(path: any): Path;
/**
* @returns {any}
*/
  toJson(): any;
/**
* @returns {string}
*/
  toString(): string;
/**
* @returns {boolean}
*/
  is_empty(): boolean;
}
/**
*/
export class PaymentStrParams {
  free(): void;
/**
* @param {string | undefined} [payment_amount]
* @param {string | undefined} [payment_hash]
* @param {string | undefined} [payment_name]
* @param {string | undefined} [payment_package_hash]
* @param {string | undefined} [payment_package_name]
* @param {string | undefined} [payment_path]
* @param {Array<any> | undefined} [payment_args_simple]
* @param {string | undefined} [payment_args_json]
* @param {string | undefined} [payment_args_complex]
* @param {string | undefined} [payment_version]
* @param {string | undefined} [payment_entry_point]
*/
  constructor(payment_amount?: string, payment_hash?: string, payment_name?: string, payment_package_hash?: string, payment_package_name?: string, payment_path?: string, payment_args_simple?: Array<any>, payment_args_json?: string, payment_args_complex?: string, payment_version?: string, payment_entry_point?: string);
/**
*/
  payment_amount: string;
/**
*/
  payment_args_complex: string;
/**
*/
  payment_args_json: string;
/**
*/
  payment_args_simple: Array<any>;
/**
*/
  payment_entry_point: string;
/**
*/
  payment_hash: string;
/**
*/
  payment_name: string;
/**
*/
  payment_package_hash: string;
/**
*/
  payment_package_name: string;
/**
*/
  payment_path: string;
/**
*/
  payment_version: string;
}
/**
*/
export class PeerEntry {
  free(): void;
/**
*/
  readonly address: string;
/**
*/
  readonly node_id: string;
}
/**
*/
export class PublicKey {
  free(): void;
/**
* @param {string} public_key_hex_str
*/
  constructor(public_key_hex_str: string);
/**
* @param {Uint8Array} bytes
* @returns {PublicKey}
*/
  static fromUint8Array(bytes: Uint8Array): PublicKey;
/**
* @returns {AccountHash}
*/
  toAccountHash(): AccountHash;
/**
* @returns {URef}
*/
  toPurseUref(): URef;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class PurseIdentifier {
  free(): void;
/**
* @param {PublicKey} key
*/
  constructor(key: PublicKey);
/**
* @param {AccountHash} account_hash
* @returns {PurseIdentifier}
*/
  static fromAccountHash(account_hash: AccountHash): PurseIdentifier;
/**
* @param {URef} uref
* @returns {PurseIdentifier}
*/
  static fromURef(uref: URef): PurseIdentifier;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class PutDeployResult {
  free(): void;
/**
* Converts PutDeployResult to a JavaScript object.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JavaScript value.
*/
  readonly api_version: any;
/**
* Gets the deploy hash associated with this result.
*/
  readonly deploy_hash: DeployHash;
}
/**
*/
export class QueryBalanceResult {
  free(): void;
/**
* Converts the QueryBalanceResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the balance as a JsValue.
*/
  readonly balance: any;
}
/**
*/
export class QueryGlobalStateResult {
  free(): void;
/**
* Converts the QueryGlobalStateResult to a JsValue.
* @returns {any}
*/
  toJson(): any;
/**
* Gets the API version as a JsValue.
*/
  readonly api_version: any;
/**
* Gets the block header as a JsValue.
*/
  readonly block_header: any;
/**
* Gets the Merkle proof as a string.
*/
  readonly merkle_proof: string;
/**
* Gets the stored value as a JsValue.
*/
  readonly stored_value: any;
}
/**
*/
export class SDK {
  free(): void;
/**
* @param {any} options
* @returns {getAccountOptions}
*/
  get_account_options(options: any): getAccountOptions;
/**
* @param {getAccountOptions | undefined} [options]
* @returns {Promise<GetAccountResult>}
*/
  get_account(options?: getAccountOptions): Promise<GetAccountResult>;
/**
* @param {getAccountOptions | undefined} [options]
* @returns {Promise<GetAccountResult>}
*/
  state_get_account_info(options?: getAccountOptions): Promise<GetAccountResult>;
/**
* Parses deploy options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing deploy options to be parsed.
*
* # Returns
*
* Parsed deploy options as a `GetDeployOptions` struct.
* @param {any} options
* @returns {getDeployOptions}
*/
  get_deploy_options(options: any): getDeployOptions;
/**
* Retrieves deploy information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetDeployOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetDeployResult` or an error.
* @param {getDeployOptions | undefined} [options]
* @returns {Promise<GetDeployResult>}
*/
  get_deploy(options?: getDeployOptions): Promise<GetDeployResult>;
/**
* Retrieves deploy information using the provided options, alias for `get_deploy_js_alias`.
* @param {getDeployOptions | undefined} [options]
* @returns {Promise<GetDeployResult>}
*/
  info_get_deploy(options?: getDeployOptions): Promise<GetDeployResult>;
/**
* Parses state root hash options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing state root hash options to be parsed.
*
* # Returns
*
* Parsed state root hash options as a `GetStateRootHashOptions` struct.
* @param {any} options
* @returns {getStateRootHashOptions}
*/
  get_state_root_hash_options(options: any): getStateRootHashOptions;
/**
* Retrieves state root hash information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getStateRootHashOptions | undefined} [options]
* @returns {Promise<GetStateRootHashResult>}
*/
  get_state_root_hash(options?: getStateRootHashOptions): Promise<GetStateRootHashResult>;
/**
* Retrieves state root hash information using the provided options (alias for `get_state_root_hash_js_alias`).
*
* # Arguments
*
* * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getStateRootHashOptions | undefined} [options]
* @returns {Promise<GetStateRootHashResult>}
*/
  chain_get_state_root_hash(options?: getStateRootHashOptions): Promise<GetStateRootHashResult>;
/**
* Get options for speculative execution from a JavaScript value.
* @param {any} options
* @returns {getSpeculativeExecOptions}
*/
  speculative_exec_options(options: any): getSpeculativeExecOptions;
/**
* JS Alias for speculative execution.
*
* # Arguments
*
* * `options` - The options for speculative execution.
*
* # Returns
*
* A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
* @param {getSpeculativeExecOptions | undefined} [options]
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_exec(options?: getSpeculativeExecOptions): Promise<SpeculativeExecResult>;
/**
* JS Alias for `sign_deploy`.
*
* # Arguments
*
* * `deploy` - The deploy to sign.
* * `secret_key` - The secret key for signing.
*
* # Returns
*
* The signed `Deploy`.
* @param {Deploy} deploy
* @param {string} secret_key
* @returns {Deploy}
*/
  sign_deploy(deploy: Deploy, secret_key: string): Deploy;
/**
* @param {string | undefined} [node_address]
* @param {Verbosity | undefined} [verbosity]
*/
  constructor(node_address?: string, verbosity?: Verbosity);
/**
* @param {string | undefined} [node_address]
* @returns {string}
*/
  getNodeAddress(node_address?: string): string;
/**
* @param {string | undefined} [node_address]
*/
  setNodeAddress(node_address?: string): void;
/**
* @param {Verbosity | undefined} [verbosity]
* @returns {Verbosity}
*/
  getVerbosity(verbosity?: Verbosity): Verbosity;
/**
* @param {Verbosity | undefined} [verbosity]
*/
  setVerbosity(verbosity?: Verbosity): void;
/**
* @param {any} options
* @returns {getEraInfoOptions}
*/
  get_era_info_options(options: any): getEraInfoOptions;
/**
* @param {getEraInfoOptions | undefined} [options]
* @returns {Promise<GetEraInfoResult>}
*/
  get_era_info(options?: getEraInfoOptions): Promise<GetEraInfoResult>;
/**
* Parses era summary options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing era summary options to be parsed.
*
* # Returns
*
* Parsed era summary options as a `GetEraSummaryOptions` struct.
* @param {any} options
* @returns {getEraSummaryOptions}
*/
  get_era_summary_options(options: any): getEraSummaryOptions;
/**
* Retrieves era summary information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetEraSummaryOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetEraSummaryResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getEraSummaryOptions | undefined} [options]
* @returns {Promise<GetEraSummaryResult>}
*/
  get_era_summary(options?: getEraSummaryOptions): Promise<GetEraSummaryResult>;
/**
* Parses query balance options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing query balance options to be parsed.
*
* # Returns
*
* Parsed query balance options as a `QueryBalanceOptions` struct.
* @param {any} options
* @returns {queryBalanceOptions}
*/
  query_balance_options(options: any): queryBalanceOptions;
/**
* Retrieves balance information using the provided options.
*
* # Arguments
*
* * `options` - An optional `QueryBalanceOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `QueryBalanceResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {queryBalanceOptions | undefined} [options]
* @returns {Promise<QueryBalanceResult>}
*/
  query_balance(options?: queryBalanceOptions): Promise<QueryBalanceResult>;
/**
* Parses query global state options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing query global state options to be parsed.
*
* # Returns
*
* Parsed query global state options as a `QueryGlobalStateOptions` struct.
* @param {any} options
* @returns {queryGlobalStateOptions}
*/
  query_global_state_options(options: any): queryGlobalStateOptions;
/**
* Retrieves global state information using the provided options.
*
* # Arguments
*
* * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `QueryGlobalStateResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {queryGlobalStateOptions | undefined} [options]
* @returns {Promise<QueryGlobalStateResult>}
*/
  query_global_state(options?: queryGlobalStateOptions): Promise<QueryGlobalStateResult>;
/**
* @param {string} events_url
* @returns {DeployWatcher}
*/
  watchDeploy(events_url: string): DeployWatcher;
/**
* @param {string} events_url
* @returns {DeployWatcher}
*/
  watch_deploy(events_url: string): DeployWatcher;
/**
* Deserialize query_contract_key_options from a JavaScript object.
* @param {any} options
* @returns {queryContractKeyOptions}
*/
  query_contract_key_options(options: any): queryContractKeyOptions;
/**
* JavaScript alias for query_contract_key with deserialized options.
* @param {queryContractKeyOptions | undefined} [options]
* @returns {Promise<QueryGlobalStateResult>}
*/
  query_contract_key(options?: queryContractKeyOptions): Promise<QueryGlobalStateResult>;
/**
* JavaScript alias for deploying with deserialized parameters.
*
* # Arguments
*
* * `deploy_params` - Deploy parameters.
* * `session_params` - Session parameters.
* * `payment_params` - Payment parameters.
* * `verbosity` - An optional verbosity level.
* * `node_address` - An optional node address.
*
* # Returns
*
* A result containing PutDeployResult or a JsError.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* Parses block transfers options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing block transfers options to be parsed.
*
* # Returns
*
* Parsed block transfers options as a `GetBlockTransfersOptions` struct.
* @param {any} options
* @returns {getBlockTransfersOptions}
*/
  get_block_transfers_options(options: any): getBlockTransfersOptions;
/**
* Retrieves block transfers information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetBlockTransfersOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBlockTransfersResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBlockTransfersOptions | undefined} [options]
* @returns {Promise<GetBlockTransfersResult>}
*/
  get_block_transfers(options?: getBlockTransfersOptions): Promise<GetBlockTransfersResult>;
/**
* JS Alias for `make_deploy`.
*
* # Arguments
*
* * `deploy_params` - The deploy parameters.
* * `session_params` - The session parameters.
* * `payment_params` - The payment parameters.
*
* # Returns
*
* A `Result` containing the created `Deploy` or a `JsError` in case of an error.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  make_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
/**
* JS Alias for `make_transfer`.
*
* # Arguments
*
* * `amount` - The transfer amount.
* * `target_account` - The target account.
* * `transfer_id` - Optional transfer identifier.
* * `deploy_params` - The deploy parameters.
* * `payment_params` - The payment parameters.
*
* # Returns
*
* A `Result` containing the created `Deploy` or a `JsError` in case of an error.
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @returns {Deploy}
*/
  make_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
/**
* JS Alias for transferring funds.
*
* # Arguments
*
* * `amount` - The amount to transfer.
* * `target_account` - The target account.
* * `transfer_id` - An optional transfer ID (defaults to a random number).
* * `deploy_params` - The deployment parameters.
* * `payment_params` - The payment parameters.
* * `verbosity` - The verbosity level for logging (optional).
* * `node_address` - The address of the node to connect to (optional).
*
* # Returns
*
* A `Result` containing the result of the transfer or a `JsError` in case of an error.
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* Parses balance options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing balance options to be parsed.
*
* # Returns
*
* Parsed balance options as a `GetBalanceOptions` struct.
* @param {any} options
* @returns {getBalanceOptions}
*/
  get_balance_options(options: any): getBalanceOptions;
/**
* Retrieves balance information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBalanceOptions | undefined} [options]
* @returns {Promise<GetBalanceResult>}
*/
  get_balance(options?: getBalanceOptions): Promise<GetBalanceResult>;
/**
* JS Alias for `get_balance_js_alias`.
*
* # Arguments
*
* * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
* @param {getBalanceOptions | undefined} [options]
* @returns {Promise<GetBalanceResult>}
*/
  state_get_balance(options?: getBalanceOptions): Promise<GetBalanceResult>;
/**
* JS Alias for speculative transfer.
*
* # Arguments
*
* * `amount` - The amount to transfer.
* * `target_account` - The target account.
* * `transfer_id` - An optional transfer ID (defaults to a random number).
* * `deploy_params` - The deployment parameters.
* * `payment_params` - The payment parameters.
* * `maybe_block_id_as_string` - An optional block ID as a string.
* * `maybe_block_identifier` - An optional block identifier.
* * `verbosity` - The verbosity level for logging (optional).
* * `node_address` - The address of the node to connect to (optional).
*
* # Returns
*
* A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
* @param {string} amount
* @param {string} target_account
* @param {string | undefined} transfer_id
* @param {DeployStrParams} deploy_params
* @param {PaymentStrParams} payment_params
* @param {string | undefined} [maybe_block_id_as_string]
* @param {BlockIdentifier | undefined} [maybe_block_identifier]
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_transfer(amount: string, target_account: string, transfer_id: string | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, maybe_block_id_as_string?: string, maybe_block_identifier?: BlockIdentifier, verbosity?: Verbosity, node_address?: string): Promise<SpeculativeExecResult>;
/**
* Puts a deploy using the provided options.
*
* # Arguments
*
* * `deploy` - The `Deploy` object to be sent.
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the deploy process.
* @param {Deploy} deploy
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  put_deploy(deploy: Deploy, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* JS Alias for `put_deploy_js_alias`.
*
* This function provides an alternative name for `put_deploy_js_alias`.
* @param {Deploy} deploy
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  account_put_deploy(deploy: Deploy, verbosity?: Verbosity, node_address?: string): Promise<PutDeployResult>;
/**
* Installs a smart contract with the specified parameters and returns the result.
*
* # Arguments
*
* * `deploy_params` - The deploy parameters.
* * `session_params` - The session parameters.
* * `payment_amount` - The payment amount as a string.
* * `node_address` - An optional node address to send the request to.
*
* # Returns
*
* A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the installation.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {string} payment_amount
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  install(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, node_address?: string): Promise<PutDeployResult>;
/**
* Parses auction info options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing auction info options to be parsed.
*
* # Returns
*
* Parsed auction info options as a `GetAuctionInfoOptions` struct.
* @param {any} options
* @returns {getAuctionInfoOptions}
*/
  get_auction_info_options(options: any): getAuctionInfoOptions;
/**
* Retrieves auction information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetAuctionInfoOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetAuctionInfoResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getAuctionInfoOptions | undefined} [options]
* @returns {Promise<GetAuctionInfoResult>}
*/
  get_auction_info(options?: getAuctionInfoOptions): Promise<GetAuctionInfoResult>;
/**
* Parses block options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing block options to be parsed.
*
* # Returns
*
* Parsed block options as a `GetBlockOptions` struct.
* @param {any} options
* @returns {getBlockOptions}
*/
  get_block_options(options: any): getBlockOptions;
/**
* Retrieves block information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetBlockOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBlockOptions | undefined} [options]
* @returns {Promise<GetBlockResult>}
*/
  get_block(options?: getBlockOptions): Promise<GetBlockResult>;
/**
* JS Alias for the `get_block` method to maintain compatibility.
*
* # Arguments
*
* * `options` - An optional `GetBlockOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getBlockOptions | undefined} [options]
* @returns {Promise<GetBlockResult>}
*/
  chain_get_block(options?: getBlockOptions): Promise<GetBlockResult>;
/**
* Parses dictionary item options from a JsValue.
*
* # Arguments
*
* * `options` - A JsValue containing dictionary item options to be parsed.
*
* # Returns
*
* Parsed dictionary item options as a `GetDictionaryItemOptions` struct.
* @param {any} options
* @returns {getDictionaryItemOptions}
*/
  get_dictionary_item_options(options: any): getDictionaryItemOptions;
/**
* Retrieves dictionary item information using the provided options.
*
* # Arguments
*
* * `options` - An optional `GetDictionaryItemOptions` struct containing retrieval options.
*
* # Returns
*
* A `Result` containing either a `GetDictionaryItemResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {getDictionaryItemOptions | undefined} [options]
* @returns {Promise<GetDictionaryItemResult>}
*/
  get_dictionary_item(options?: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
/**
* JS Alias for `get_dictionary_item_js_alias`
* @param {getDictionaryItemOptions | undefined} [options]
* @returns {Promise<GetDictionaryItemResult>}
*/
  state_get_dictionary_item(options?: getDictionaryItemOptions): Promise<GetDictionaryItemResult>;
/**
* Deserialize query_contract_dict_options from a JavaScript object.
* @param {any} options
* @returns {queryContractDictOptions}
*/
  query_contract_dict_options(options: any): queryContractDictOptions;
/**
* JavaScript alias for query_contract_dict with deserialized options.
* @param {queryContractDictOptions | undefined} [options]
* @returns {Promise<GetDictionaryItemResult>}
*/
  query_contract_dict(options?: queryContractDictOptions): Promise<GetDictionaryItemResult>;
/**
* This function allows executing a deploy speculatively.
*
* # Arguments
*
* * `deploy_params` - Deployment parameters for the deploy.
* * `session_params` - Session parameters for the deploy.
* * `payment_params` - Payment parameters for the deploy.
* * `maybe_block_id_as_string` - An optional block ID as a string.
* * `maybe_block_identifier` - Optional block identifier.
* * `verbosity` - Optional verbosity level.
* * `node_address` - Optional node address.
*
* # Returns
*
* A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {PaymentStrParams} payment_params
* @param {string | undefined} [maybe_block_id_as_string]
* @param {BlockIdentifier | undefined} [maybe_block_identifier]
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<SpeculativeExecResult>}
*/
  speculative_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, maybe_block_id_as_string?: string, maybe_block_identifier?: BlockIdentifier, verbosity?: Verbosity, node_address?: string): Promise<SpeculativeExecResult>;
/**
* Asynchronously retrieves the chainspec.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` parameter.
* * `node_address` - An optional node address as a string.
*
* # Returns
*
* A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetChainspecResult>}
*/
  get_chainspec(verbosity?: Verbosity, node_address?: string): Promise<GetChainspecResult>;
/**
* Retrieves node status information using the provided options.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetNodeStatusResult>}
*/
  get_node_status(verbosity?: Verbosity, node_address?: string): Promise<GetNodeStatusResult>;
/**
* Retrieves peers asynchronously.
*
* # Arguments
*
* * `verbosity` - Optional verbosity level.
* * `node_address` - Optional node address.
*
* # Returns
*
* A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetPeersResult>}
*/
  get_peers(verbosity?: Verbosity, node_address?: string): Promise<GetPeersResult>;
/**
* Retrieves validator changes using the provided options.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the retrieval process.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<GetValidatorChangesResult>}
*/
  get_validator_changes(verbosity?: Verbosity, node_address?: string): Promise<GetValidatorChangesResult>;
/**
* Lists available RPCs using the provided options.
*
* # Arguments
*
* * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
* * `node_address` - An optional string specifying the node address to use for the request.
*
* # Returns
*
* A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the listing process.
* @param {Verbosity | undefined} [verbosity]
* @param {string | undefined} [node_address]
* @returns {Promise<ListRpcsResult>}
*/
  list_rpcs(verbosity?: Verbosity, node_address?: string): Promise<ListRpcsResult>;
/**
* Calls a smart contract entry point with the specified parameters and returns the result.
*
* # Arguments
*
* * `deploy_params` - The deploy parameters.
* * `session_params` - The session parameters.
* * `payment_amount` - The payment amount as a string.
* * `node_address` - An optional node address to send the request to.
*
* # Returns
*
* A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
*
* # Errors
*
* Returns a `JsError` if there is an error during the call.
* @param {DeployStrParams} deploy_params
* @param {SessionStrParams} session_params
* @param {string} payment_amount
* @param {string | undefined} [node_address]
* @returns {Promise<PutDeployResult>}
*/
  call_entrypoint(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, node_address?: string): Promise<PutDeployResult>;
}
/**
*/
export class SessionStrParams {
  free(): void;
/**
* @param {string | undefined} [session_hash]
* @param {string | undefined} [session_name]
* @param {string | undefined} [session_package_hash]
* @param {string | undefined} [session_package_name]
* @param {string | undefined} [session_path]
* @param {Bytes | undefined} [session_bytes]
* @param {Array<any> | undefined} [session_args_simple]
* @param {string | undefined} [session_args_json]
* @param {string | undefined} [session_args_complex]
* @param {string | undefined} [session_version]
* @param {string | undefined} [session_entry_point]
* @param {boolean | undefined} [is_session_transfer]
*/
  constructor(session_hash?: string, session_name?: string, session_package_hash?: string, session_package_name?: string, session_path?: string, session_bytes?: Bytes, session_args_simple?: Array<any>, session_args_json?: string, session_args_complex?: string, session_version?: string, session_entry_point?: string, is_session_transfer?: boolean);
/**
*/
  is_session_transfer: boolean;
/**
*/
  session_args_complex: string;
/**
*/
  session_args_json: string;
/**
*/
  session_args_simple: Array<any>;
/**
*/
  session_bytes: Bytes;
/**
*/
  session_entry_point: string;
/**
*/
  session_hash: string;
/**
*/
  session_name: string;
/**
*/
  session_package_hash: string;
/**
*/
  session_package_name: string;
/**
*/
  session_path: string;
/**
*/
  session_version: string;
}
/**
*/
export class SpeculativeExecResult {
  free(): void;
/**
* Convert the result to JSON format.
* @returns {any}
*/
  toJson(): any;
/**
* Get the API version of the result.
*/
  readonly api_version: any;
/**
* Get the block hash.
*/
  readonly block_hash: BlockHash;
/**
* Get the execution result.
*/
  readonly execution_result: any;
}
/**
*/
export class Success {
  free(): void;
/**
*/
  cost: string;
}
/**
*/
export class TransferAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
}
/**
*/
export class URef {
  free(): void;
/**
* @param {string} uref_hex_str
* @param {number} access_rights
*/
  constructor(uref_hex_str: string, access_rights: number);
/**
* @param {Uint8Array} bytes
* @param {number} access_rights
* @returns {URef}
*/
  static fromUint8Array(bytes: Uint8Array, access_rights: number): URef;
/**
* @returns {string}
*/
  toFormattedString(): string;
/**
* @returns {any}
*/
  toJson(): any;
}
/**
*/
export class URefAddr {
  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Uint8Array);
}
/**
*/
export class getAccountOptions {
  free(): void;
/**
*/
  account_identifier?: AccountIdentifier;
/**
*/
  account_identifier_as_string?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_auction_info` method.
*/
export class getAuctionInfoOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_balance` method.
*/
export class getBalanceOptions {
  free(): void;
/**
*/
  node_address?: string;
/**
*/
  purse_uref?: URef;
/**
*/
  purse_uref_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_block` method.
*/
export class getBlockOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_block_transfers` method.
*/
export class getBlockTransfersOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_deploy` method.
*/
export class getDeployOptions {
  free(): void;
/**
*/
  deploy_hash?: DeployHash;
/**
*/
  deploy_hash_as_string?: string;
/**
*/
  finalized_approvals?: boolean;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_dictionary_item` method.
*/
export class getDictionaryItemOptions {
  free(): void;
/**
*/
  dictionary_item_identifier?: DictionaryItemIdentifier;
/**
*/
  dictionary_item_params?: DictionaryItemStrParams;
/**
*/
  node_address?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
*/
export class getEraInfoOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_era_summary` method.
*/
export class getEraSummaryOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for speculative execution.
*/
export class getSpeculativeExecOptions {
  free(): void;
/**
* The deploy to execute.
*/
  deploy?: Deploy;
/**
* The deploy as a JSON string.
*/
  deploy_as_string?: string;
/**
* The block identifier as a string.
*/
  maybe_block_id_as_string?: string;
/**
* The block identifier.
*/
  maybe_block_identifier?: BlockIdentifier;
/**
* The node address.
*/
  node_address?: string;
/**
* The verbosity level for logging.
*/
  verbosity?: Verbosity;
}
/**
* Options for the `get_state_root_hash` method.
*/
export class getStateRootHashOptions {
  free(): void;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  maybe_block_identifier?: BlockIdentifier;
/**
*/
  node_address?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `query_balance` method.
*/
export class queryBalanceOptions {
  free(): void;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address?: string;
/**
*/
  purse_identifier?: PurseIdentifier;
/**
*/
  purse_identifier_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
*/
export class queryContractDictOptions {
  free(): void;
/**
*/
  dictionary_item_identifier?: DictionaryItemIdentifier;
/**
*/
  dictionary_item_params?: DictionaryItemStrParams;
/**
*/
  node_address?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
*/
export class queryContractKeyOptions {
  free(): void;
/**
*/
  contract_key?: Key;
/**
*/
  contract_key_as_string?: string;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address?: string;
/**
*/
  path?: Path;
/**
*/
  path_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}
/**
* Options for the `query_global_state` method.
*/
export class queryGlobalStateOptions {
  free(): void;
/**
*/
  global_state_identifier?: GlobalStateIdentifier;
/**
*/
  key?: Key;
/**
*/
  key_as_string?: string;
/**
*/
  maybe_block_id_as_string?: string;
/**
*/
  node_address?: string;
/**
*/
  path?: Path;
/**
*/
  path_as_string?: string;
/**
*/
  state_root_hash?: Digest;
/**
*/
  state_root_hash_as_string?: string;
/**
*/
  verbosity?: Verbosity;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_contractpackagehash_free: (a: number) => void;
  readonly contractpackagehash_fromString: (a: number, b: number, c: number) => void;
  readonly contractpackagehash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly contractpackagehash_toFormattedString: (a: number, b: number) => void;
  readonly contractpackagehash_fromUint8Array: (a: number, b: number) => number;
  readonly __wbg_deploy_free: (a: number) => void;
  readonly deploy_new: (a: number) => number;
  readonly deploy_toJson: (a: number) => number;
  readonly deploy_withPaymentAndSession: (a: number, b: number, c: number, d: number) => void;
  readonly deploy_withTransfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly deploy_withTTL: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withTimestamp: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withChainName: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withAccount: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withEntryPointName: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withHash: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withPackageHash: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withModuleBytes: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withSecretKey: (a: number, b: number, c: number) => number;
  readonly deploy_withStandardPayment: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly deploy_withPayment: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_withSession: (a: number, b: number, c: number, d: number) => number;
  readonly deploy_validateDeploySize: (a: number) => number;
  readonly deploy_hash: (a: number) => number;
  readonly deploy_sign: (a: number, b: number, c: number) => number;
  readonly deploy_TTL: (a: number, b: number) => void;
  readonly deploy_timestamp: (a: number, b: number) => void;
  readonly deploy_chainName: (a: number, b: number) => void;
  readonly deploy_account: (a: number, b: number) => void;
  readonly deploy_args: (a: number) => number;
  readonly deploy_addArg: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_dictionaryitemstrparams_free: (a: number) => void;
  readonly dictionaryitemstrparams_new: () => number;
  readonly dictionaryitemstrparams_setAccountNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setContractNamedKey: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemstrparams_setUref: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly dictionaryitemstrparams_setDictionary: (a: number, b: number, c: number) => void;
  readonly dictionaryitemstrparams_toJson: (a: number) => number;
  readonly __wbg_sessionstrparams_free: (a: number) => void;
  readonly sessionstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number) => number;
  readonly sessionstrparams_session_hash: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_hash: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_name: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_name: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_package_hash: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_package_hash: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_package_name: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_package_name: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_path: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_path: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_bytes: (a: number) => number;
  readonly sessionstrparams_set_session_bytes: (a: number, b: number) => void;
  readonly sessionstrparams_session_args_simple: (a: number) => number;
  readonly sessionstrparams_set_session_args_simple: (a: number, b: number) => void;
  readonly sessionstrparams_session_args_json: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_args_json: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_args_complex: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_args_complex: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_version: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_version: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_session_entry_point: (a: number, b: number) => void;
  readonly sessionstrparams_set_session_entry_point: (a: number, b: number, c: number) => void;
  readonly sessionstrparams_is_session_transfer: (a: number) => number;
  readonly sessionstrparams_set_is_session_transfer: (a: number, b: number) => void;
  readonly __wbg_dictionaryitemidentifier_free: (a: number) => void;
  readonly dictionaryitemidentifier_newFromAccountInfo: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemidentifier_newFromContractInfo: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly dictionaryitemidentifier_newFromSeedUref: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly dictionaryitemidentifier_newFromDictionaryKey: (a: number, b: number, c: number) => void;
  readonly dictionaryitemidentifier_toJson: (a: number) => number;
  readonly digest__new: (a: number, b: number, c: number) => void;
  readonly digest_fromDigest: (a: number, b: number, c: number) => void;
  readonly digest_toJson: (a: number) => number;
  readonly digest_toString: (a: number, b: number) => void;
  readonly __wbg_eraid_free: (a: number) => void;
  readonly eraid_new: (a: number) => number;
  readonly eraid_value: (a: number) => number;
  readonly __wbg_getaccountresult_free: (a: number) => void;
  readonly getaccountresult_api_version: (a: number) => number;
  readonly getaccountresult_account: (a: number) => number;
  readonly getaccountresult_merkle_proof: (a: number, b: number) => void;
  readonly getaccountresult_toJson: (a: number) => number;
  readonly __wbg_getaccountoptions_free: (a: number) => void;
  readonly __wbg_get_getaccountoptions_account_identifier: (a: number) => number;
  readonly __wbg_set_getaccountoptions_account_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getaccountoptions_account_identifier_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getaccountoptions_account_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getaccountoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getaccountoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getaccountoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getaccountoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getaccountoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getaccountoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_account_options: (a: number, b: number) => number;
  readonly sdk_get_account: (a: number, b: number) => number;
  readonly sdk_state_get_account_info: (a: number, b: number) => number;
  readonly __wbg_getdeployresult_free: (a: number) => void;
  readonly getdeployresult_api_version: (a: number) => number;
  readonly getdeployresult_deploy: (a: number) => number;
  readonly getdeployresult_toJson: (a: number) => number;
  readonly __wbg_getdeployoptions_free: (a: number) => void;
  readonly __wbg_get_getdeployoptions_deploy_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getdeployoptions_deploy_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdeployoptions_deploy_hash: (a: number) => number;
  readonly __wbg_set_getdeployoptions_deploy_hash: (a: number, b: number) => void;
  readonly __wbg_get_getdeployoptions_finalized_approvals: (a: number) => number;
  readonly __wbg_set_getdeployoptions_finalized_approvals: (a: number, b: number) => void;
  readonly __wbg_get_getdeployoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getdeployoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdeployoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getdeployoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_deploy_options: (a: number, b: number) => number;
  readonly sdk_get_deploy: (a: number, b: number) => number;
  readonly sdk_info_get_deploy: (a: number, b: number) => number;
  readonly __wbg_getstateroothashresult_free: (a: number) => void;
  readonly getstateroothashresult_api_version: (a: number) => number;
  readonly getstateroothashresult_state_root_hash: (a: number) => number;
  readonly getstateroothashresult_state_root_hash_as_string: (a: number, b: number) => void;
  readonly getstateroothashresult_toString: (a: number, b: number) => void;
  readonly getstateroothashresult_toJson: (a: number) => number;
  readonly __wbg_getstateroothashoptions_free: (a: number) => void;
  readonly __wbg_get_getstateroothashoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getstateroothashoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getstateroothashoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getstateroothashoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getstateroothashoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getstateroothashoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_state_root_hash_options: (a: number, b: number) => number;
  readonly sdk_get_state_root_hash: (a: number, b: number) => number;
  readonly sdk_chain_get_state_root_hash: (a: number, b: number) => number;
  readonly __wbg_speculativeexecresult_free: (a: number) => void;
  readonly speculativeexecresult_api_version: (a: number) => number;
  readonly speculativeexecresult_block_hash: (a: number) => number;
  readonly speculativeexecresult_execution_result: (a: number) => number;
  readonly speculativeexecresult_toJson: (a: number) => number;
  readonly __wbg_getspeculativeexecoptions_free: (a: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_deploy_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getspeculativeexecoptions_deploy_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_deploy: (a: number) => number;
  readonly __wbg_set_getspeculativeexecoptions_deploy: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getspeculativeexecoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getspeculativeexecoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getspeculativeexecoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getspeculativeexecoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getspeculativeexecoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_speculative_exec_options: (a: number, b: number) => number;
  readonly sdk_speculative_exec: (a: number, b: number) => number;
  readonly sdk_sign_deploy: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_sdk_free: (a: number) => void;
  readonly sdk_new: (a: number, b: number, c: number) => number;
  readonly sdk_getNodeAddress: (a: number, b: number, c: number, d: number) => void;
  readonly sdk_setNodeAddress: (a: number, b: number, c: number, d: number) => void;
  readonly sdk_getVerbosity: (a: number, b: number) => number;
  readonly sdk_setVerbosity: (a: number, b: number, c: number) => void;
  readonly hexToString: (a: number, b: number, c: number) => void;
  readonly hexToUint8Array: (a: number, b: number, c: number) => void;
  readonly uint8ArrayToBytes: (a: number) => number;
  readonly motesToCSPR: (a: number, b: number, c: number) => void;
  readonly jsonPrettyPrint: (a: number, b: number) => number;
  readonly privateToPublicKey: (a: number, b: number) => number;
  readonly getTimestamp: () => number;
  readonly encodeLowerBlake2b: (a: number, b: number) => number;
  readonly makeDictionaryItemKey: (a: number, b: number, c: number, d: number) => void;
  readonly digest_fromString: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getstateroothashoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_digest_free: (a: number) => void;
  readonly __wbg_set_getstateroothashoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_accounthash_free: (a: number) => void;
  readonly accounthash_new: (a: number, b: number, c: number) => void;
  readonly accounthash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly accounthash_fromPublicKey: (a: number) => number;
  readonly accounthash_toFormattedString: (a: number, b: number) => void;
  readonly accounthash_toHexString: (a: number, b: number) => void;
  readonly accounthash_fromUint8Array: (a: number, b: number) => number;
  readonly accounthash_toJson: (a: number) => number;
  readonly __wbg_accountidentifier_free: (a: number) => void;
  readonly accountidentifier_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly accountidentifier_fromPublicKey: (a: number) => number;
  readonly accountidentifier_fromAccountHash: (a: number) => number;
  readonly accountidentifier_toJson: (a: number) => number;
  readonly __wbg_blockidentifier_free: (a: number) => void;
  readonly blockidentifier_new: (a: number) => number;
  readonly blockidentifier_from_hash: (a: number) => number;
  readonly blockidentifier_fromHeight: (a: number) => number;
  readonly blockidentifier_toJson: (a: number) => number;
  readonly __wbg_key_free: (a: number) => void;
  readonly key_new: (a: number, b: number) => void;
  readonly key_toJson: (a: number) => number;
  readonly key_fromURef: (a: number) => number;
  readonly key_fromDeployInfo: (a: number) => number;
  readonly key_fromAccount: (a: number) => number;
  readonly key_fromHash: (a: number) => number;
  readonly key_fromTransfer: (a: number, b: number) => number;
  readonly key_fromEraInfo: (a: number) => number;
  readonly key_fromBalance: (a: number) => number;
  readonly key_fromBid: (a: number) => number;
  readonly key_fromWithdraw: (a: number) => number;
  readonly key_fromDictionaryAddr: (a: number) => number;
  readonly key_asDictionaryAddr: (a: number) => number;
  readonly key_fromSystemContractRegistry: () => number;
  readonly key_fromEraSummary: () => number;
  readonly key_fromUnbond: (a: number) => number;
  readonly key_fromChainspecRegistry: () => number;
  readonly key_fromChecksumRegistry: () => number;
  readonly key_toFormattedString: (a: number, b: number) => void;
  readonly key_fromFormattedString: (a: number, b: number) => void;
  readonly key_fromDictionaryKey: (a: number, b: number, c: number) => number;
  readonly key_isDictionaryKey: (a: number) => number;
  readonly key_intoAccount: (a: number) => number;
  readonly key_intoHash: (a: number) => number;
  readonly key_asBalance: (a: number) => number;
  readonly key_intoURef: (a: number) => number;
  readonly key_urefToHash: (a: number) => number;
  readonly key_withdrawToUnbond: (a: number) => number;
  readonly __wbg_path_free: (a: number) => void;
  readonly path_new: (a: number) => number;
  readonly path_fromArray: (a: number) => number;
  readonly path_toJson: (a: number) => number;
  readonly path_toString: (a: number, b: number) => void;
  readonly path_is_empty: (a: number) => number;
  readonly purseidentifier_fromURef: (a: number) => number;
  readonly purseidentifier_toJson: (a: number) => number;
  readonly __wbg_uref_free: (a: number) => void;
  readonly uref_new: (a: number, b: number, c: number, d: number) => void;
  readonly uref_fromUint8Array: (a: number, b: number, c: number) => number;
  readonly uref_toFormattedString: (a: number, b: number) => void;
  readonly uref_toJson: (a: number) => number;
  readonly __wbg_geterainforesult_free: (a: number) => void;
  readonly geterainforesult_api_version: (a: number) => number;
  readonly geterainforesult_era_summary: (a: number) => number;
  readonly geterainforesult_toJson: (a: number) => number;
  readonly __wbg_geterainfooptions_free: (a: number) => void;
  readonly __wbg_get_geterainfooptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_geterainfooptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geterainfooptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_geterainfooptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_geterainfooptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_geterainfooptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_geterainfooptions_verbosity: (a: number) => number;
  readonly __wbg_set_geterainfooptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_era_info_options: (a: number, b: number) => number;
  readonly sdk_get_era_info: (a: number, b: number) => number;
  readonly __wbg_geterasummaryresult_free: (a: number) => void;
  readonly geterasummaryresult_api_version: (a: number) => number;
  readonly geterasummaryresult_era_summary: (a: number) => number;
  readonly geterasummaryresult_toJson: (a: number) => number;
  readonly sdk_get_era_summary_options: (a: number, b: number) => number;
  readonly sdk_get_era_summary: (a: number, b: number) => number;
  readonly __wbg_querybalanceresult_free: (a: number) => void;
  readonly querybalanceresult_api_version: (a: number) => number;
  readonly querybalanceresult_balance: (a: number) => number;
  readonly querybalanceresult_toJson: (a: number) => number;
  readonly __wbg_querybalanceoptions_free: (a: number) => void;
  readonly __wbg_get_querybalanceoptions_purse_identifier_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_purse_identifier_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_purse_identifier: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_purse_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_querybalanceoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_querybalanceoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querybalanceoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querybalanceoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_balance_options: (a: number, b: number) => number;
  readonly sdk_query_balance: (a: number, b: number) => number;
  readonly __wbg_queryglobalstateresult_free: (a: number) => void;
  readonly queryglobalstateresult_api_version: (a: number) => number;
  readonly queryglobalstateresult_block_header: (a: number) => number;
  readonly queryglobalstateresult_stored_value: (a: number) => number;
  readonly queryglobalstateresult_merkle_proof: (a: number, b: number) => void;
  readonly queryglobalstateresult_toJson: (a: number) => number;
  readonly sdk_query_global_state_options: (a: number, b: number) => number;
  readonly sdk_query_global_state: (a: number, b: number) => number;
  readonly sdk_watchDeploy: (a: number, b: number, c: number) => number;
  readonly __wbg_deploywatcher_free: (a: number) => void;
  readonly deploywatcher_new: (a: number, b: number) => number;
  readonly deploywatcher_unsubscribe: (a: number, b: number, c: number) => void;
  readonly deploywatcher_stop: (a: number) => void;
  readonly deploywatcher_start: (a: number) => void;
  readonly deploywatcher_subscribe: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_deploysubscription_free: (a: number) => void;
  readonly __wbg_get_deploysubscription_eventHandlerFn: (a: number) => number;
  readonly __wbg_set_deploysubscription_eventHandlerFn: (a: number, b: number) => void;
  readonly deploysubscription_new: (a: number, b: number, c: number) => number;
  readonly __wbg_failure_free: (a: number) => void;
  readonly __wbg_executionresult_free: (a: number) => void;
  readonly __wbg_get_executionresult_Success: (a: number) => number;
  readonly __wbg_set_executionresult_Success: (a: number, b: number) => void;
  readonly __wbg_get_executionresult_Failure: (a: number) => number;
  readonly __wbg_set_executionresult_Failure: (a: number, b: number) => void;
  readonly __wbg_deployprocessed_free: (a: number) => void;
  readonly __wbg_get_deployprocessed_deploy_hash: (a: number, b: number) => void;
  readonly __wbg_set_deployprocessed_deploy_hash: (a: number, b: number, c: number) => void;
  readonly __wbg_get_deployprocessed_account: (a: number, b: number) => void;
  readonly __wbg_set_deployprocessed_account: (a: number, b: number, c: number) => void;
  readonly __wbg_get_deployprocessed_timestamp: (a: number, b: number) => void;
  readonly __wbg_set_deployprocessed_timestamp: (a: number, b: number, c: number) => void;
  readonly __wbg_get_deployprocessed_ttl: (a: number, b: number) => void;
  readonly __wbg_set_deployprocessed_ttl: (a: number, b: number, c: number) => void;
  readonly __wbg_get_deployprocessed_dependencies: (a: number, b: number) => void;
  readonly __wbg_set_deployprocessed_dependencies: (a: number, b: number, c: number) => void;
  readonly __wbg_get_deployprocessed_block_hash: (a: number, b: number) => void;
  readonly __wbg_set_deployprocessed_block_hash: (a: number, b: number, c: number) => void;
  readonly __wbg_get_deployprocessed_execution_result: (a: number) => number;
  readonly __wbg_set_deployprocessed_execution_result: (a: number, b: number) => void;
  readonly __wbg_body_free: (a: number) => void;
  readonly __wbg_get_body_DeployProcessed: (a: number) => number;
  readonly __wbg_set_body_DeployProcessed: (a: number, b: number) => void;
  readonly __wbg_eventparseresult_free: (a: number) => void;
  readonly __wbg_get_eventparseresult_err: (a: number, b: number) => void;
  readonly __wbg_set_eventparseresult_err: (a: number, b: number, c: number) => void;
  readonly __wbg_get_eventparseresult_body: (a: number) => number;
  readonly __wbg_set_eventparseresult_body: (a: number, b: number) => void;
  readonly __wbg_querycontractkeyoptions_free: (a: number) => void;
  readonly __wbg_get_querycontractkeyoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_contract_key_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_contract_key_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_contract_key: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_contract_key: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_path_as_string: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_path_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_path: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_path: (a: number, b: number) => void;
  readonly __wbg_get_querycontractkeyoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_querycontractkeyoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_querycontractkeyoptions_verbosity: (a: number) => number;
  readonly __wbg_set_querycontractkeyoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_query_contract_key_options: (a: number, b: number) => number;
  readonly sdk_query_contract_key: (a: number, b: number) => number;
  readonly sdk_watch_deploy: (a: number, b: number, c: number) => number;
  readonly purseidentifier_fromPublicKey: (a: number) => number;
  readonly __wbg_geterasummaryoptions_free: (a: number) => void;
  readonly __wbg_get_queryglobalstateoptions_state_root_hash: (a: number) => number;
  readonly accountidentifier_new: (a: number, b: number, c: number) => void;
  readonly __wbg_get_queryglobalstateoptions_path: (a: number) => number;
  readonly __wbg_get_geterasummaryoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_get_geterasummaryoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_key_as_string: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_path_as_string: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_get_geterasummaryoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_get_queryglobalstateoptions_key: (a: number) => number;
  readonly __wbg_queryglobalstateoptions_free: (a: number) => void;
  readonly __wbg_set_queryglobalstateoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_failure_error_message: (a: number, b: number) => void;
  readonly __wbg_get_success_cost: (a: number, b: number) => void;
  readonly __wbg_get_deploysubscription_deployHash: (a: number, b: number) => void;
  readonly __wbg_get_queryglobalstateoptions_global_state_identifier: (a: number) => number;
  readonly __wbg_set_geterasummaryoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_key: (a: number, b: number) => void;
  readonly __wbg_get_geterasummaryoptions_verbosity: (a: number) => number;
  readonly __wbg_get_queryglobalstateoptions_verbosity: (a: number) => number;
  readonly __wbg_set_geterasummaryoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_geterasummaryoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_set_queryglobalstateoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_queryglobalstateoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_queryglobalstateoptions_key_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_queryglobalstateoptions_path_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_queryglobalstateoptions_node_address: (a: number, b: number, c: number) => void;
  readonly purseidentifier_fromAccountHash: (a: number) => number;
  readonly __wbg_set_failure_error_message: (a: number, b: number, c: number) => void;
  readonly __wbg_set_success_cost: (a: number, b: number, c: number) => void;
  readonly __wbg_set_deploysubscription_deployHash: (a: number, b: number, c: number) => void;
  readonly __wbg_set_geterasummaryoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_purseidentifier_free: (a: number) => void;
  readonly __wbg_set_queryglobalstateoptions_path: (a: number, b: number) => void;
  readonly __wbg_set_queryglobalstateoptions_global_state_identifier: (a: number, b: number) => void;
  readonly __wbg_success_free: (a: number) => void;
  readonly __wbg_bytes_free: (a: number) => void;
  readonly bytes_new: () => number;
  readonly bytes_fromUint8Array: (a: number) => number;
  readonly __wbg_cltype_free: (a: number) => void;
  readonly cltype_Bool: () => number;
  readonly cltype_I32: () => number;
  readonly cltype_I64: () => number;
  readonly cltype_U8: () => number;
  readonly cltype_U32: () => number;
  readonly cltype_U64: () => number;
  readonly cltype_U128: () => number;
  readonly cltype_U256: () => number;
  readonly cltype_U512: () => number;
  readonly cltype_Unit: () => number;
  readonly cltype_String: () => number;
  readonly cltype_Key: () => number;
  readonly cltype_URef: () => number;
  readonly cltype_PublicKey: () => number;
  readonly cltype_Option: (a: number) => number;
  readonly cltype_List: (a: number) => number;
  readonly cltype_ByteArray: () => number;
  readonly cltype_Result: (a: number, b: number) => number;
  readonly cltype_Map: (a: number, b: number) => number;
  readonly cltype_Tuple1: (a: number) => number;
  readonly cltype_Tuple2: (a: number, b: number) => number;
  readonly cltype_Tuple3: (a: number, b: number, c: number) => number;
  readonly cltype_Any: () => number;
  readonly cltype_new: (a: number) => number;
  readonly cltype_toString: (a: number, b: number) => void;
  readonly __wbg_argssimple_free: (a: number) => void;
  readonly __wbg_globalstateidentifier_free: (a: number) => void;
  readonly globalstateidentifier_new: (a: number) => number;
  readonly globalstateidentifier_fromBlockHash: (a: number) => number;
  readonly globalstateidentifier_fromBlockHeight: (a: number) => number;
  readonly globalstateidentifier_fromStateRootHash: (a: number) => number;
  readonly globalstateidentifier_toJson: (a: number) => number;
  readonly __wbg_putdeployresult_free: (a: number) => void;
  readonly putdeployresult_api_version: (a: number) => number;
  readonly putdeployresult_deploy_hash: (a: number) => number;
  readonly putdeployresult_toJson: (a: number) => number;
  readonly sdk_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_getblocktransfersresult_free: (a: number) => void;
  readonly getblocktransfersresult_api_version: (a: number) => number;
  readonly getblocktransfersresult_block_hash: (a: number) => number;
  readonly getblocktransfersresult_transfers: (a: number) => number;
  readonly getblocktransfersresult_toJson: (a: number) => number;
  readonly __wbg_getblocktransfersoptions_free: (a: number) => void;
  readonly __wbg_get_getblocktransfersoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getblocktransfersoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getblocktransfersoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getblocktransfersoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getblocktransfersoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getblocktransfersoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_get_getblocktransfersoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getblocktransfersoptions_node_address: (a: number, b: number, c: number) => void;
  readonly sdk_get_block_transfers_options: (a: number, b: number) => number;
  readonly sdk_get_block_transfers: (a: number, b: number) => number;
  readonly sdk_make_deploy: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly sdk_make_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly __wbg_blockhash_free: (a: number) => void;
  readonly blockhash_new: (a: number, b: number, c: number) => void;
  readonly blockhash_fromDigest: (a: number, b: number) => void;
  readonly blockhash_toJson: (a: number) => number;
  readonly blockhash_toString: (a: number, b: number) => void;
  readonly contracthash_fromString: (a: number, b: number, c: number) => void;
  readonly contracthash_fromFormattedStr: (a: number, b: number, c: number) => void;
  readonly contracthash_toFormattedString: (a: number, b: number) => void;
  readonly contracthash_fromUint8Array: (a: number, b: number) => number;
  readonly deployhash_new: (a: number, b: number, c: number) => void;
  readonly deployhash_toJson: (a: number) => number;
  readonly deployhash_toString: (a: number, b: number) => void;
  readonly __wbg_deploystrparams_free: (a: number) => void;
  readonly deploystrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly deploystrparams_secret_key: (a: number, b: number) => void;
  readonly deploystrparams_set_secret_key: (a: number, b: number, c: number) => void;
  readonly deploystrparams_timestamp: (a: number, b: number) => void;
  readonly deploystrparams_set_timestamp: (a: number, b: number, c: number) => void;
  readonly deploystrparams_setDefaultTimestamp: (a: number) => void;
  readonly deploystrparams_ttl: (a: number, b: number) => void;
  readonly deploystrparams_set_ttl: (a: number, b: number, c: number) => void;
  readonly deploystrparams_setDefaultTTL: (a: number) => void;
  readonly deploystrparams_chain_name: (a: number, b: number) => void;
  readonly deploystrparams_set_chain_name: (a: number, b: number, c: number) => void;
  readonly deploystrparams_session_account: (a: number, b: number) => void;
  readonly deploystrparams_set_session_account: (a: number, b: number, c: number) => void;
  readonly __wbg_publickey_free: (a: number) => void;
  readonly publickey_new: (a: number, b: number, c: number) => void;
  readonly publickey_fromUint8Array: (a: number, b: number) => number;
  readonly publickey_toAccountHash: (a: number) => number;
  readonly publickey_toPurseUref: (a: number) => number;
  readonly publickey_toJson: (a: number) => number;
  readonly sdk_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => number;
  readonly __wbg_getbalanceresult_free: (a: number) => void;
  readonly getbalanceresult_api_version: (a: number) => number;
  readonly getbalanceresult_balance_value: (a: number) => number;
  readonly getbalanceresult_merkle_proof: (a: number, b: number) => void;
  readonly getbalanceresult_toJson: (a: number) => number;
  readonly __wbg_getbalanceoptions_free: (a: number) => void;
  readonly __wbg_get_getbalanceoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getbalanceoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_getbalanceoptions_purse_uref_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getbalanceoptions_purse_uref_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_purse_uref: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_purse_uref: (a: number, b: number) => void;
  readonly __wbg_get_getbalanceoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getbalanceoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getbalanceoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getbalanceoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_balance_options: (a: number, b: number) => number;
  readonly sdk_get_balance: (a: number, b: number) => number;
  readonly sdk_state_get_balance: (a: number, b: number) => number;
  readonly deployhash_fromDigest: (a: number, b: number) => void;
  readonly __wbg_contracthash_free: (a: number) => void;
  readonly __wbg_deployhash_free: (a: number) => void;
  readonly sdk_speculative_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number) => number;
  readonly sdk_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_account_put_deploy: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly sdk_install: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_accessrights_free: (a: number) => void;
  readonly accessrights_NONE: () => number;
  readonly accessrights_READ: () => number;
  readonly accessrights_WRITE: () => number;
  readonly accessrights_ADD: () => number;
  readonly accessrights_READ_ADD: () => number;
  readonly accessrights_READ_WRITE: () => number;
  readonly accessrights_ADD_WRITE: () => number;
  readonly accessrights_READ_ADD_WRITE: () => number;
  readonly accessrights_new: (a: number, b: number) => void;
  readonly accessrights_from_bits: (a: number, b: number, c: number) => number;
  readonly accessrights_is_readable: (a: number) => number;
  readonly accessrights_is_writeable: (a: number) => number;
  readonly accessrights_is_addable: (a: number) => number;
  readonly accessrights_is_none: (a: number) => number;
  readonly __wbg_dictionaryaddr_free: (a: number) => void;
  readonly dictionaryaddr_new: (a: number, b: number, c: number) => void;
  readonly hashaddr_new: (a: number, b: number, c: number) => void;
  readonly transferaddr_new: (a: number, b: number, c: number) => void;
  readonly transferaddr_to_bytes: (a: number, b: number) => void;
  readonly fromTransfer: (a: number, b: number) => number;
  readonly urefaddr_new: (a: number, b: number, c: number) => void;
  readonly __wbg_peerentry_free: (a: number) => void;
  readonly peerentry_node_id: (a: number, b: number) => void;
  readonly peerentry_address: (a: number, b: number) => void;
  readonly __wbg_getauctioninforesult_free: (a: number) => void;
  readonly getauctioninforesult_api_version: (a: number) => number;
  readonly getauctioninforesult_auction_state: (a: number) => number;
  readonly getauctioninforesult_toJson: (a: number) => number;
  readonly __wbg_getauctioninfooptions_free: (a: number) => void;
  readonly __wbg_get_getauctioninfooptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getauctioninfooptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getauctioninfooptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_set_getauctioninfooptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getauctioninfooptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getauctioninfooptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getauctioninfooptions_verbosity: (a: number) => number;
  readonly __wbg_set_getauctioninfooptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_auction_info_options: (a: number, b: number) => number;
  readonly sdk_get_auction_info: (a: number, b: number) => number;
  readonly __wbg_getblockresult_free: (a: number) => void;
  readonly getblockresult_api_version: (a: number) => number;
  readonly getblockresult_block: (a: number) => number;
  readonly getblockresult_toJson: (a: number) => number;
  readonly sdk_get_block_options: (a: number, b: number) => number;
  readonly sdk_get_block: (a: number, b: number) => number;
  readonly sdk_chain_get_block: (a: number, b: number) => number;
  readonly __wbg_getdictionaryitemresult_free: (a: number) => void;
  readonly getdictionaryitemresult_api_version: (a: number) => number;
  readonly getdictionaryitemresult_dictionary_key: (a: number, b: number) => void;
  readonly getdictionaryitemresult_stored_value: (a: number) => number;
  readonly getdictionaryitemresult_merkle_proof: (a: number, b: number) => void;
  readonly getdictionaryitemresult_toJson: (a: number) => number;
  readonly __wbg_getdictionaryitemoptions_free: (a: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_set_getdictionaryitemoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_state_root_hash: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_dictionary_item_params: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_dictionary_item_params: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_dictionary_item_identifier: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_dictionary_item_identifier: (a: number, b: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_getdictionaryitemoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_get_getdictionaryitemoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getdictionaryitemoptions_verbosity: (a: number, b: number) => void;
  readonly sdk_get_dictionary_item_options: (a: number, b: number) => number;
  readonly sdk_get_dictionary_item: (a: number, b: number) => number;
  readonly sdk_state_get_dictionary_item: (a: number, b: number) => number;
  readonly sdk_query_contract_dict_options: (a: number, b: number) => number;
  readonly sdk_query_contract_dict: (a: number, b: number) => number;
  readonly __wbg_set_querycontractdictoptions_dictionary_item_params: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_dictionary_item_identifier: (a: number, b: number) => void;
  readonly __wbg_getblockoptions_free: (a: number) => void;
  readonly __wbg_get_querycontractdictoptions_state_root_hash: (a: number) => number;
  readonly __wbg_get_getblockoptions_maybe_block_id_as_string: (a: number, b: number) => void;
  readonly __wbg_get_getblockoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_get_querycontractdictoptions_state_root_hash_as_string: (a: number, b: number) => void;
  readonly __wbg_get_querycontractdictoptions_node_address: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_state_root_hash: (a: number, b: number) => void;
  readonly __wbg_get_getblockoptions_maybe_block_identifier: (a: number) => number;
  readonly __wbg_get_getblockoptions_verbosity: (a: number) => number;
  readonly __wbg_get_querycontractdictoptions_verbosity: (a: number) => number;
  readonly __wbg_set_getblockoptions_maybe_block_id_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_getblockoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querycontractdictoptions_state_root_hash_as_string: (a: number, b: number, c: number) => void;
  readonly __wbg_set_querycontractdictoptions_node_address: (a: number, b: number, c: number) => void;
  readonly __wbg_set_getblockoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_set_querycontractdictoptions_verbosity: (a: number, b: number) => void;
  readonly __wbg_hashaddr_free: (a: number) => void;
  readonly __wbg_transferaddr_free: (a: number) => void;
  readonly __wbg_urefaddr_free: (a: number) => void;
  readonly __wbg_querycontractdictoptions_free: (a: number) => void;
  readonly __wbg_set_getblockoptions_maybe_block_identifier: (a: number, b: number) => void;
  readonly __wbg_get_querycontractdictoptions_dictionary_item_params: (a: number) => number;
  readonly __wbg_get_querycontractdictoptions_dictionary_item_identifier: (a: number) => number;
  readonly sdk_speculative_deploy: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly __wbg_paymentstrparams_free: (a: number) => void;
  readonly paymentstrparams_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: number, t: number, u: number) => number;
  readonly paymentstrparams_payment_amount: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_amount: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_hash: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_hash: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_name: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_name: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_package_hash: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_package_hash: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_package_name: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_package_name: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_path: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_path: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_args_simple: (a: number) => number;
  readonly paymentstrparams_set_payment_args_simple: (a: number, b: number) => void;
  readonly paymentstrparams_payment_args_json: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_args_json: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_args_complex: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_args_complex: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_version: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_version: (a: number, b: number, c: number) => void;
  readonly paymentstrparams_payment_entry_point: (a: number, b: number) => void;
  readonly paymentstrparams_set_payment_entry_point: (a: number, b: number, c: number) => void;
  readonly __wbg_getchainspecresult_free: (a: number) => void;
  readonly getchainspecresult_api_version: (a: number) => number;
  readonly getchainspecresult_chainspec_bytes: (a: number) => number;
  readonly getchainspecresult_toJson: (a: number) => number;
  readonly sdk_get_chainspec: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_getnodestatusresult_free: (a: number) => void;
  readonly getnodestatusresult_api_version: (a: number) => number;
  readonly getnodestatusresult_chainspec_name: (a: number, b: number) => void;
  readonly getnodestatusresult_starting_state_root_hash: (a: number) => number;
  readonly getnodestatusresult_peers: (a: number) => number;
  readonly getnodestatusresult_last_added_block_info: (a: number) => number;
  readonly getnodestatusresult_our_public_signing_key: (a: number) => number;
  readonly getnodestatusresult_round_length: (a: number) => number;
  readonly getnodestatusresult_next_upgrade: (a: number) => number;
  readonly getnodestatusresult_build_version: (a: number, b: number) => void;
  readonly getnodestatusresult_uptime: (a: number) => number;
  readonly getnodestatusresult_reactor_state: (a: number) => number;
  readonly getnodestatusresult_last_progress: (a: number) => number;
  readonly getnodestatusresult_available_block_range: (a: number) => number;
  readonly getnodestatusresult_block_sync: (a: number) => number;
  readonly getnodestatusresult_toJson: (a: number) => number;
  readonly sdk_get_node_status: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_getpeersresult_free: (a: number) => void;
  readonly getpeersresult_api_version: (a: number) => number;
  readonly getpeersresult_peers: (a: number) => number;
  readonly getpeersresult_toJson: (a: number) => number;
  readonly sdk_get_peers: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_getvalidatorchangesresult_free: (a: number) => void;
  readonly getvalidatorchangesresult_api_version: (a: number) => number;
  readonly getvalidatorchangesresult_changes: (a: number) => number;
  readonly getvalidatorchangesresult_toJson: (a: number) => number;
  readonly sdk_get_validator_changes: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_listrpcsresult_free: (a: number) => void;
  readonly listrpcsresult_api_version: (a: number) => number;
  readonly listrpcsresult_name: (a: number, b: number) => void;
  readonly listrpcsresult_schema: (a: number) => number;
  readonly listrpcsresult_toJson: (a: number) => number;
  readonly sdk_list_rpcs: (a: number, b: number, c: number, d: number) => number;
  readonly sdk_call_entrypoint: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly __wbg_intounderlyingsink_free: (a: number) => void;
  readonly intounderlyingsink_write: (a: number, b: number) => number;
  readonly intounderlyingsink_close: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: number) => number;
  readonly __wbg_intounderlyingsource_free: (a: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: number) => number;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingbytesource_free: (a: number) => void;
  readonly intounderlyingbytesource_type: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h950a3df6e852f9c6: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h418f18809bb538b9: (a: number, b: number, c: number, d: number) => void;
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
