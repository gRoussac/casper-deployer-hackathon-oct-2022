/* tslint:disable */
/* eslint-disable */
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */

export type ReadableStreamType = "bytes";

export class AccessRights {
    free(): void;
    [Symbol.dispose](): void;
    static ADD(): number;
    static ADD_WRITE(): number;
    static NONE(): number;
    static READ(): number;
    static READ_ADD(): number;
    static READ_ADD_WRITE(): number;
    static READ_WRITE(): number;
    static WRITE(): number;
    static from_bits(read: boolean, write: boolean, add: boolean): AccessRights;
    is_addable(): boolean;
    is_none(): boolean;
    is_readable(): boolean;
    is_writeable(): boolean;
    constructor(access_rights: number);
}

export class AccountHash {
    free(): void;
    [Symbol.dispose](): void;
    static fromFormattedStr(formatted_str: string): AccountHash;
    static fromPublicKey(public_key: PublicKey): AccountHash;
    static fromUint8Array(bytes: Uint8Array): AccountHash;
    constructor(account_hash_hex_str: string);
    toFormattedString(): string;
    toHexString(): string;
    toJson(): any;
}

export class AccountIdentifier {
    free(): void;
    [Symbol.dispose](): void;
    static fromAccountHash(account_hash: AccountHash): AccountIdentifier;
    static fromFormattedStr(formatted_str: string): AccountIdentifier;
    static fromPublicKey(key: PublicKey): AccountIdentifier;
    constructor(formatted_str: string);
    toJson(): any;
}

export class AddressableEntityHash {
    free(): void;
    [Symbol.dispose](): void;
    static fromFormattedStr(formatted_str: string): AddressableEntityHash;
    static fromUint8Array(bytes: Uint8Array): AddressableEntityHash;
    constructor(addressable_entity_hex_str: string);
    toFormattedString(): string;
}

export class ArgsSimple {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export class BlockHash {
    free(): void;
    [Symbol.dispose](): void;
    static fromDigest(digest: Digest): BlockHash;
    constructor(block_hash_hex_str: string);
    toJson(): any;
    toString(): string;
}

export class BlockIdentifier {
    free(): void;
    [Symbol.dispose](): void;
    static fromHeight(height: bigint): BlockIdentifier;
    static from_hash(hash: BlockHash): BlockIdentifier;
    constructor(block_identifier: BlockIdentifier);
    toJson(): any;
}

/**
 * Represents the body of an event, containing processed deploy information.
 */
export class Body {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly get_deploy_processed: TransactionProcessed | undefined;
    readonly get_transaction_processed: TransactionProcessed | undefined;
    get transaction_processed(): TransactionProcessed | undefined;
    set transaction_processed(value: TransactionProcessed | null | undefined);
}

export class Bytes {
    free(): void;
    [Symbol.dispose](): void;
    static fromUint8Array(uint8_array: Uint8Array): Bytes;
    constructor();
}

export class CasperWallet {
    free(): void;
    [Symbol.dispose](): void;
    connect(): Promise<boolean>;
    disconnect(): Promise<boolean>;
    getActivePublicKey(): Promise<string>;
    getVersion(): Promise<string>;
    isConnected(): Promise<boolean>;
    constructor();
    /**
     * Signs a deploy with the provided or active public key.
     *
     * This function requests a connection to the wallet, retrieves the public key
     * (either provided or active), serializes the deploy, signs it, and returns the
     * signed deploy.
     *
     * # Arguments
     *
     * * `deploy` - The deploy object to be signed.
     * * `public_key` - An optional public key string. If `None`, the active public key is used.
     *
     * # Returns
     *
     * * `Ok(Deploy)` - The signed deploy object.
     * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
     *   the serialization fails, the signing fails, or if the signing is cancelled.
     *
     * # Errors
     *
     * This function returns a `JsError` if:
     * * The connection to the wallet could not be established.
     * * The public key could not be retrieved.
     * * The deploy serialization fails.
     * * The signing operation fails.
     * * The signing is cancelled by the user.
     */
    signDeploy(deploy: Deploy, public_key?: string | null): Promise<Deploy>;
    /**
     * Alias for the `sign_message` function, specifically for signing deploy hashes.
     *
     * This function calls `sign_message` to sign the provided deploy hash with the
     * given or active public key.
     *
     * # Arguments
     *
     * * `deploy_hash` - The deploy hash string to be signed.
     * * `public_key` - An optional public key string. If `None`, the active public key is used.
     *
     * # Returns
     *
     * * `Ok(String)` - The signature string.
     * * `Err(JsError)` - An error if the signing process fails.
     */
    signDeployHash(deploy_hash: string, public_key?: string | null): Promise<string>;
    /**
     * Signs a message with the provided or active public key.
     *
     * This function requests a connection to the wallet, retrieves the public key
     * (either provided or active), signs the message, and returns the signature.
     *
     * # Arguments
     *
     * * `message` - The message string to be signed.
     * * `public_key` - An optional public key string. If `None`, the active public key is used.
     *
     * # Returns
     *
     * * `Ok(String)` - The signature string.
     * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
     *   the signing fails, or if the signing is cancelled.
     *
     * # Errors
     *
     * This function returns a `JsError` if:
     * * The connection to the wallet could not be established.
     * * The public key could not be retrieved.
     * * The signing operation fails.
     * * The signing is cancelled by the user.
     */
    signMessage(message: string, public_key?: string | null): Promise<string>;
    signTransaction(transaction: Transaction, public_key?: string | null): Promise<Transaction>;
    /**
     * Alias for the `sign_message` function, specifically for signing transaction hashes.
     *
     * This function calls `sign_message` to sign the provided transaction hash with the
     * given or active public key.
     *
     * # Arguments
     *
     * * `transaction_hash` - The transaction hash string to be signed.
     * * `public_key` - An optional public key string. If `None`, the active public key is used.
     *
     * # Returns
     *
     * * `Ok(String)` - The signature string.
     * * `Err(JsError)` - An error if the signing process fails.
     */
    signTransactionHash(transaction_hash: string, public_key?: string | null): Promise<string>;
    switchAccount(): Promise<boolean>;
}

export class ContractHash {
    free(): void;
    [Symbol.dispose](): void;
    static fromFormattedStr(formatted_str: string): ContractHash;
    static fromUint8Array(bytes: Uint8Array): ContractHash;
    constructor(contract_hash_hex_str: string);
    toFormattedString(): string;
}

export class ContractPackageHash {
    free(): void;
    [Symbol.dispose](): void;
    static fromFormattedStr(formatted_str: string): ContractPackageHash;
    static fromUint8Array(bytes: Uint8Array): ContractPackageHash;
    constructor(contract_package_hash_hex_str: string);
    toFormattedString(): string;
}

export class Deploy {
    free(): void;
    [Symbol.dispose](): void;
    TTL(): string;
    account(): string;
    addArg(js_value_arg: any, secret_key?: string | null): Deploy;
    addSignature(public_key: string, signature: string): Deploy;
    approvals(): any;
    approvalsHash(): any;
    args(): any;
    byName(): string | undefined;
    chainName(): string;
    entryPointName(): string;
    hasValidHash(): boolean;
    isByName(): boolean;
    isExpired(): boolean;
    isModuleBytes(): boolean;
    isStandardPayment(phase: number): boolean;
    isStoredContract(): boolean;
    isStoredContractPackage(): boolean;
    isTransfer(): boolean;
    isValid(): boolean;
    constructor(deploy: any);
    paymentAmount(conv_rate: number): string;
    sign(secret_key: string): Deploy;
    timestamp(): string;
    toJson(): any;
    validateDeploySize(): boolean;
    withAccount(account: PublicKey, secret_key?: string | null): Deploy;
    withChainName(chain_name: string, secret_key?: string | null): Deploy;
    withEntryPointName(entry_point_name: string, secret_key?: string | null): Deploy;
    withHash(hash: ContractHash, secret_key?: string | null): Deploy;
    withModuleBytes(module_bytes: Bytes, secret_key?: string | null): Deploy;
    withPackageHash(package_hash: ContractPackageHash, secret_key?: string | null): Deploy;
    withPayment(payment: any, secret_key?: string | null): Deploy;
    static withPaymentAndSession(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
    withSecretKey(secret_key?: string | null): Deploy;
    withSession(session: any, secret_key?: string | null): Deploy;
    withStandardPayment(amount: string, secret_key?: string | null): Deploy;
    withTTL(ttl: string, secret_key?: string | null): Deploy;
    withTimestamp(timestamp: string, secret_key?: string | null): Deploy;
    static withTransfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
    readonly hash: DeployHash;
}

export class DeployHash {
    free(): void;
    [Symbol.dispose](): void;
    static fromDigest(digest: Digest): DeployHash;
    constructor(deploy_hash_hex_str: string);
    toJson(): any;
    toString(): string;
}

export class DeployStrParams {
    free(): void;
    [Symbol.dispose](): void;
    constructor(chain_name: string, session_account: string, secret_key?: string | null, timestamp?: string | null, ttl?: string | null, gas_price_tolerance?: string | null);
    setDefaultTTL(): void;
    setDefaultTimestamp(): void;
    get chain_name(): string | undefined;
    set chain_name(value: string);
    get gas_price_tolerance(): string | undefined;
    set gas_price_tolerance(value: string);
    get secret_key(): string | undefined;
    set secret_key(value: string);
    get session_account(): string | undefined;
    set session_account(value: string);
    get timestamp(): string | undefined;
    set timestamp(value: string | null | undefined);
    get ttl(): string | undefined;
    set ttl(value: string | null | undefined);
}

export class DictionaryAddr {
    free(): void;
    [Symbol.dispose](): void;
    constructor(bytes: Uint8Array);
}

export class DictionaryItemIdentifier {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static newFromAccountInfo(account_hash: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
    static newFromContractInfo(contract_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
    static newFromDictionaryKey(dictionary_key: string): DictionaryItemIdentifier;
    static newFromEntityInfo(entity_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
    static newFromSeedUref(seed_uref: string, dictionary_item_key: string): DictionaryItemIdentifier;
    toJson(): any;
}

export class DictionaryItemStrParams {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    setAccountNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
    setContractNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
    setDictionary(value: string): void;
    setEntityNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
    setUref(seed_uref: string, dictionary_item_key: string): void;
    toJson(): any;
}

export class Digest {
    free(): void;
    [Symbol.dispose](): void;
    static fromRaw(bytes: Uint8Array): Digest;
    static fromString(digest_hex_str: string): Digest;
    constructor(digest_hex_str: string);
    toJson(): any;
    toString(): string;
}

export class EntityAddr {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static fromFormattedStr(formatted_str: string): EntityAddr;
    toFormattedString(): string;
    toHexString(): string;
    toJson(): any;
}

export class EntityIdentifier {
    free(): void;
    [Symbol.dispose](): void;
    static fromAccountHash(account_hash: AccountHash): EntityIdentifier;
    static fromEntityAddr(entity_addr: EntityAddr): EntityIdentifier;
    static fromFormattedStr(formatted_str: string): EntityIdentifier;
    static fromPublicKey(key: PublicKey): EntityIdentifier;
    constructor(formatted_str: string);
    toJson(): any;
}

export class EraId {
    free(): void;
    [Symbol.dispose](): void;
    constructor(value: bigint);
    value(): bigint;
}

/**
 * Represents the result of parsing an event, containing error information and the event body.
 */
export class EventParseResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get body(): Body | undefined;
    set body(value: Body | null | undefined);
    get err(): string | undefined;
    set err(value: string | null | undefined);
}

/**
 * Represents the result of an execution, either Success or Failure.
 */
export class ExecutionResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Optional Failure information.
     */
    get Failure(): Failure | undefined;
    /**
     * Optional Failure information.
     */
    set Failure(value: Failure | null | undefined);
    /**
     * Optional Success information.
     */
    get Success(): Version2 | undefined;
    /**
     * Optional Success information.
     */
    set Success(value: Version2 | null | undefined);
}

/**
 * Represents a failure response containing an error message.
 */
export class Failure {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cost: string;
    error_message: string;
}

export class GetAccountResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    toJson(): any;
    readonly account: any;
    readonly api_version: any;
    readonly merkle_proof: string;
}

export class GetAddressableEntityResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    toJson(): any;
    readonly api_version: any;
    readonly entity_result: any;
    readonly merkle_proof: string;
}

export class GetAuctionInfoResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetAuctionInfoResult to a JsValue.
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

export class GetBalanceResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetBalanceResult to a JsValue.
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

export class GetBlockResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetBlockResult to a JsValue.
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

export class GetBlockTransfersResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetBlockTransfersResult to a JsValue.
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
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the `GetChainspecResult` to a JsValue.
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

export class GetDeployResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the result to a JSON JavaScript value.
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
    /**
     * Gets the execution info as a JavaScript value.
     */
    readonly execution_info: any;
}

export class GetDictionaryItemResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetDictionaryItemResult to a JsValue.
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

export class GetEraInfoResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    toJson(): any;
    readonly api_version: any;
    readonly era_summary: any;
}

/**
 * Wrapper struct for the `GetEraSummaryResult` from casper_client.
 */
export class GetEraSummaryResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetEraSummaryResult to a JsValue.
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
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetNodeStatusResult to a JsValue.
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
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the result to JSON format as a JavaScript value.
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
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetStateRootHashResult to a JsValue.
     */
    toJson(): any;
    /**
     * Alias for state_root_hash_as_string
     */
    toString(): string;
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

export class GetTransactionResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the result to a JSON JavaScript value.
     */
    toJson(): any;
    /**
     * Gets the API version as a JavaScript value.
     */
    readonly api_version: any;
    /**
     * Gets the execution info as a JavaScript value.
     */
    readonly execution_info: any;
    /**
     * Gets the transaction information.
     */
    readonly transaction: Transaction;
}

/**
 * Wrapper struct for the `GetValidatorChangesResult` from casper_client.
 */
export class GetValidatorChangesResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the GetValidatorChangesResult to a JsValue.
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

export class GlobalStateIdentifier {
    free(): void;
    [Symbol.dispose](): void;
    static fromBlockHash(block_hash: BlockHash): GlobalStateIdentifier;
    static fromBlockHeight(block_height: bigint): GlobalStateIdentifier;
    static fromStateRootHash(state_root_hash: Digest): GlobalStateIdentifier;
    constructor(global_state_identifier: GlobalStateIdentifier);
    toJson(): any;
}

export class HashAddr {
    free(): void;
    [Symbol.dispose](): void;
    constructor(bytes: Uint8Array);
    toBytes(): Uint8Array;
    toHexString(): string;
}

export class HashString {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    toString(): string;
    hash: string;
    readonly Deploy: string;
    readonly Version1: string;
}

export class IntoUnderlyingByteSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableByteStreamController): Promise<any>;
    start(controller: ReadableByteStreamController): void;
    readonly autoAllocateChunkSize: number;
    readonly type: ReadableStreamType;
}

export class IntoUnderlyingSink {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    abort(reason: any): Promise<any>;
    close(): Promise<any>;
    write(chunk: any): Promise<any>;
}

export class IntoUnderlyingSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableStreamDefaultController): Promise<any>;
}

export class Key {
    free(): void;
    [Symbol.dispose](): void;
    asBalance(): URefAddr | undefined;
    asDictionaryAddr(): DictionaryAddr | undefined;
    static fromAccount(key: AccountHash): Key;
    static fromBalance(key: URefAddr): Key;
    static fromBid(key: AccountHash): Key;
    static fromChainspecRegistry(): Key;
    static fromChecksumRegistry(): Key;
    static fromDeployInfo(key: DeployHash): Key;
    static fromDictionaryAddr(key: DictionaryAddr): Key;
    static fromDictionaryKey(seed_uref: URef, dictionary_item_key: Uint8Array): Key;
    static fromEraInfo(key: EraId): Key;
    static fromEraSummary(): Key;
    static fromFormattedString(formatted_str: string): Key;
    static fromHash(key: HashAddr): Key;
    static fromSystemEntityRegistry(): Key;
    static fromTransfer(key: Uint8Array): TransferAddr;
    static fromURef(key: URef): Key;
    static fromUnbond(key: AccountHash): Key;
    static fromWithdraw(key: AccountHash): Key;
    intoAccount(): AccountHash | undefined;
    intoHash(): HashAddr | undefined;
    intoURef(): URef | undefined;
    isDictionaryKey(): boolean;
    constructor(key: Key);
    toFormattedString(): string;
    toJson(): any;
    urefToHash(): Key | undefined;
    withdrawToUnbond(): Key | undefined;
}

/**
 * Wrapper struct for the `ListRpcsResult` from casper_client.
 */
export class ListRpcsResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the ListRpcsResult to a JsValue.
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

export class Message {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    String: string;
}

export class Messages {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    block_index: bigint;
    entity_hash: string;
    message: Message;
    topic_index: number;
    topic_name_hash: string;
    topic_name: string;
}

export class PackageHash {
    free(): void;
    [Symbol.dispose](): void;
    static fromFormattedStr(formatted_str: string): PackageHash;
    static fromUint8Array(bytes: Uint8Array): PackageHash;
    constructor(package_hash_hex_str: string);
    toFormattedString(): string;
}

export class Path {
    free(): void;
    [Symbol.dispose](): void;
    static fromArray(path: any): Path;
    is_empty(): boolean;
    constructor(path: any);
    toJson(): any;
    toString(): string;
}

export class Payment {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    source: string;
}

export class PaymentStrParams {
    free(): void;
    [Symbol.dispose](): void;
    constructor(payment_amount?: string | null, payment_hash?: string | null, payment_name?: string | null, payment_package_hash?: string | null, payment_package_name?: string | null, payment_path?: string | null, payment_args_simple?: Array<any> | null, payment_args_json?: string | null, payment_version?: string | null, payment_entry_point?: string | null);
    get payment_amount(): string | undefined;
    set payment_amount(value: string);
    get payment_args_json(): string | undefined;
    set payment_args_json(value: string);
    get payment_args_simple(): Array<any> | undefined;
    set payment_args_simple(value: Array<any>);
    get payment_entry_point(): string | undefined;
    set payment_entry_point(value: string);
    get payment_hash(): string | undefined;
    set payment_hash(value: string);
    get payment_name(): string | undefined;
    set payment_name(value: string);
    get payment_package_hash(): string | undefined;
    set payment_package_hash(value: string);
    get payment_package_name(): string | undefined;
    set payment_package_name(value: string);
    get payment_path(): string | undefined;
    set payment_path(value: string);
    get payment_version(): string | undefined;
    set payment_version(value: string);
}

export class PeerEntry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly address: string;
    readonly node_id: string;
}

export enum PricingMode {
    Fixed = 0,
    Classic = 1,
    Reserved = 2,
}

export class PublicKey {
    free(): void;
    [Symbol.dispose](): void;
    static fromUint8Array(bytes: Uint8Array): PublicKey;
    constructor(public_key_hex_str: string);
    toAccountHash(): AccountHash;
    toJson(): any;
    toPurseUref(): URef;
}

export class PublicKeyString {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    PublicKey: string;
}

export class PurseIdentifier {
    free(): void;
    [Symbol.dispose](): void;
    static fromAccountHash(account_hash: AccountHash): PurseIdentifier;
    constructor(key: PublicKey);
    static fromURef(uref: URef): PurseIdentifier;
    toJson(): any;
}

export class PutDeployResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts PutDeployResult to a JavaScript object.
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

export class PutTransactionResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts PutTransactionResult to a JavaScript object.
     */
    toJson(): any;
    /**
     * Gets the API version as a JavaScript value.
     */
    readonly api_version: any;
    /**
     * Gets the transaction hash associated with this result.
     */
    readonly transaction_hash: TransactionHash;
}

export class QueryBalanceDetailsResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the QueryBalanceDetailsResult to a JsValue.
     */
    toJson(): any;
    /**
     * Gets the API version as a JsValue.
     */
    readonly api_version: any;
    readonly available_balance: any;
    readonly holds: any;
    readonly total_balance: any;
    readonly total_balance_proof: any;
}

export class QueryBalanceResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the QueryBalanceResult to a JsValue.
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

export class QueryGlobalStateResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Converts the QueryGlobalStateResult to a JsValue.
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

export class RecordId {
    free(): void;
    [Symbol.dispose](): void;
    constructor(value: number);
}

export class SDK {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * JavaScript Alias for `put_deploy`.
     */
    account_put_deploy(deploy: Deploy, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutDeployResult>;
    /**
     * JavaScript Alias for `put_transaction`.
     */
    account_put_transaction(transaction: Transaction, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutTransactionResult>;
    /**
     * Calls a smart contract entry point with the specified parameters and returns the result.
     *
     * # Arguments
     *
     * * `transaction_params` - Transaction parameters.
     * * `builder_params` - Transaction Builder parameters.
     * * `rpc_address` - An optional rpc address to send the request to.
     *
     * # Returns
     *
     * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the call.
     */
    call_entrypoint(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, rpc_address?: string | null): Promise<PutTransactionResult>;
    /**
     * Calls a smart contract entry point with the specified parameters and returns the result.
     *
     * # Arguments
     *
     * * `deploy_params` - The deploy parameters.
     * * `session_params` - The session parameters.
     * * `payment_amount` - The payment amount as a string.
     * * `rpc_address` - An optional rpc address to send the request to.
     *
     * # Returns
     *
     * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the call.
     */
    call_entrypoint_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, rpc_address?: string | null): Promise<PutDeployResult>;
    /**
     * JavaScript Alias for the `get_block`.
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
     */
    chain_get_block(options?: getBlockOptions | null): Promise<GetBlockResult>;
    chain_get_block_transfers(options?: getBlockTransfersOptions | null): Promise<GetBlockTransfersResult>;
    chain_get_era_info_by_switch_block(options?: getEraInfoOptions | null): Promise<GetEraInfoResult>;
    chain_get_era_summary(options?: getEraSummaryOptions | null): Promise<GetEraSummaryResult>;
    /**
     * Retrieves state root hash information using the provided options (alias for `get_state_root_hash`).
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
     */
    chain_get_state_root_hash(options?: getStateRootHashOptions | null): Promise<GetStateRootHashResult>;
    /**
     * JavaScript function for deploying with deserialized parameters.
     *
     * # Arguments
     *
     * * `deploy_params` - Deploy parameters.
     * * `session_params` - Session parameters.
     * * `payment_params` - Payment parameters.
     * * `verbosity` - An optional verbosity level.
     * * `rpc_address` - An optional rpc address.
     *
     * # Returns
     *
     * A result containing PutDeployResult or a JsError.
     */
    deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutDeployResult>;
    getNodeAddress(node_address?: string | null): string;
    getRPCAddress(rpc_address?: string | null): string;
    getVerbosity(verbosity?: Verbosity | null): Verbosity;
    /**
     * Retrieves account information using the provided options.
     *
     * This function is an asynchronous JavaScript binding for the Rust `get_account` method.
     *
     * # Arguments
     *
     * * `options` - An optional `GetAccountOptions` struct containing retrieval options, such as:
     *   - `account_identifier`: Identifier for the account.
     *   - `account_identifier_as_string`: String representation of the account identifier.
     *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
     *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
     *   - `verbosity`: Verbosity level for the output.
     *   - `rpc_address`: Address of the node to query.
     *
     * # Returns
     *
     * A `Result` containing either a `GetAccountResult` on success or a `JsError` on failure.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
     * ```
     */
    get_account(options?: getAccountOptions | null): Promise<GetAccountResult>;
    get_account_options(options: any): getAccountOptions;
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
     */
    get_auction_info(options?: getAuctionInfoOptions | null): Promise<GetAuctionInfoResult>;
    /**
     * Parses auction info options from a JsValue.
     *
     * # Arguments
     *
     * * `options` - A JsValue containing auction info options to be parsed.
     *
     * # Returns
     *
     * Result containing parsed auction info options as a `GetAuctionInfoOptions` struct,
     * or a `JsError` if deserialization fails.
     */
    get_auction_info_options(options: any): getAuctionInfoOptions;
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
     */
    get_balance(options?: getBalanceOptions | null): Promise<GetBalanceResult>;
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
     */
    get_balance_options(options: any): getBalanceOptions;
    get_binary_available_block_range(node_address?: string | null): Promise<any>;
    get_binary_block_header_by_hash(block_hash: BlockHash, node_address?: string | null): Promise<any>;
    get_binary_block_header_by_height(height: bigint, node_address?: string | null): Promise<any>;
    get_binary_block_synchronizer_status(node_address?: string | null): Promise<any>;
    get_binary_block_with_signatures_by_hash(block_hash: BlockHash, node_address?: string | null): Promise<any>;
    get_binary_block_with_signatures_by_height(height: bigint, node_address?: string | null): Promise<any>;
    get_binary_chainspec_raw_bytes(node_address?: string | null): Promise<any>;
    get_binary_consensus_status(node_address?: string | null): Promise<any>;
    get_binary_consensus_validator_changes(node_address?: string | null): Promise<any>;
    get_binary_delegator_reward_by_block_hash(validator_key: PublicKey, delegator_key: PublicKey, block_hash: BlockHash, node_address?: string | null): Promise<any>;
    get_binary_delegator_reward_by_block_height(validator_key: PublicKey, delegator_key: PublicKey, block_height: bigint, node_address?: string | null): Promise<any>;
    get_binary_delegator_reward_by_era(validator_key: PublicKey, delegator_key: PublicKey, era: EraId, node_address?: string | null): Promise<any>;
    get_binary_global_state_item(key: Key, path: string[], node_address?: string | null): Promise<any>;
    get_binary_global_state_item_by_block_hash(block_hash: BlockHash, key: Key, path: string[], node_address?: string | null): Promise<any>;
    get_binary_global_state_item_by_block_height(block_height: bigint, key: Key, path: string[], node_address?: string | null): Promise<any>;
    get_binary_global_state_item_by_state_root_hash(state_root_hash: Digest, key: Key, path: string[], node_address?: string | null): Promise<any>;
    get_binary_last_progress(node_address?: string | null): Promise<any>;
    get_binary_latest_block_header(node_address?: string | null): Promise<any>;
    get_binary_latest_block_with_signatures(node_address?: string | null): Promise<any>;
    get_binary_latest_switch_block_header(node_address?: string | null): Promise<any>;
    get_binary_network_name(node_address?: string | null): Promise<any>;
    get_binary_next_upgrade(node_address?: string | null): Promise<any>;
    get_binary_node_status(node_address?: string | null): Promise<any>;
    get_binary_peers(node_address?: string | null): Promise<any>;
    get_binary_protocol_version(node_address?: string | null): Promise<any>;
    get_binary_reactor_state(node_address?: string | null): Promise<any>;
    get_binary_read_record(record_id: RecordId, key: Uint8Array, node_address?: string | null): Promise<any>;
    get_binary_transaction_by_hash(hash: TransactionHash, with_finalized_approvals: boolean, node_address?: string | null): Promise<any>;
    get_binary_try_accept_transaction(transaction: Transaction, node_address?: string | null): Promise<any>;
    get_binary_try_speculative_execution(transaction: Transaction, node_address?: string | null): Promise<any>;
    get_binary_uptime(node_address?: string | null): Promise<any>;
    get_binary_validator_reward_by_block_hash(validator_key: PublicKey, block_hash: BlockHash, node_address?: string | null): Promise<any>;
    get_binary_validator_reward_by_block_height(validator_key: PublicKey, block_height: bigint, node_address?: string | null): Promise<any>;
    get_binary_validator_reward_by_era(validator_key: PublicKey, era: EraId, node_address?: string | null): Promise<any>;
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
     */
    get_block(options?: getBlockOptions | null): Promise<GetBlockResult>;
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
     */
    get_block_options(options: any): getBlockOptions;
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
     */
    get_block_transfers(options?: getBlockTransfersOptions | null): Promise<GetBlockTransfersResult>;
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
     */
    get_block_transfers_options(options: any): getBlockTransfersOptions;
    /**
     * Asynchronously retrieves the chainspec.
     *
     * # Arguments
     *
     * * `verbosity` - An optional `Verbosity` parameter.
     * * `rpc_address` - An optional rpc address as a string.
     *
     * # Returns
     *
     * A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
     */
    get_chainspec(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetChainspecResult>;
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
     */
    get_deploy(options?: getDeployOptions | null): Promise<GetDeployResult>;
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
     */
    get_deploy_options(options: any): getDeployOptions;
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
     */
    get_dictionary_item(options?: getDictionaryItemOptions | null): Promise<GetDictionaryItemResult>;
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
     */
    get_dictionary_item_options(options: any): getDictionaryItemOptions;
    /**
     * Retrieves entity information using the provided options.
     *
     * This function is an asynchronous JavaScript binding for the Rust `get_entity` method.
     *
     * # Arguments
     *
     * * `options` - An optional `GetEntityOptions` struct containing retrieval options, such as:
     *   - `entity_identifier`: Identifier for the entity.
     *   - `entity_identifier_as_string`: String representation of the entity identifier.
     *   - `maybe_block_id_as_string`: Optional string representation of the block ID.
     *   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
     *   - `verbosity`: Verbosity level for the output.
     *   - `rpc_address`: Address of the node to query.
     *
     * # Returns
     *
     * A `Result` containing either a `GetAddressableEntityResult` on success or a `JsError` on failure.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
     * ```
     */
    get_entity(options?: getEntityOptions | null): Promise<GetAddressableEntityResult>;
    get_entity_options(options: any): getEntityOptions;
    get_era_info(options?: getEraInfoOptions | null): Promise<GetEraInfoResult>;
    get_era_info_options(options: any): getEraInfoOptions;
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
     */
    get_era_summary(options?: getEraSummaryOptions | null): Promise<GetEraSummaryResult>;
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
     */
    get_era_summary_options(options: any): getEraSummaryOptions;
    /**
     * Retrieves node status information using the provided options.
     *
     * # Arguments
     *
     * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
     * * `rpc_address` - An optional string specifying the rpc address to use for the request.
     *
     * # Returns
     *
     * A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the retrieval process.
     */
    get_node_status(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetNodeStatusResult>;
    /**
     * Retrieves peers asynchronously.
     *
     * # Arguments
     *
     * * `verbosity` - Optional verbosity level.
     * * `rpc_address` - Optional rpc address.
     *
     * # Returns
     *
     * A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
     */
    get_peers(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetPeersResult>;
    /**
     * Get options for speculative execution from a JavaScript value.
     */
    get_speculative_exec_deploy_options(options: any): getSpeculativeExecDeployOptions;
    /**
     * Get options for speculative execution from a JavaScript value.
     */
    get_speculative_exec_options(options: any): getSpeculativeExecTxnOptions;
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
     */
    get_state_root_hash(options?: getStateRootHashOptions | null): Promise<GetStateRootHashResult>;
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
     */
    get_state_root_hash_options(options: any): getStateRootHashOptions;
    /**
     * Retrieves transaction information using the provided options.
     *
     * # Arguments
     *
     * * `options` - An optional `GetTransactionOptions` struct containing retrieval options.
     *
     * # Returns
     *
     * A `Result` containing either a `GetTransactionResult` or an error.
     */
    get_transaction(options?: getTransactionOptions | null): Promise<GetTransactionResult>;
    /**
     * Parses transaction options from a JsValue.
     *
     * # Arguments
     *
     * * `options` - A JsValue containing transaction options to be parsed.
     *
     * # Returns
     *
     * Parsed transaction options as a `GetTransactionOptions` struct.
     */
    get_transaction_options(options: any): getTransactionOptions;
    /**
     * Retrieves validator changes using the provided options.
     *
     * # Arguments
     *
     * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
     * * `rpc_address` - An optional string specifying the rpc address to use for the request.
     *
     * # Returns
     *
     * A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the retrieval process.
     */
    get_validator_changes(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetValidatorChangesResult>;
    info_get_chainspec(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetChainspecResult>;
    /**
     * Retrieves deploy information using the provided options, alias for `get_deploy`.
     */
    info_get_deploy(options?: getDeployOptions | null): Promise<GetDeployResult>;
    info_get_peers(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetPeersResult>;
    info_get_status(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetNodeStatusResult>;
    /**
     * Retrieves transaction information using the provided options, alias for `get_transaction`.
     */
    info_get_transaction(options?: getTransactionOptions | null): Promise<GetTransactionResult>;
    info_get_validator_change(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<GetValidatorChangesResult>;
    /**
     * Installs a smart contract with the specified parameters and returns the result.
     *
     * # Arguments
     * .
     * * `transaction_params` - Transaction parameters.
     * * `transaction_bytes` - Transaction Bytes to install
     * * `rpc_address` - An optional rpc address to send the request to.
     *
     * # Returns
     *
     * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the installation.
     */
    install(transaction_params: TransactionStrParams, transaction_bytes: Bytes, rpc_address?: string | null): Promise<PutTransactionResult>;
    /**
     * Installs a smart contract with the specified parameters and returns the result.
     *
     * # Arguments
     *
     * * `deploy_params` - The deploy parameters.
     * * `session_params` - The session parameters.
     * * `payment_amount` - The payment amount as a string.
     * * `rpc_address` - An optional rpc address to send the request to.
     *
     * # Returns
     *
     * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the installation.
     */
    install_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, rpc_address?: string | null): Promise<PutDeployResult>;
    /**
     * Lists available RPCs using the provided options.
     *
     * # Arguments
     *
     * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
     * * `rpc_address` - An optional string specifying the rpc address to use for the request.
     *
     * # Returns
     *
     * A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the listing process.
     */
    list_rpcs(verbosity?: Verbosity | null, rpc_address?: string | null): Promise<ListRpcsResult>;
    /**
     * JS function for `make_deploy`.
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
     */
    make_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
    /**
     * JS function for `make_transaction`.
     *
     * # Arguments
     *
     * * `builder_params` - Transaction Builder parameters.
     * * `transaction_params` - The transaction parameters.
     *
     * # Returns
     *
     * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
     */
    make_transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams): Transaction;
    /**
     * JS function for `make_transfer`.
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
     */
    make_transfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
    /**
     * JS function for `make_transfer_transaction`.
     *
     * # Arguments
     *
     * * `maybe_source` - Optional transfer source uref.
     * * `amount` - The transfer amount.
     * * `target` - The target account.
     * * `transaction_params` - The transaction parameters.
     * * `maybe_id` - Optional transfer identifier.
     *
     * # Returns
     *
     * A `Result` containing the created `Transaction` or a `JsError` in case of an error.
     */
    make_transfer_transaction(maybe_source: URef | null | undefined, target: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string | null): Transaction;
    constructor(rpc_address?: string | null, node_address?: string | null, verbosity?: Verbosity | null);
    /**
     * Puts a deploy using the provided options.
     *
     * # Arguments
     *
     * * `deploy` - The `Deploy` object to be sent.
     * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
     * * `rpc_address` - An optional string specifying the rpc address to use for the request.
     *
     * # Returns
     *
     * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the deploy process.
     */
    put_deploy(deploy: Deploy, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutDeployResult>;
    /**
     * Puts a transaction using the provided options.
     *
     * # Arguments
     *
     * * `transaction` - The `Transaction` object to be sent.
     * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
     * * `rpc_address` - An optional string specifying the rpc address to use for the request.
     *
     * # Returns
     *
     * A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the transaction process.
     */
    put_transaction(transaction: Transaction, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutTransactionResult>;
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
     */
    query_balance(options?: queryBalanceOptions | null): Promise<QueryBalanceResult>;
    /**
     * Retrieves balance information using the provided options.
     *
     * # Arguments
     *
     * * `options` - An optional `QueryBalanceDetailsOptions` struct containing retrieval options.
     *
     * # Returns
     *
     * A `Result` containing either a `QueryBalanceDetailsResult` or a `JsError` in case of an error.
     *
     * # Errors
     *
     * Returns a `JsError` if there is an error during the retrieval process.
     */
    query_balance_details(options?: queryBalanceDetailsOptions | null): Promise<QueryBalanceDetailsResult>;
    /**
     * Parses query balance options from a JsValue.
     *
     * # Arguments
     *
     * * `options` - A JsValue containing query balance options to be parsed.
     *
     * # Returns
     *
     * Parsed query balance options as a `QueryBalanceDetailsOptions` struct.
     */
    query_balance_details_options(options: any): queryBalanceDetailsOptions;
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
     */
    query_balance_options(options: any): queryBalanceOptions;
    /**
     * JavaScript function for query_contract_dict with deserialized options.
     */
    query_contract_dict(options?: queryContractDictOptions | null): Promise<GetDictionaryItemResult>;
    /**
     * Deserialize query_contract_dict_options from a JavaScript object.
     */
    query_contract_dict_options(options: any): queryContractDictOptions;
    /**
     * JavaScript function for query_contract_key with deserialized options.
     */
    query_contract_key(options?: queryContractKeyOptions | null): Promise<QueryGlobalStateResult>;
    /**
     * Deserialize query_contract_key_options from a JavaScript object.
     */
    query_contract_key_options(options: any): queryContractKeyOptions;
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
     */
    query_global_state(options?: queryGlobalStateOptions | null): Promise<QueryGlobalStateResult>;
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
     */
    query_global_state_options(options: any): queryGlobalStateOptions;
    setNodeAddress(node_address?: string | null): void;
    setRPCAddress(rpc_address?: string | null): void;
    setVerbosity(verbosity?: Verbosity | null): void;
    /**
     * JS function for `sign_deploy`.
     *
     * # Arguments
     *
     * * `deploy` - The deploy to sign.
     * * `secret_key` - The secret key for signing.
     *
     * # Returns
     *
     * The signed `Deploy`.
     */
    sign_deploy(deploy: Deploy, secret_key: string): Deploy;
    /**
     * JS function for `sign_transaction`.
     *
     * # Arguments
     *
     * * `transaction` - The transaction to sign.
     * * `secret_key` - The secret key for signing.
     *
     * # Returns
     *
     * The signed `Transaction`.
     */
    sign_transaction(transaction: Transaction, secret_key: string): Transaction;
    /**
     * This function allows executing a deploy speculatively.
     *
     * # Arguments
     *
     * * `deploy_params` - Deployment parameters for the deploy.
     * * `session_params` - Session parameters for the deploy.
     * * `payment_params` - Payment parameters for the deploy.
     * * `verbosity` - Optional verbosity level.
     * * `rpc_address` - Optional rpc address.
     *
     * # Returns
     *
     * A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
     */
    speculative_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<SpeculativeExecResult>;
    /**
     * JS function for speculative execution.
     *
     * # Arguments
     *
     * * `options` - The options for speculative execution.
     *
     * # Returns
     *
     * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
     */
    speculative_exec(options?: getSpeculativeExecTxnOptions | null): Promise<SpeculativeExecTxnResult>;
    /**
     * JS function for speculative execution.
     *
     * # Arguments
     *
     * * `options` - The options for speculative execution.
     *
     * # Returns
     *
     * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
     */
    speculative_exec_deploy(options?: getSpeculativeExecDeployOptions | null): Promise<SpeculativeExecResult>;
    /**
     * This function allows executing a transaction speculatively.
     *
     * # Arguments
     *
     * * `builder_params` - Transaction Builder parameters.
     * * `transaction_params` - Transactionment parameters for the transaction.
     * * `verbosity` - Optional verbosity level.
     * * `rpc_address` - Optional rpc address.
     *
     * # Returns
     *
     * A `Result` containing either a `SpeculativeExecTxnResult` or a `JsError` in case of an error.
     */
    speculative_transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<SpeculativeExecTxnResult>;
    /**
     * JS function for speculative transfer.
     *
     * # Arguments
     *
     * * `amount` - The amount to transfer.
     * * `target_account` - The target account.
     * * `transfer_id` - An optional transfer ID (defaults to a random number).
     * * `deploy_params` - The deployment parameters.
     * * `payment_params` - The payment parameters.
     * * `verbosity` - The verbosity level for logging (optional).
     * * `rpc_address` - The address of the node to connect to (optional).
     *
     * # Returns
     *
     * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
     */
    speculative_transfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<SpeculativeExecResult>;
    /**
     * JS function for speculative transfer transaction.
     *
     * # Arguments
     *
     * * `maybe_source` - Optional transfer source uref.
     * * `target_account` - The target account.
     * * `amount` - The amount to transfer.
     * * `maybe_id` - An optional transfer ID (defaults to a random number).
     * * `transaction_params` - The transactionment parameters.
     * * `verbosity` - The verbosity level for logging (optional).
     * * `rpc_address` - The address of the node to connect to (optional).
     *
     * # Returns
     *
     * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
     */
    speculative_transfer_transaction(maybe_source: URef | null | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string | null, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<SpeculativeExecTxnResult>;
    state_get_account_info(options?: getAccountOptions | null): Promise<GetAccountResult>;
    state_get_auction_info_js_alias(options?: getAuctionInfoOptions | null): Promise<GetAuctionInfoResult>;
    /**
     * JavaScript Alias for `get_balance`.
     *
     * # Arguments
     *
     * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
     *
     * # Returns
     *
     * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
     */
    state_get_balance(options?: getBalanceOptions | null): Promise<GetBalanceResult>;
    /**
     * JavaScript Alias for `get_dictionary_item`
     */
    state_get_dictionary_item(options?: getDictionaryItemOptions | null): Promise<GetDictionaryItemResult>;
    state_get_entity(options?: getEntityOptions | null): Promise<GetAddressableEntityResult>;
    /**
     * JavaScript function for transactioning with deserialized parameters.
     *
     * # Arguments
     *
     * * `transaction_params` - Transaction parameters.
     * * `builder_params` - Session parameters.
     * * `verbosity` - An optional verbosity level.
     * * `rpc_address` - An optional rpc address.
     *
     * # Returns
     *
     * A result containing PutTransactionResult or a JsError.
     */
    transaction(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutTransactionResult>;
    /**
     * JS function for transferring funds.
     *
     * # Arguments
     *
     * * `amount` - The amount to transfer.
     * * `target_account` - The target account.
     * * `transfer_id` - An optional transfer ID (defaults to a random number).
     * * `deploy_params` - The deployment parameters.
     * * `payment_params` - The payment parameters.
     * * `verbosity` - The verbosity level for logging (optional).
     * * `rpc_address` - The address of the node to connect to (optional).
     *
     * # Returns
     *
     * A `Result` containing the result of the transfer or a `JsError` in case of an error.
     */
    transfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutDeployResult>;
    /**
     * JS function for transaction transferring funds.
     *
     * # Arguments
     *
     * * `maybe_source` - Optional transfer source uref.
     * * `target_account` - The target account.
     * * `amount` - The amount to transfer.
     * * `transaction_params` - The transaction parameters.
     * * `maybe_id` - An optional transfer ID (defaults to a random number).
     * * `verbosity` - The verbosity level for logging (optional).
     * * `rpc_address` - The address of the node to connect to (optional).
     *
     * # Returns
     *
     * A `Result` containing the result of the transfer or a `JsError` in case of an error.
     */
    transfer_transaction(maybe_source: URef | null | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string | null, verbosity?: Verbosity | null, rpc_address?: string | null): Promise<PutTransactionResult>;
    /**
     * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
     * Legacy alias
     *
     * # Arguments
     *
     * * `events_url` - The URL to monitor for transaction events.
     * * `deploy_hash` - The deploy hash to wait for.
     * * `timeout_duration` - An optional timeout duration in seconds.
     *
     * # Returns
     *
     * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
     */
    waitDeploy(events_url: string, deploy_hash: string, timeout_duration?: number | null): Promise<Promise<any>>;
    /**
     * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
     *
     * # Arguments
     *
     * * `events_url` - The URL to monitor for transaction events.
     * * `target_hash` - The transaction hash to wait for.
     * * `timeout_duration` - An optional timeout duration in seconds.
     *
     * # Returns
     *
     * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
     */
    waitTransaction(events_url: string, target_hash: string, timeout_duration?: number | null): Promise<Promise<any>>;
    /**
     * Creates a new Watcher instance to watch deploys (JavaScript-friendly).
     * Legacy alias
     *
     * # Arguments
     *
     * * `events_url` - The URL to monitor for transaction events.
     * * `timeout_duration` - An optional timeout duration in seconds.
     *
     * # Returns
     *
     * A `Watcher` instance.
     */
    watchDeploy(events_url: string, timeout_duration?: number | null): Watcher;
    /**
     * Creates a new Watcher instance to watch deploys (JavaScript-friendly).
     *
     * # Arguments
     *
     * * `events_url` - The URL to monitor for transaction events.
     * * `timeout_duration` - An optional timeout duration in seconds.
     *
     * # Returns
     *
     * A `Watcher` instance.
     */
    watchTransaction(events_url: string, timeout_duration?: number | null): Watcher;
}

export class SessionStrParams {
    free(): void;
    [Symbol.dispose](): void;
    constructor(session_hash?: string | null, session_name?: string | null, session_package_hash?: string | null, session_package_name?: string | null, session_path?: string | null, session_bytes?: Bytes | null, session_args_simple?: Array<any> | null, session_args_json?: string | null, session_version?: string | null, session_entry_point?: string | null, is_session_transfer?: boolean | null);
    get is_session_transfer(): boolean | undefined;
    set is_session_transfer(value: boolean);
    get session_args_json(): string | undefined;
    set session_args_json(value: string);
    get session_args_simple(): ArgsSimple | undefined;
    set session_args_simple(value: Array<any>);
    get session_bytes(): Bytes | undefined;
    set session_bytes(value: Bytes);
    get session_entry_point(): string | undefined;
    set session_entry_point(value: string);
    get session_hash(): string | undefined;
    set session_hash(value: string);
    get session_name(): string | undefined;
    set session_name(value: string);
    get session_package_hash(): string | undefined;
    set session_package_hash(value: string);
    get session_package_name(): string | undefined;
    set session_package_name(value: string);
    get session_path(): string | undefined;
    set session_path(value: string);
    get session_version(): string | undefined;
    set session_version(value: string);
}

export class SignatureResponse {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get_signature(): Uint8Array;
    get_signature_hex(): string;
    is_cancelled(): boolean;
}

export class SpeculativeExecResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Convert the result to JSON format.
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

export class SpeculativeExecTxnResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Convert the result to JSON format.
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
 * Represents a subscription to transaction events for wasm32 target architecture.
 */
export class Subscription {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Constructor for Subscription for wasm32 target architecture.
     *
     * # Arguments
     *
     * * `transaction_hash` - Transaction hash to identify the subscription.
     * * `event_handler_fn` - Handler function for transaction events.
     */
    constructor(target_hash: string, event_handler_fn: Function);
    /**
     * Handler function for transaction events.
     */
    eventHandlerFn: Function;
    /**
     * Transaction target hash to identify the subscription.
     */
    targetHash: string;
}

export class Transaction {
    free(): void;
    [Symbol.dispose](): void;
    addArg(js_value_arg: any, secret_key?: string | null): Transaction;
    addSignature(public_key: string, signature: string): Transaction;
    approvalsHash(): any;
    constructor(transaction: any);
    static newSession(builder_params: TransactionBuilderParams, transaction_params: TransactionStrParams): Transaction;
    static newTransfer(maybe_source: URef | null | undefined, target_account: string, amount: string, transaction_params: TransactionStrParams, maybe_id?: string | null): Transaction;
    session_args(): any;
    sign(secret_key: string): Transaction;
    toJson(): any;
    verify(): boolean;
    withAccountHash(account_hash: AccountHash, secret_key?: string | null): Transaction;
    withChainName(chain_name: string, secret_key?: string | null): Transaction;
    withEntityHash(hash: AddressableEntityHash, secret_key?: string | null): Transaction;
    withEntryPoint(entry_point: string, secret_key?: string | null): Transaction;
    withPackageHash(package_hash: PackageHash, secret_key?: string | null): Transaction;
    withPublicKey(public_key: PublicKey, secret_key?: string | null): Transaction;
    withSecretKey(secret_key?: string | null): Transaction;
    withTTL(ttl: string, secret_key?: string | null): Transaction;
    withTimestamp(timestamp: string, secret_key?: string | null): Transaction;
    withTransactionBytes(transaction_bytes: Bytes, is_install_upgrade?: boolean | null, secret_key?: string | null): Transaction;
    readonly account_hash: AccountHash;
    readonly additional_computation_factor: number;
    readonly approvals: any;
    readonly authorization_keys: any;
    readonly chain_name: string;
    readonly entry_point: string;
    readonly expired: boolean;
    readonly expires: any;
    readonly gas_price_tolerance: number;
    readonly hash: TransactionHash;
    readonly initiator_addr: string;
    readonly is_native: boolean;
    readonly is_standard_payment: boolean;
    readonly payment_amount: bigint | undefined;
    readonly pricing_mode: PricingMode;
    readonly receipt: Digest;
    readonly signers: any;
    readonly size_estimate: number;
    readonly target: any;
    readonly timestamp: string;
    readonly ttl: string;
}

export class TransactionBuilderParams {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static newAddBid(public_key: PublicKey, delegation_rate: number, amount: string, minimum_delegation_amount?: bigint | null, maximum_delegation_amount?: bigint | null, reserved_slots?: number | null): TransactionBuilderParams;
    static newDelegate(delegator: PublicKey, validator: PublicKey, amount: string): TransactionBuilderParams;
    static newInvocableEntity(entity_hash: AddressableEntityHash, entry_point: string): TransactionBuilderParams;
    static newInvocableEntityAlias(entity_alias: string, entry_point: string): TransactionBuilderParams;
    static newPackage(package_hash: PackageHash, entry_point: string, maybe_entity_version?: string | null): TransactionBuilderParams;
    static newPackageAlias(package_alias: string, entry_point: string, maybe_entity_version?: string | null): TransactionBuilderParams;
    static newPackageAliasWithMajor(package_alias: string, entry_point: string, maybe_entity_version?: string | null, major_protocol_version?: number | null): TransactionBuilderParams;
    static newPackageWithMajor(package_hash: PackageHash, entry_point: string, maybe_entity_version?: string | null, major_protocol_version?: number | null): TransactionBuilderParams;
    static newRedelegate(delegator: PublicKey, validator: PublicKey, new_validator: PublicKey, amount: string): TransactionBuilderParams;
    static newSession(transaction_bytes?: Bytes | null, is_install_upgrade?: boolean | null): TransactionBuilderParams;
    static newTransfer(maybe_source: URef | null | undefined, target: TransferTarget, amount: string, maybe_id?: bigint | null): TransactionBuilderParams;
    static newUndelegate(delegator: PublicKey, validator: PublicKey, amount: string): TransactionBuilderParams;
    static newWithdrawBid(public_key: PublicKey, amount: string): TransactionBuilderParams;
    get amount(): string | undefined;
    set amount(value: string);
    get delegation_rate(): number | undefined;
    set delegation_rate(value: number);
    get delegator(): PublicKey | undefined;
    set delegator(value: PublicKey);
    get entity_alias(): string | undefined;
    set entity_alias(value: string);
    get entity_hash(): AddressableEntityHash | undefined;
    set entity_hash(value: AddressableEntityHash);
    get entry_point(): string | undefined;
    set entry_point(value: string);
    get is_install_upgrade(): boolean | undefined;
    set is_install_upgrade(value: boolean);
    kind: TransactionKind;
    get maximum_delegation_amount(): bigint | undefined;
    set maximum_delegation_amount(value: bigint | null | undefined);
    get maybe_id(): bigint | undefined;
    set maybe_id(value: bigint);
    get maybe_source(): URef | undefined;
    set maybe_source(value: URef);
    get minimum_delegation_amount(): bigint | undefined;
    set minimum_delegation_amount(value: bigint | null | undefined);
    get new_validator(): PublicKey | undefined;
    set new_validator(value: PublicKey);
    get package_alias(): string | undefined;
    set package_alias(value: string);
    get package_hash(): PackageHash | undefined;
    set package_hash(value: PackageHash);
    get public_key(): PublicKey | undefined;
    set public_key(value: PublicKey);
    get target(): TransferTarget | undefined;
    set target(value: TransferTarget);
    get transaction_bytes(): Bytes | undefined;
    set transaction_bytes(value: Bytes);
    get validator(): PublicKey | undefined;
    set validator(value: PublicKey);
}

export class TransactionHash {
    free(): void;
    [Symbol.dispose](): void;
    digest(): Digest;
    static fromRaw(bytes: Uint8Array): TransactionHash;
    constructor(transaction_hash_hex_str: string);
    toJson(): any;
    toString(): string;
}

export enum TransactionKind {
    InvocableEntity = 0,
    InvocableEntityAlias = 1,
    Package = 2,
    PackageAlias = 3,
    Session = 4,
    Transfer = 5,
    AddBid = 6,
    Delegate = 7,
    Undelegate = 8,
    Redelegate = 9,
    WithdrawBid = 10,
}

/**
 * Represents processed deploy information.
 */
export class TransactionProcessed {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    block_hash: string;
    /**
     * Result of the execution, either Success or Failure.
     */
    execution_result: ExecutionResult;
    hash: HashString;
    initiator_addr: PublicKeyString;
    messages: Messages[];
    timestamp: string;
    ttl: string;
}

export class TransactionStrParams {
    free(): void;
    [Symbol.dispose](): void;
    constructor(chain_name: string, initiator_addr?: string | null, secret_key?: string | null, timestamp?: string | null, ttl?: string | null, session_args_simple?: string[] | null, session_args_json?: string | null, pricing_mode?: PricingMode | null, additional_computation_factor?: string | null, payment_amount?: string | null, gas_price_tolerance?: string | null, receipt?: string | null, standard_payment?: boolean | null, transferred_value?: string | null, session_entry_point?: string | null, chunked_args?: Bytes | null, min_bid_override?: boolean | null);
    static new_with_defaults(chain_name: string, initiator_addr?: string | null, secret_key?: string | null, ttl?: string | null): TransactionStrParams;
    setDefaultTTL(): void;
    setDefaultTimestamp(): void;
    get additional_computation_factor(): string | undefined;
    set additional_computation_factor(value: string);
    get chain_name(): string | undefined;
    set chain_name(value: string);
    get chunked_args(): Bytes | undefined;
    set chunked_args(value: Bytes);
    get gas_price_tolerance(): string | undefined;
    set gas_price_tolerance(value: string);
    get initiator_addr(): string | undefined;
    set initiator_addr(value: string);
    get payment_amount(): string | undefined;
    set payment_amount(value: string);
    get pricing_mode(): PricingMode | undefined;
    set pricing_mode(value: PricingMode);
    get receipt(): string | undefined;
    set receipt(value: string);
    get secret_key(): string | undefined;
    set secret_key(value: string);
    get session_args_json(): string | undefined;
    set session_args_json(value: string);
    get session_args_simple(): ArgsSimple | undefined;
    set session_args_simple(value: string[]);
    get session_entry_point(): string | undefined;
    set session_entry_point(value: string);
    set min_bid_override(value: boolean);
    get standard_payment(): boolean | undefined;
    set standard_payment(value: boolean);
    get timestamp(): string | undefined;
    set timestamp(value: string | null | undefined);
    get transferred_value(): string | undefined;
    set transferred_value(value: string);
    get ttl(): string | undefined;
    set ttl(value: string | null | undefined);
}

export class TransferAddr {
    free(): void;
    [Symbol.dispose](): void;
    constructor(bytes: Uint8Array);
}

export class TransferTarget {
    free(): void;
    [Symbol.dispose](): void;
    constructor(kind: TransferTargetKind, public_key?: PublicKey | null, account_hash?: AccountHash | null, uref?: URef | null);
}

export enum TransferTargetKind {
    PublicKey = 0,
    AccountHash = 1,
    URef = 2,
}

export class URef {
    free(): void;
    [Symbol.dispose](): void;
    static fromFormattedStr(formatted_str: string): URef;
    static fromUint8Array(bytes: Uint8Array, access_rights: number): URef;
    constructor(uref_hex_str: string, access_rights: number);
    toFormattedString(): string;
    toJson(): any;
}

export class URefAddr {
    free(): void;
    [Symbol.dispose](): void;
    constructor(bytes: Uint8Array);
}

export enum Verbosity {
    Low = 0,
    Medium = 1,
    High = 2,
}

/**
 * Represents a success response containing a cost value.
 */
export class Version2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    consumed: string;
    cost: string;
    get error_message(): string | undefined;
    set error_message(value: string | null | undefined);
    initiator: PublicKeyString;
    limit: string;
}

/**
 * Represents a deploy watcher responsible for monitoring transaction events.
 *
 * This struct allows clients to subscribe to transaction events, start watching for events,
 * or wait for an event and handle the received deploy event data.
 *
 * # Fields
 *
 * * `events_url` - The URL for transaction events.
 * * `subscriptions` - Vector containing deploy subscriptions.
 * * `active` - Reference-counted cell indicating whether the deploy watcher is active.
 * * `timeout_duration` - Duration representing the optional timeout for watching events.
 */
export class Watcher {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Creates a new `Watcher` instance.
     *
     * # Arguments
     *
     * * `events_url` - The URL for transaction events.
     * * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
     *   a default timeout of 60,000 milliseconds (1 minute) is used.
     *
     * # Returns
     *
     * A new `Watcher` instance.
     */
    constructor(events_url: string, timeout_duration?: bigint | null);
    /**
     * Starts watching for transaction events (JavaScript-friendly).
     *
     * # Returns
     *
     * Result containing the serialized transaction events data or an error message.
     */
    start(): Promise<any>;
    /**
     * Stops watching for transaction events.
     *
     * This method sets the deploy watcher as inactive and stops the event listener if it exists.
     */
    stop(): void;
    /**
     * Subscribes to transaction events.
     *
     * # Arguments
     *
     * * `subscriptions` - Vector of deploy subscriptions to be added.
     *
     * # Returns
     *
     * Result indicating success or an error message.
     */
    subscribe(subscriptions: Subscription[]): void;
    /**
     * Unsubscribes from transaction events based on the provided transaction hash.
     *
     * # Arguments
     *
     * * `transaction_hash` - The transaction hash to unsubscribe.
     *
     * This method removes the deploy subscription associated with the provided transaction hash.
     */
    unsubscribe(target_hash: string): void;
}

/**
 * Converts a formatted account hash to a base64-encoded string (cep-18 key encoding).
 *
 *
 * # Arguments
 *
 * * `formatted_account_hash` - A hex-formatted string representing the account hash.
 * Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
 *
 * # Returns
 *
 * Returns the base64-encoded string.
 * Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
 */
export function accountHashToBase64Key(formatted_account_hash: string): string;

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
 */
export function encodeLowerBlake2b(meta_data: string): any;

/**
 * Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 */
export function generateSecretKey(): any;

/**
 * Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 */
export function generateSecretKey_secp256k1(): any;

export class getAccountOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get account_identifier_as_string(): string | undefined;
    set account_identifier_as_string(value: string | null | undefined);
    get account_identifier(): AccountIdentifier | undefined;
    set account_identifier(value: AccountIdentifier | null | undefined);
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_auction_info` method.
 */
export class getAuctionInfoOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_balance` method.
 */
export class getBalanceOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get purse_uref_as_string(): string | undefined;
    set purse_uref_as_string(value: string | null | undefined);
    get purse_uref(): URef | undefined;
    set purse_uref(value: URef | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get state_root_hash_as_string(): string | undefined;
    set state_root_hash_as_string(value: string | null | undefined);
    get state_root_hash(): Digest | undefined;
    set state_root_hash(value: Digest | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_block` method.
 */
export class getBlockOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_block_transfers` method.
 */
export class getBlockTransfersOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_deploy` method.
 */
export class getDeployOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get deploy_hash_as_string(): string | undefined;
    set deploy_hash_as_string(value: string | null | undefined);
    get deploy_hash(): DeployHash | undefined;
    set deploy_hash(value: DeployHash | null | undefined);
    get finalized_approvals(): boolean | undefined;
    set finalized_approvals(value: boolean | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_dictionary_item` method.
 */
export class getDictionaryItemOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get dictionary_item_identifier(): DictionaryItemIdentifier | undefined;
    set dictionary_item_identifier(value: DictionaryItemIdentifier | null | undefined);
    get dictionary_item_params(): DictionaryItemStrParams | undefined;
    set dictionary_item_params(value: DictionaryItemStrParams | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get state_root_hash_as_string(): string | undefined;
    set state_root_hash_as_string(value: string | null | undefined);
    get state_root_hash(): Digest | undefined;
    set state_root_hash(value: Digest | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

export class getEntityOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get entity_identifier_as_string(): string | undefined;
    set entity_identifier_as_string(value: string | null | undefined);
    get entity_identifier(): EntityIdentifier | undefined;
    set entity_identifier(value: EntityIdentifier | null | undefined);
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

export class getEraInfoOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_era_summary` method.
 */
export class getEraSummaryOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for speculative execution.
 */
export class getSpeculativeExecDeployOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * The deploy as a JSON string.
     */
    get deploy_as_string(): string | undefined;
    /**
     * The deploy as a JSON string.
     */
    set deploy_as_string(value: string | null | undefined);
    /**
     * The deploy to execute.
     */
    get deploy(): Deploy | undefined;
    /**
     * The deploy to execute.
     */
    set deploy(value: Deploy | null | undefined);
    /**
     * The rpc address.
     */
    get rpc_address(): string | undefined;
    /**
     * The rpc address.
     */
    set rpc_address(value: string | null | undefined);
    /**
     * The verbosity level for logging.
     */
    get verbosity(): Verbosity | undefined;
    /**
     * The verbosity level for logging.
     */
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for speculative execution.
 */
export class getSpeculativeExecTxnOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * The rpc address.
     */
    get rpc_address(): string | undefined;
    /**
     * The rpc address.
     */
    set rpc_address(value: string | null | undefined);
    /**
     * The transaction as a JSON string.
     */
    get transaction_as_string(): string | undefined;
    /**
     * The transaction as a JSON string.
     */
    set transaction_as_string(value: string | null | undefined);
    /**
     * The transaction to execute.
     */
    get transaction(): Transaction | undefined;
    /**
     * The transaction to execute.
     */
    set transaction(value: Transaction | null | undefined);
    /**
     * The verbosity level for logging.
     */
    get verbosity(): Verbosity | undefined;
    /**
     * The verbosity level for logging.
     */
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `get_state_root_hash` method.
 */
export class getStateRootHashOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Gets the current timestamp.
 *
 * # Returns
 *
 * A JsValue containing the current timestamp.
 */
export function getTimestamp(): any;

/**
 * Options for the `get_transaction` method.
 */
export class getTransactionOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get finalized_approvals(): boolean | undefined;
    set finalized_approvals(value: boolean | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get transaction_hash_as_string(): string | undefined;
    set transaction_hash_as_string(value: string | null | undefined);
    get transaction_hash(): TransactionHash | undefined;
    set transaction_hash(value: TransactionHash | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

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
 */
export function hexToUint8Array(hex_string: string): Uint8Array;

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
 */
export function jsonPrettyPrint(value: any, verbosity?: Verbosity | null): any;

/**
 * Converts a formatted key hash to a base64-encoded string (CEP-18 key encoding) for use in JavaScript.
 *
 * This function acts as a wrapper around `get_base64_key_from_key_hash` and maps errors to JavaScript-compatible errors.
 *
 * # Arguments
 *
 * * `formatted_key_hash` - A hex-formatted string representing the key hash.
 * Example: "hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
 *
 * # Returns
 *
 * Returns a `Result` containing the base64-encoded string on success.
 * Example: "AbSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
 *
 * # Errors
 *
 * This function returns a `JsError` if:
 * - The input string is not a valid formatted key hash.
 * - The conversion to bytes or base64 encoding fails.
 *
 * The error message is formatted as a JavaScript-compatible string.
 */
export function keyHashToBase64Key(formatted_key_hash: string): string;

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
 */
export function makeDictionaryItemKey(key: Key, value: string): string;

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
 */
export function motesToCSPR(motes: string): string;

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
 * If an error occurs during the conversion, JavaScript error is returned.
 */
export function publicKeyFromSecretKey(secret_key: string): any;

/**
 * Options for the `query_balance` method.
 */
export class queryBalanceDetailsOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get global_state_identifier(): GlobalStateIdentifier | undefined;
    set global_state_identifier(value: GlobalStateIdentifier | null | undefined);
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get purse_identifier_as_string(): string | undefined;
    set purse_identifier_as_string(value: string | null | undefined);
    get purse_identifier(): PurseIdentifier | undefined;
    set purse_identifier(value: PurseIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get state_root_hash_as_string(): string | undefined;
    set state_root_hash_as_string(value: string | null | undefined);
    get state_root_hash(): Digest | undefined;
    set state_root_hash(value: Digest | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `query_balance` method.
 */
export class queryBalanceOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get global_state_identifier(): GlobalStateIdentifier | undefined;
    set global_state_identifier(value: GlobalStateIdentifier | null | undefined);
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get purse_identifier_as_string(): string | undefined;
    set purse_identifier_as_string(value: string | null | undefined);
    get purse_identifier(): PurseIdentifier | undefined;
    set purse_identifier(value: PurseIdentifier | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get state_root_hash_as_string(): string | undefined;
    set state_root_hash_as_string(value: string | null | undefined);
    get state_root_hash(): Digest | undefined;
    set state_root_hash(value: Digest | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

export class queryContractDictOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get dictionary_item_identifier(): DictionaryItemIdentifier | undefined;
    set dictionary_item_identifier(value: DictionaryItemIdentifier | null | undefined);
    get dictionary_item_params(): DictionaryItemStrParams | undefined;
    set dictionary_item_params(value: DictionaryItemStrParams | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get state_root_hash_as_string(): string | undefined;
    set state_root_hash_as_string(value: string | null | undefined);
    get state_root_hash(): Digest | undefined;
    set state_root_hash(value: Digest | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

export class queryContractKeyOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get entity_identifier_as_string(): string | undefined;
    set entity_identifier_as_string(value: string | null | undefined);
    get entity_identifier(): EntityIdentifier | undefined;
    set entity_identifier(value: EntityIdentifier | null | undefined);
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get maybe_block_identifier(): BlockIdentifier | undefined;
    set maybe_block_identifier(value: BlockIdentifier | null | undefined);
    get path_as_string(): string | undefined;
    set path_as_string(value: string | null | undefined);
    get path(): Path | undefined;
    set path(value: Path | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

/**
 * Options for the `query_global_state` method.
 */
export class queryGlobalStateOptions {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    get global_state_identifier(): GlobalStateIdentifier | undefined;
    set global_state_identifier(value: GlobalStateIdentifier | null | undefined);
    get key_as_string(): string | undefined;
    set key_as_string(value: string | null | undefined);
    get key(): Key | undefined;
    set key(value: Key | null | undefined);
    get maybe_block_id_as_string(): string | undefined;
    set maybe_block_id_as_string(value: string | null | undefined);
    get path_as_string(): string | undefined;
    set path_as_string(value: string | null | undefined);
    get path(): Path | undefined;
    set path(value: Path | null | undefined);
    get rpc_address(): string | undefined;
    set rpc_address(value: string | null | undefined);
    get state_root_hash_as_string(): string | undefined;
    set state_root_hash_as_string(value: string | null | undefined);
    get state_root_hash(): Digest | undefined;
    set state_root_hash(value: Digest | null | undefined);
    get verbosity(): Verbosity | undefined;
    set verbosity(value: Verbosity | null | undefined);
}

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
 */
export function uint8ArrayToBytes(uint8_array: Uint8Array): Bytes;
