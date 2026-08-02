/* @ts-self-types="./casper_rust_wasm_sdk.d.ts" */

class AccessRights {
    static __wrap(ptr) {
        const obj = Object.create(AccessRights.prototype);
        obj.__wbg_ptr = ptr;
        AccessRightsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AccessRightsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accessrights_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    static ADD() {
        const ret = wasm.accessrights_ADD();
        return ret;
    }
    /**
     * @returns {number}
     */
    static ADD_WRITE() {
        const ret = wasm.accessrights_ADD_WRITE();
        return ret;
    }
    /**
     * @returns {number}
     */
    static NONE() {
        const ret = wasm.accessrights_NONE();
        return ret;
    }
    /**
     * @returns {number}
     */
    static READ() {
        const ret = wasm.accessrights_READ();
        return ret;
    }
    /**
     * @returns {number}
     */
    static READ_ADD() {
        const ret = wasm.accessrights_READ_ADD();
        return ret;
    }
    /**
     * @returns {number}
     */
    static READ_ADD_WRITE() {
        const ret = wasm.accessrights_READ_ADD_WRITE();
        return ret;
    }
    /**
     * @returns {number}
     */
    static READ_WRITE() {
        const ret = wasm.accessrights_READ_WRITE();
        return ret;
    }
    /**
     * @returns {number}
     */
    static WRITE() {
        const ret = wasm.accessrights_WRITE();
        return ret;
    }
    /**
     * @param {boolean} read
     * @param {boolean} write
     * @param {boolean} add
     * @returns {AccessRights}
     */
    static from_bits(read, write, add) {
        const ret = wasm.accessrights_from_bits(read, write, add);
        return AccessRights.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    is_addable() {
        const ret = wasm.accessrights_is_addable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    is_none() {
        const ret = wasm.accessrights_is_none(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    is_readable() {
        const ret = wasm.accessrights_is_readable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    is_writeable() {
        const ret = wasm.accessrights_is_writeable(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} access_rights
     */
    constructor(access_rights) {
        const ret = wasm.accessrights_new(access_rights);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        AccessRightsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) AccessRights.prototype[Symbol.dispose] = AccessRights.prototype.free;
exports.AccessRights = AccessRights;

class AccountHash {
    static __wrap(ptr) {
        const obj = Object.create(AccountHash.prototype);
        obj.__wbg_ptr = ptr;
        AccountHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AccountHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accounthash_free(ptr, 0);
    }
    /**
     * @param {string} formatted_str
     * @returns {AccountHash}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accounthash_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return AccountHash.__wrap(ret[0]);
    }
    /**
     * @param {PublicKey} public_key
     * @returns {AccountHash}
     */
    static fromPublicKey(public_key) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        const ret = wasm.accounthash_fromPublicKey(ptr0);
        return AccountHash.__wrap(ret);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {AccountHash}
     */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accounthash_fromUint8Array(ptr0, len0);
        return AccountHash.__wrap(ret);
    }
    /**
     * @param {string} account_hash_hex_str
     */
    constructor(account_hash_hex_str) {
        const ptr0 = passStringToWasm0(account_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accounthash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        AccountHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.accounthash_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    toHexString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.accounthash_toHexString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.accounthash_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) AccountHash.prototype[Symbol.dispose] = AccountHash.prototype.free;
exports.AccountHash = AccountHash;

class AccountIdentifier {
    static __wrap(ptr) {
        const obj = Object.create(AccountIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        AccountIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AccountIdentifierFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_accountidentifier_free(ptr, 0);
    }
    /**
     * @param {AccountHash} account_hash
     * @returns {AccountIdentifier}
     */
    static fromAccountHash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromAccountHash(ptr0);
        return AccountIdentifier.__wrap(ret);
    }
    /**
     * @param {string} formatted_str
     * @returns {AccountIdentifier}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accountidentifier_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return AccountIdentifier.__wrap(ret[0]);
    }
    /**
     * @param {PublicKey} key
     * @returns {AccountIdentifier}
     */
    static fromPublicKey(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromPublicKey(ptr0);
        return AccountIdentifier.__wrap(ret);
    }
    /**
     * @param {string} formatted_str
     */
    constructor(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accountidentifier_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        AccountIdentifierFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.accountidentifier_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) AccountIdentifier.prototype[Symbol.dispose] = AccountIdentifier.prototype.free;
exports.AccountIdentifier = AccountIdentifier;

class AddressableEntityHash {
    static __wrap(ptr) {
        const obj = Object.create(AddressableEntityHash.prototype);
        obj.__wbg_ptr = ptr;
        AddressableEntityHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AddressableEntityHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_addressableentityhash_free(ptr, 0);
    }
    /**
     * @param {string} formatted_str
     * @returns {AddressableEntityHash}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.addressableentityhash_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return AddressableEntityHash.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {AddressableEntityHash}
     */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.addressableentityhash_fromUint8Array(ptr0, len0);
        return AddressableEntityHash.__wrap(ret);
    }
    /**
     * @param {string} addressable_entity_hex_str
     */
    constructor(addressable_entity_hex_str) {
        const ptr0 = passStringToWasm0(addressable_entity_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.addressableentityhash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        AddressableEntityHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.addressableentityhash_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) AddressableEntityHash.prototype[Symbol.dispose] = AddressableEntityHash.prototype.free;
exports.AddressableEntityHash = AddressableEntityHash;

class ArgsSimple {
    static __wrap(ptr) {
        const obj = Object.create(ArgsSimple.prototype);
        obj.__wbg_ptr = ptr;
        ArgsSimpleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ArgsSimpleFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_argssimple_free(ptr, 0);
    }
}
if (Symbol.dispose) ArgsSimple.prototype[Symbol.dispose] = ArgsSimple.prototype.free;
exports.ArgsSimple = ArgsSimple;

class BlockHash {
    static __wrap(ptr) {
        const obj = Object.create(BlockHash.prototype);
        obj.__wbg_ptr = ptr;
        BlockHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BlockHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockhash_free(ptr, 0);
    }
    /**
     * @param {Digest} digest
     * @returns {BlockHash}
     */
    static fromDigest(digest) {
        _assertClass(digest, Digest);
        var ptr0 = digest.__destroy_into_raw();
        const ret = wasm.blockhash_fromDigest(ptr0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BlockHash.__wrap(ret[0]);
    }
    /**
     * @param {string} block_hash_hex_str
     */
    constructor(block_hash_hex_str) {
        const ptr0 = passStringToWasm0(block_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blockhash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        BlockHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.blockhash_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.blockhash_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) BlockHash.prototype[Symbol.dispose] = BlockHash.prototype.free;
exports.BlockHash = BlockHash;

class BlockIdentifier {
    static __wrap(ptr) {
        const obj = Object.create(BlockIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        BlockIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BlockIdentifierFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockidentifier_free(ptr, 0);
    }
    /**
     * @param {bigint} height
     * @returns {BlockIdentifier}
     */
    static fromHeight(height) {
        const ret = wasm.blockidentifier_fromHeight(height);
        return BlockIdentifier.__wrap(ret);
    }
    /**
     * @param {BlockHash} hash
     * @returns {BlockIdentifier}
     */
    static from_hash(hash) {
        _assertClass(hash, BlockHash);
        var ptr0 = hash.__destroy_into_raw();
        const ret = wasm.blockidentifier_from_hash(ptr0);
        return BlockIdentifier.__wrap(ret);
    }
    /**
     * @param {BlockIdentifier} block_identifier
     */
    constructor(block_identifier) {
        _assertClass(block_identifier, BlockIdentifier);
        var ptr0 = block_identifier.__destroy_into_raw();
        const ret = wasm.blockidentifier_new(ptr0);
        this.__wbg_ptr = ret;
        BlockIdentifierFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.blockidentifier_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) BlockIdentifier.prototype[Symbol.dispose] = BlockIdentifier.prototype.free;
exports.BlockIdentifier = BlockIdentifier;

/**
 * Represents the body of an event, containing processed deploy information.
 */
class Body {
    static __wrap(ptr) {
        const obj = Object.create(Body.prototype);
        obj.__wbg_ptr = ptr;
        BodyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BodyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_body_free(ptr, 0);
    }
    /**
     * @returns {TransactionProcessed | undefined}
     */
    get get_deploy_processed() {
        const ret = wasm.body_get_deploy_processed(this.__wbg_ptr);
        return ret === 0 ? undefined : TransactionProcessed.__wrap(ret);
    }
    /**
     * @returns {TransactionProcessed | undefined}
     */
    get get_transaction_processed() {
        const ret = wasm.body_get_transaction_processed(this.__wbg_ptr);
        return ret === 0 ? undefined : TransactionProcessed.__wrap(ret);
    }
    /**
     * @returns {TransactionProcessed | undefined}
     */
    get transaction_processed() {
        const ret = wasm.__wbg_get_body_transaction_processed(this.__wbg_ptr);
        return ret === 0 ? undefined : TransactionProcessed.__wrap(ret);
    }
    /**
     * @param {TransactionProcessed | null} [arg0]
     */
    set transaction_processed(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransactionProcessed);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_body_transaction_processed(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) Body.prototype[Symbol.dispose] = Body.prototype.free;
exports.Body = Body;

class Bytes {
    static __wrap(ptr) {
        const obj = Object.create(Bytes.prototype);
        obj.__wbg_ptr = ptr;
        BytesFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BytesFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bytes_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} uint8_array
     * @returns {Bytes}
     */
    static fromUint8Array(uint8_array) {
        const ret = wasm.bytes_fromUint8Array(uint8_array);
        return Bytes.__wrap(ret);
    }
    constructor() {
        const ret = wasm.bytes_new();
        this.__wbg_ptr = ret;
        BytesFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) Bytes.prototype[Symbol.dispose] = Bytes.prototype.free;
exports.Bytes = Bytes;

class CasperWallet {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CasperWalletFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_casperwallet_free(ptr, 0);
    }
    /**
     * @returns {Promise<boolean>}
     */
    connect() {
        const ret = wasm.casperwallet_connect(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Promise<boolean>}
     */
    disconnect() {
        const ret = wasm.casperwallet_disconnect(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Promise<string>}
     */
    getActivePublicKey() {
        const ret = wasm.casperwallet_getActivePublicKey(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Promise<string>}
     */
    getVersion() {
        const ret = wasm.casperwallet_getVersion(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Promise<boolean>}
     */
    isConnected() {
        const ret = wasm.casperwallet_isConnected(this.__wbg_ptr);
        return ret;
    }
    constructor() {
        const ret = wasm.casperwallet_new();
        this.__wbg_ptr = ret;
        CasperWalletFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
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
     * @param {Deploy} deploy
     * @param {string | null} [public_key]
     * @returns {Promise<Deploy>}
     */
    signDeploy(deploy, public_key) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.casperwallet_signDeploy(this.__wbg_ptr, ptr0, ptr1, len1);
        return ret;
    }
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
     * @param {string} deploy_hash
     * @param {string | null} [public_key]
     * @returns {Promise<string>}
     */
    signDeployHash(deploy_hash, public_key) {
        const ptr0 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.casperwallet_signDeployHash(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
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
     * @param {string} message
     * @param {string | null} [public_key]
     * @returns {Promise<string>}
     */
    signMessage(message, public_key) {
        const ptr0 = passStringToWasm0(message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.casperwallet_signMessage(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * @param {Transaction} transaction
     * @param {string | null} [public_key]
     * @returns {Promise<Transaction>}
     */
    signTransaction(transaction, public_key) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.casperwallet_signTransaction(this.__wbg_ptr, ptr0, ptr1, len1);
        return ret;
    }
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
     * @param {string} transaction_hash
     * @param {string | null} [public_key]
     * @returns {Promise<string>}
     */
    signTransactionHash(transaction_hash, public_key) {
        const ptr0 = passStringToWasm0(transaction_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.casperwallet_signTransactionHash(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * @returns {Promise<boolean>}
     */
    switchAccount() {
        const ret = wasm.casperwallet_switchAccount(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) CasperWallet.prototype[Symbol.dispose] = CasperWallet.prototype.free;
exports.CasperWallet = CasperWallet;

class ContractHash {
    static __wrap(ptr) {
        const obj = Object.create(ContractHash.prototype);
        obj.__wbg_ptr = ptr;
        ContractHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ContractHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contracthash_free(ptr, 0);
    }
    /**
     * @param {string} formatted_str
     * @returns {ContractHash}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contracthash_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ContractHash.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {ContractHash}
     */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contracthash_fromUint8Array(ptr0, len0);
        return ContractHash.__wrap(ret);
    }
    /**
     * @param {string} contract_hash_hex_str
     */
    constructor(contract_hash_hex_str) {
        const ptr0 = passStringToWasm0(contract_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contracthash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        ContractHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.contracthash_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) ContractHash.prototype[Symbol.dispose] = ContractHash.prototype.free;
exports.ContractHash = ContractHash;

class ContractPackageHash {
    static __wrap(ptr) {
        const obj = Object.create(ContractPackageHash.prototype);
        obj.__wbg_ptr = ptr;
        ContractPackageHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ContractPackageHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contractpackagehash_free(ptr, 0);
    }
    /**
     * @param {string} formatted_str
     * @returns {ContractPackageHash}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contractpackagehash_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ContractPackageHash.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {ContractPackageHash}
     */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contractpackagehash_fromUint8Array(ptr0, len0);
        return ContractPackageHash.__wrap(ret);
    }
    /**
     * @param {string} contract_package_hash_hex_str
     */
    constructor(contract_package_hash_hex_str) {
        const ptr0 = passStringToWasm0(contract_package_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contractpackagehash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        ContractPackageHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.contractpackagehash_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) ContractPackageHash.prototype[Symbol.dispose] = ContractPackageHash.prototype.free;
exports.ContractPackageHash = ContractPackageHash;

class Deploy {
    static __wrap(ptr) {
        const obj = Object.create(Deploy.prototype);
        obj.__wbg_ptr = ptr;
        DeployFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploy_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    TTL() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.deploy_TTL(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    account() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.deploy_account(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {any} js_value_arg
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    addArg(js_value_arg, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_addArg(this.__wbg_ptr, js_value_arg, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Deploy.__wrap(ret[0]);
    }
    /**
     * @param {string} public_key
     * @param {string} signature
     * @returns {Deploy}
     */
    addSignature(public_key, signature) {
        const ptr0 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_addSignature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @returns {any}
     */
    approvals() {
        const ret = wasm.deploy_approvals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    approvalsHash() {
        const ret = wasm.deploy_approvalsHash(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    args() {
        const ret = wasm.deploy_args(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string | undefined}
     */
    byName() {
        const ret = wasm.deploy_byName(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string}
     */
    chainName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.deploy_chainName(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    entryPointName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.deploy_entryPointName(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    hasValidHash() {
        const ret = wasm.deploy_hasValidHash(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {DeployHash}
     */
    get hash() {
        const ret = wasm.deploy_hash(this.__wbg_ptr);
        return DeployHash.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isByName() {
        const ret = wasm.deploy_isByName(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isExpired() {
        const ret = wasm.deploy_isExpired(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isModuleBytes() {
        const ret = wasm.deploy_isModuleBytes(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number} phase
     * @returns {boolean}
     */
    isStandardPayment(phase) {
        const ret = wasm.deploy_isStandardPayment(this.__wbg_ptr, phase);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isStoredContract() {
        const ret = wasm.deploy_isStoredContract(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isStoredContractPackage() {
        const ret = wasm.deploy_isStoredContractPackage(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isTransfer() {
        const ret = wasm.deploy_isTransfer(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isValid() {
        const ret = wasm.deploy_isValid(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {any} deploy
     */
    constructor(deploy) {
        const ret = wasm.deploy_new(deploy);
        this.__wbg_ptr = ret;
        DeployFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} conv_rate
     * @returns {string}
     */
    paymentAmount(conv_rate) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.deploy_paymentAmount(this.__wbg_ptr, conv_rate);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} secret_key
     * @returns {Deploy}
     */
    sign(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_sign(this.__wbg_ptr, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.deploy_timestamp(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.deploy_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    validateDeploySize() {
        const ret = wasm.deploy_validateDeploySize(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {PublicKey} account
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withAccount(account, secret_key) {
        _assertClass(account, PublicKey);
        var ptr0 = account.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withAccount(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {string} chain_name
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withChainName(chain_name, secret_key) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withChainName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {string} entry_point_name
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withEntryPointName(entry_point_name, secret_key) {
        const ptr0 = passStringToWasm0(entry_point_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withEntryPointName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {ContractHash} hash
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withHash(hash, secret_key) {
        _assertClass(hash, ContractHash);
        var ptr0 = hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {Bytes} module_bytes
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withModuleBytes(module_bytes, secret_key) {
        _assertClass(module_bytes, Bytes);
        var ptr0 = module_bytes.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withModuleBytes(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {ContractPackageHash} package_hash
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withPackageHash(package_hash, secret_key) {
        _assertClass(package_hash, ContractPackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withPackageHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {any} payment
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withPayment(payment, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withPayment(this.__wbg_ptr, payment, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {DeployStrParams} deploy_params
     * @param {SessionStrParams} session_params
     * @param {PaymentStrParams} payment_params
     * @returns {Deploy}
     */
    static withPaymentAndSession(deploy_params, session_params, payment_params) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        const ret = wasm.deploy_withPaymentAndSession(ptr0, ptr1, ptr2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Deploy.__wrap(ret[0]);
    }
    /**
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withSecretKey(secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSecretKey(this.__wbg_ptr, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {any} session
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withSession(session, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSession(this.__wbg_ptr, session, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {string} amount
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withStandardPayment(amount, secret_key) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withStandardPayment(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {string} ttl
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withTTL(ttl, secret_key) {
        const ptr0 = passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withTTL(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {string} timestamp
     * @param {string | null} [secret_key]
     * @returns {Deploy}
     */
    withTimestamp(timestamp, secret_key) {
        const ptr0 = passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withTimestamp(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
    /**
     * @param {string} amount
     * @param {string} target_account
     * @param {string | null | undefined} transfer_id
     * @param {DeployStrParams} deploy_params
     * @param {PaymentStrParams} payment_params
     * @returns {Deploy}
     */
    static withTransfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        const ret = wasm.deploy_withTransfer(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Deploy.__wrap(ret[0]);
    }
}
if (Symbol.dispose) Deploy.prototype[Symbol.dispose] = Deploy.prototype.free;
exports.Deploy = Deploy;

class DeployHash {
    static __wrap(ptr) {
        const obj = Object.create(DeployHash.prototype);
        obj.__wbg_ptr = ptr;
        DeployHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deployhash_free(ptr, 0);
    }
    /**
     * @param {Digest} digest
     * @returns {DeployHash}
     */
    static fromDigest(digest) {
        _assertClass(digest, Digest);
        var ptr0 = digest.__destroy_into_raw();
        const ret = wasm.deployhash_fromDigest(ptr0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DeployHash.__wrap(ret[0]);
    }
    /**
     * @param {string} deploy_hash_hex_str
     */
    constructor(deploy_hash_hex_str) {
        const ptr0 = passStringToWasm0(deploy_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deployhash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        DeployHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.deployhash_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.deployhash_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) DeployHash.prototype[Symbol.dispose] = DeployHash.prototype.free;
exports.DeployHash = DeployHash;

class DeployStrParams {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployStrParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploystrparams_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get chain_name() {
        const ret = wasm.deploystrparams_chain_name(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get gas_price_tolerance() {
        const ret = wasm.deploystrparams_gas_price_tolerance(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string} chain_name
     * @param {string} session_account
     * @param {string | null} [secret_key]
     * @param {string | null} [timestamp]
     * @param {string | null} [ttl]
     * @param {string | null} [gas_price_tolerance]
     */
    constructor(chain_name, session_account, secret_key, timestamp, ttl, gas_price_tolerance) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(session_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(gas_price_tolerance) ? 0 : passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.deploystrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5);
        this.__wbg_ptr = ret;
        DeployStrParamsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string | undefined}
     */
    get secret_key() {
        const ret = wasm.deploystrparams_secret_key(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_account() {
        const ret = wasm.deploystrparams_session_account(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    setDefaultTTL() {
        wasm.deploystrparams_setDefaultTTL(this.__wbg_ptr);
    }
    setDefaultTimestamp() {
        wasm.deploystrparams_setDefaultTimestamp(this.__wbg_ptr);
    }
    /**
     * @param {string} chain_name
     */
    set chain_name(chain_name) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_chain_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} gas_price_tolerance
     */
    set gas_price_tolerance(gas_price_tolerance) {
        const ptr0 = passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_gas_price_tolerance(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} secret_key
     */
    set secret_key(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_secret_key(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_account
     */
    set session_account(session_account) {
        const ptr0 = passStringToWasm0(session_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_session_account(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [timestamp]
     */
    set timestamp(timestamp) {
        var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [ttl]
     */
    set ttl(ttl) {
        var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get timestamp() {
        const ret = wasm.deploystrparams_timestamp(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get ttl() {
        const ret = wasm.deploystrparams_ttl(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
}
if (Symbol.dispose) DeployStrParams.prototype[Symbol.dispose] = DeployStrParams.prototype.free;
exports.DeployStrParams = DeployStrParams;

class DictionaryAddr {
    static __wrap(ptr) {
        const obj = Object.create(DictionaryAddr.prototype);
        obj.__wbg_ptr = ptr;
        DictionaryAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DictionaryAddrFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryaddr_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryaddr_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        DictionaryAddrFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) DictionaryAddr.prototype[Symbol.dispose] = DictionaryAddr.prototype.free;
exports.DictionaryAddr = DictionaryAddr;

class DictionaryItemIdentifier {
    static __wrap(ptr) {
        const obj = Object.create(DictionaryItemIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        DictionaryItemIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DictionaryItemIdentifierFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryitemidentifier_free(ptr, 0);
    }
    /**
     * @param {string} account_hash
     * @param {string} dictionary_name
     * @param {string} dictionary_item_key
     * @returns {DictionaryItemIdentifier}
     */
    static newFromAccountInfo(account_hash, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(account_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromAccountInfo(ptr0, len0, ptr1, len1, ptr2, len2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DictionaryItemIdentifier.__wrap(ret[0]);
    }
    /**
     * @param {string} contract_addr
     * @param {string} dictionary_name
     * @param {string} dictionary_item_key
     * @returns {DictionaryItemIdentifier}
     */
    static newFromContractInfo(contract_addr, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(contract_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromContractInfo(ptr0, len0, ptr1, len1, ptr2, len2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DictionaryItemIdentifier.__wrap(ret[0]);
    }
    /**
     * @param {string} dictionary_key
     * @returns {DictionaryItemIdentifier}
     */
    static newFromDictionaryKey(dictionary_key) {
        const ptr0 = passStringToWasm0(dictionary_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromDictionaryKey(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DictionaryItemIdentifier.__wrap(ret[0]);
    }
    /**
     * @param {string} entity_addr
     * @param {string} dictionary_name
     * @param {string} dictionary_item_key
     * @returns {DictionaryItemIdentifier}
     */
    static newFromEntityInfo(entity_addr, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(entity_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromEntityInfo(ptr0, len0, ptr1, len1, ptr2, len2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DictionaryItemIdentifier.__wrap(ret[0]);
    }
    /**
     * @param {string} seed_uref
     * @param {string} dictionary_item_key
     * @returns {DictionaryItemIdentifier}
     */
    static newFromSeedUref(seed_uref, dictionary_item_key) {
        const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.dictionaryitemidentifier_newFromSeedUref(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return DictionaryItemIdentifier.__wrap(ret[0]);
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.dictionaryitemidentifier_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) DictionaryItemIdentifier.prototype[Symbol.dispose] = DictionaryItemIdentifier.prototype.free;
exports.DictionaryItemIdentifier = DictionaryItemIdentifier;

class DictionaryItemStrParams {
    static __wrap(ptr) {
        const obj = Object.create(DictionaryItemStrParams.prototype);
        obj.__wbg_ptr = ptr;
        DictionaryItemStrParamsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DictionaryItemStrParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dictionaryitemstrparams_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.dictionaryitemstrparams_new();
        this.__wbg_ptr = ret;
        DictionaryItemStrParamsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} key
     * @param {string} dictionary_name
     * @param {string} dictionary_item_key
     */
    setAccountNamedKey(key, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setAccountNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
     * @param {string} key
     * @param {string} dictionary_name
     * @param {string} dictionary_item_key
     */
    setContractNamedKey(key, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setContractNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
     * @param {string} value
     */
    setDictionary(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setDictionary(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} key
     * @param {string} dictionary_name
     * @param {string} dictionary_item_key
     */
    setEntityNamedKey(key, dictionary_name, dictionary_item_key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setEntityNamedKey(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
    }
    /**
     * @param {string} seed_uref
     * @param {string} dictionary_item_key
     */
    setUref(seed_uref, dictionary_item_key) {
        const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setUref(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.dictionaryitemstrparams_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) DictionaryItemStrParams.prototype[Symbol.dispose] = DictionaryItemStrParams.prototype.free;
exports.DictionaryItemStrParams = DictionaryItemStrParams;

class Digest {
    static __wrap(ptr) {
        const obj = Object.create(Digest.prototype);
        obj.__wbg_ptr = ptr;
        DigestFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DigestFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_digest_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {Digest}
     */
    static fromRaw(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.digest_fromRaw(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Digest.__wrap(ret[0]);
    }
    /**
     * @param {string} digest_hex_str
     * @returns {Digest}
     */
    static fromString(digest_hex_str) {
        const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.digest_fromString(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Digest.__wrap(ret[0]);
    }
    /**
     * @param {string} digest_hex_str
     */
    constructor(digest_hex_str) {
        const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.digest_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        DigestFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.digest_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.digest_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) Digest.prototype[Symbol.dispose] = Digest.prototype.free;
exports.Digest = Digest;

class EntityAddr {
    static __wrap(ptr) {
        const obj = Object.create(EntityAddr.prototype);
        obj.__wbg_ptr = ptr;
        EntityAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EntityAddrFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_entityaddr_free(ptr, 0);
    }
    /**
     * @param {string} formatted_str
     * @returns {EntityAddr}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.entityaddr_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EntityAddr.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.entityaddr_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    toHexString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.entityaddr_toHexString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.entityaddr_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) EntityAddr.prototype[Symbol.dispose] = EntityAddr.prototype.free;
exports.EntityAddr = EntityAddr;

class EntityIdentifier {
    static __wrap(ptr) {
        const obj = Object.create(EntityIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        EntityIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EntityIdentifierFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_entityidentifier_free(ptr, 0);
    }
    /**
     * @param {AccountHash} account_hash
     * @returns {EntityIdentifier}
     */
    static fromAccountHash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.entityidentifier_fromAccountHash(ptr0);
        return EntityIdentifier.__wrap(ret);
    }
    /**
     * @param {EntityAddr} entity_addr
     * @returns {EntityIdentifier}
     */
    static fromEntityAddr(entity_addr) {
        _assertClass(entity_addr, EntityAddr);
        var ptr0 = entity_addr.__destroy_into_raw();
        const ret = wasm.entityidentifier_fromEntityAddr(ptr0);
        return EntityIdentifier.__wrap(ret);
    }
    /**
     * @param {string} formatted_str
     * @returns {EntityIdentifier}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.entityidentifier_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EntityIdentifier.__wrap(ret[0]);
    }
    /**
     * @param {PublicKey} key
     * @returns {EntityIdentifier}
     */
    static fromPublicKey(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.entityidentifier_fromPublicKey(ptr0);
        return EntityIdentifier.__wrap(ret);
    }
    /**
     * @param {string} formatted_str
     */
    constructor(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.entityidentifier_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        EntityIdentifierFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.entityidentifier_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) EntityIdentifier.prototype[Symbol.dispose] = EntityIdentifier.prototype.free;
exports.EntityIdentifier = EntityIdentifier;

class EraId {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EraIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eraid_free(ptr, 0);
    }
    /**
     * @param {bigint} value
     */
    constructor(value) {
        const ret = wasm.eraid_new(value);
        this.__wbg_ptr = ret;
        EraIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {bigint}
     */
    value() {
        const ret = wasm.eraid_value(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
}
if (Symbol.dispose) EraId.prototype[Symbol.dispose] = EraId.prototype.free;
exports.EraId = EraId;

/**
 * Represents the result of parsing an event, containing error information and the event body.
 */
class EventParseResult {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EventParseResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eventparseresult_free(ptr, 0);
    }
    /**
     * @returns {Body | undefined}
     */
    get body() {
        const ret = wasm.__wbg_get_eventparseresult_body(this.__wbg_ptr);
        return ret === 0 ? undefined : Body.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get err() {
        const ret = wasm.__wbg_get_eventparseresult_err(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {Body | null} [arg0]
     */
    set body(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Body);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_eventparseresult_body(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set err(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_eventparseresult_err(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) EventParseResult.prototype[Symbol.dispose] = EventParseResult.prototype.free;
exports.EventParseResult = EventParseResult;

/**
 * Represents the result of an execution, either Success or Failure.
 */
class ExecutionResult {
    static __wrap(ptr) {
        const obj = Object.create(ExecutionResult.prototype);
        obj.__wbg_ptr = ptr;
        ExecutionResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ExecutionResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_executionresult_free(ptr, 0);
    }
    /**
     * Optional Failure information.
     * @returns {Failure | undefined}
     */
    get Failure() {
        const ret = wasm.__wbg_get_executionresult_Failure(this.__wbg_ptr);
        return ret === 0 ? undefined : Failure.__wrap(ret);
    }
    /**
     * Optional Success information.
     * @returns {Version2 | undefined}
     */
    get Success() {
        const ret = wasm.__wbg_get_executionresult_Success(this.__wbg_ptr);
        return ret === 0 ? undefined : Version2.__wrap(ret);
    }
    /**
     * Optional Failure information.
     * @param {Failure | null} [arg0]
     */
    set Failure(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Failure);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_executionresult_Failure(this.__wbg_ptr, ptr0);
    }
    /**
     * Optional Success information.
     * @param {Version2 | null} [arg0]
     */
    set Success(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Version2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_executionresult_Success(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) ExecutionResult.prototype[Symbol.dispose] = ExecutionResult.prototype.free;
exports.ExecutionResult = ExecutionResult;

/**
 * Represents a failure response containing an error message.
 */
class Failure {
    static __wrap(ptr) {
        const obj = Object.create(Failure.prototype);
        obj.__wbg_ptr = ptr;
        FailureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FailureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_failure_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get cost() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_failure_cost(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get error_message() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_failure_error_message(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set cost(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_failure_cost(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} arg0
     */
    set error_message(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_failure_error_message(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Failure.prototype[Symbol.dispose] = Failure.prototype.free;
exports.Failure = Failure;

class GetAccountResult {
    static __wrap(ptr) {
        const obj = Object.create(GetAccountResult.prototype);
        obj.__wbg_ptr = ptr;
        GetAccountResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetAccountResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getaccountresult_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get account() {
        const ret = wasm.getaccountresult_account(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getaccountresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getaccountresult_merkle_proof(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getaccountresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetAccountResult.prototype[Symbol.dispose] = GetAccountResult.prototype.free;
exports.GetAccountResult = GetAccountResult;

class GetAddressableEntityResult {
    static __wrap(ptr) {
        const obj = Object.create(GetAddressableEntityResult.prototype);
        obj.__wbg_ptr = ptr;
        GetAddressableEntityResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetAddressableEntityResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getaddressableentityresult_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getaddressableentityresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get entity_result() {
        const ret = wasm.getaddressableentityresult_entity_result(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getaddressableentityresult_merkle_proof(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getaddressableentityresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetAddressableEntityResult.prototype[Symbol.dispose] = GetAddressableEntityResult.prototype.free;
exports.GetAddressableEntityResult = GetAddressableEntityResult;

class GetAuctionInfoResult {
    static __wrap(ptr) {
        const obj = Object.create(GetAuctionInfoResult.prototype);
        obj.__wbg_ptr = ptr;
        GetAuctionInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetAuctionInfoResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getauctioninforesult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getauctioninforesult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the auction state as a JsValue.
     * @returns {any}
     */
    get auction_state() {
        const ret = wasm.getauctioninforesult_auction_state(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the GetAuctionInfoResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getauctioninforesult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetAuctionInfoResult.prototype[Symbol.dispose] = GetAuctionInfoResult.prototype.free;
exports.GetAuctionInfoResult = GetAuctionInfoResult;

class GetBalanceResult {
    static __wrap(ptr) {
        const obj = Object.create(GetBalanceResult.prototype);
        obj.__wbg_ptr = ptr;
        GetBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetBalanceResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getbalanceresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getbalanceresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the balance value as a JsValue.
     * @returns {any}
     */
    get balance_value() {
        const ret = wasm.getbalanceresult_balance_value(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the Merkle proof as a string.
     * @returns {string}
     */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getbalanceresult_merkle_proof(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Converts the GetBalanceResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getbalanceresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetBalanceResult.prototype[Symbol.dispose] = GetBalanceResult.prototype.free;
exports.GetBalanceResult = GetBalanceResult;

class GetBlockResult {
    static __wrap(ptr) {
        const obj = Object.create(GetBlockResult.prototype);
        obj.__wbg_ptr = ptr;
        GetBlockResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetBlockResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblockresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getblockresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the block information as a JsValue.
     * @returns {any}
     */
    get block() {
        const ret = wasm.getblockresult_block(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the GetBlockResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getblockresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetBlockResult.prototype[Symbol.dispose] = GetBlockResult.prototype.free;
exports.GetBlockResult = GetBlockResult;

class GetBlockTransfersResult {
    static __wrap(ptr) {
        const obj = Object.create(GetBlockTransfersResult.prototype);
        obj.__wbg_ptr = ptr;
        GetBlockTransfersResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetBlockTransfersResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblocktransfersresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getblocktransfersresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the block hash as an Option<BlockHash>.
     * @returns {BlockHash | undefined}
     */
    get block_hash() {
        const ret = wasm.getblocktransfersresult_block_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockHash.__wrap(ret);
    }
    /**
     * Converts the GetBlockTransfersResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getblocktransfersresult_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the transfers as a JsValue.
     * @returns {any}
     */
    get transfers() {
        const ret = wasm.getblocktransfersresult_transfers(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetBlockTransfersResult.prototype[Symbol.dispose] = GetBlockTransfersResult.prototype.free;
exports.GetBlockTransfersResult = GetBlockTransfersResult;

/**
 * A struct representing the result of the `get_chainspec` function.
 */
class GetChainspecResult {
    static __wrap(ptr) {
        const obj = Object.create(GetChainspecResult.prototype);
        obj.__wbg_ptr = ptr;
        GetChainspecResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetChainspecResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getchainspecresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getchainspecresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the chainspec bytes as a JsValue.
     * @returns {any}
     */
    get chainspec_bytes() {
        const ret = wasm.getchainspecresult_chainspec_bytes(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the `GetChainspecResult` to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getchainspecresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetChainspecResult.prototype[Symbol.dispose] = GetChainspecResult.prototype.free;
exports.GetChainspecResult = GetChainspecResult;

class GetDeployResult {
    static __wrap(ptr) {
        const obj = Object.create(GetDeployResult.prototype);
        obj.__wbg_ptr = ptr;
        GetDeployResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetDeployResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdeployresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JavaScript value.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getdeployresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the deploy information.
     * @returns {Deploy}
     */
    get deploy() {
        const ret = wasm.getdeployresult_deploy(this.__wbg_ptr);
        return Deploy.__wrap(ret);
    }
    /**
     * Gets the execution info as a JavaScript value.
     * @returns {any}
     */
    get execution_info() {
        const ret = wasm.getdeployresult_execution_info(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the result to a JSON JavaScript value.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getdeployresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetDeployResult.prototype[Symbol.dispose] = GetDeployResult.prototype.free;
exports.GetDeployResult = GetDeployResult;

class GetDictionaryItemResult {
    static __wrap(ptr) {
        const obj = Object.create(GetDictionaryItemResult.prototype);
        obj.__wbg_ptr = ptr;
        GetDictionaryItemResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetDictionaryItemResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdictionaryitemresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getdictionaryitemresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the dictionary key as a String.
     * @returns {string}
     */
    get dictionary_key() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getdictionaryitemresult_dictionary_key(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Gets the merkle proof as a String.
     * @returns {string}
     */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getdictionaryitemresult_merkle_proof(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Gets the stored value as a JsValue.
     * @returns {any}
     */
    get stored_value() {
        const ret = wasm.getdictionaryitemresult_stored_value(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the GetDictionaryItemResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getdictionaryitemresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetDictionaryItemResult.prototype[Symbol.dispose] = GetDictionaryItemResult.prototype.free;
exports.GetDictionaryItemResult = GetDictionaryItemResult;

class GetEraInfoResult {
    static __wrap(ptr) {
        const obj = Object.create(GetEraInfoResult.prototype);
        obj.__wbg_ptr = ptr;
        GetEraInfoResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetEraInfoResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterainforesult_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.geterainforesult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get era_summary() {
        const ret = wasm.geterainforesult_era_summary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.geterainforesult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetEraInfoResult.prototype[Symbol.dispose] = GetEraInfoResult.prototype.free;
exports.GetEraInfoResult = GetEraInfoResult;

/**
 * Wrapper struct for the `GetEraSummaryResult` from casper_client.
 */
class GetEraSummaryResult {
    static __wrap(ptr) {
        const obj = Object.create(GetEraSummaryResult.prototype);
        obj.__wbg_ptr = ptr;
        GetEraSummaryResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetEraSummaryResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterasummaryresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.geterasummaryresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the era summary as a JsValue.
     * @returns {any}
     */
    get era_summary() {
        const ret = wasm.geterasummaryresult_era_summary(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the GetEraSummaryResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.geterasummaryresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetEraSummaryResult.prototype[Symbol.dispose] = GetEraSummaryResult.prototype.free;
exports.GetEraSummaryResult = GetEraSummaryResult;

/**
 * Wrapper struct for the `GetNodeStatusResult` from casper_client.
 */
class GetNodeStatusResult {
    static __wrap(ptr) {
        const obj = Object.create(GetNodeStatusResult.prototype);
        obj.__wbg_ptr = ptr;
        GetNodeStatusResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetNodeStatusResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getnodestatusresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getnodestatusresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the available block range as a JsValue.
     * @returns {any}
     */
    get available_block_range() {
        const ret = wasm.getnodestatusresult_available_block_range(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the block sync information as a JsValue.
     * @returns {any}
     */
    get block_sync() {
        const ret = wasm.getnodestatusresult_block_sync(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the build version as a String.
     * @returns {string}
     */
    get build_version() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getnodestatusresult_build_version(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Gets the chainspec name as a String.
     * @returns {string}
     */
    get chainspec_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getnodestatusresult_chainspec_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Gets information about the last added block as a JsValue.
     * @returns {any}
     */
    get last_added_block_info() {
        const ret = wasm.getnodestatusresult_last_added_block_info(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the last progress information as a JsValue.
     * @returns {any}
     */
    get last_progress() {
        const ret = wasm.getnodestatusresult_last_progress(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets information about the next upgrade as a JsValue.
     * @returns {any}
     */
    get next_upgrade() {
        const ret = wasm.getnodestatusresult_next_upgrade(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the public signing key as an Option<PublicKey>.
     * @returns {PublicKey | undefined}
     */
    get our_public_signing_key() {
        const ret = wasm.getnodestatusresult_our_public_signing_key(this.__wbg_ptr);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
    /**
     * Gets the list of peers as a JsValue.
     * @returns {any}
     */
    get peers() {
        const ret = wasm.getnodestatusresult_peers(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the reactor state information as a JsValue.
     * @returns {any}
     */
    get reactor_state() {
        const ret = wasm.getnodestatusresult_reactor_state(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the round length as a JsValue.
     * @returns {any}
     */
    get round_length() {
        const ret = wasm.getnodestatusresult_round_length(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the starting state root hash as a Digest.
     * @returns {Digest}
     */
    get starting_state_root_hash() {
        const ret = wasm.getnodestatusresult_starting_state_root_hash(this.__wbg_ptr);
        return Digest.__wrap(ret);
    }
    /**
     * Converts the GetNodeStatusResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getnodestatusresult_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the uptime information as a JsValue.
     * @returns {any}
     */
    get uptime() {
        const ret = wasm.getnodestatusresult_uptime(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetNodeStatusResult.prototype[Symbol.dispose] = GetNodeStatusResult.prototype.free;
exports.GetNodeStatusResult = GetNodeStatusResult;

/**
 * A wrapper for the `GetPeersResult` type from the Casper client.
 */
class GetPeersResult {
    static __wrap(ptr) {
        const obj = Object.create(GetPeersResult.prototype);
        obj.__wbg_ptr = ptr;
        GetPeersResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetPeersResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getpeersresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JSON value.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getpeersresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the peers as a JSON value.
     * @returns {any}
     */
    get peers() {
        const ret = wasm.getpeersresult_peers(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the result to JSON format as a JavaScript value.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getpeersresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetPeersResult.prototype[Symbol.dispose] = GetPeersResult.prototype.free;
exports.GetPeersResult = GetPeersResult;

/**
 * Wrapper struct for the `GetStateRootHashResult` from casper_client.
 */
class GetStateRootHashResult {
    static __wrap(ptr) {
        const obj = Object.create(GetStateRootHashResult.prototype);
        obj.__wbg_ptr = ptr;
        GetStateRootHashResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetStateRootHashResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getstateroothashresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getstateroothashresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the state root hash as an Option<Digest>.
     * @returns {Digest | undefined}
     */
    get state_root_hash() {
        const ret = wasm.getstateroothashresult_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
     * Gets the state root hash as a String.
     * @returns {string}
     */
    get state_root_hash_as_string() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getstateroothashresult_state_root_hash_as_string(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Converts the GetStateRootHashResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getstateroothashresult_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * Alias for state_root_hash_as_string
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.getstateroothashresult_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) GetStateRootHashResult.prototype[Symbol.dispose] = GetStateRootHashResult.prototype.free;
exports.GetStateRootHashResult = GetStateRootHashResult;

class GetTransactionResult {
    static __wrap(ptr) {
        const obj = Object.create(GetTransactionResult.prototype);
        obj.__wbg_ptr = ptr;
        GetTransactionResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetTransactionResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gettransactionresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JavaScript value.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.gettransactionresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the execution info as a JavaScript value.
     * @returns {any}
     */
    get execution_info() {
        const ret = wasm.gettransactionresult_execution_info(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the result to a JSON JavaScript value.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.gettransactionresult_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the transaction information.
     * @returns {Transaction}
     */
    get transaction() {
        const ret = wasm.gettransactionresult_transaction(this.__wbg_ptr);
        return Transaction.__wrap(ret);
    }
}
if (Symbol.dispose) GetTransactionResult.prototype[Symbol.dispose] = GetTransactionResult.prototype.free;
exports.GetTransactionResult = GetTransactionResult;

/**
 * Wrapper struct for the `GetValidatorChangesResult` from casper_client.
 */
class GetValidatorChangesResult {
    static __wrap(ptr) {
        const obj = Object.create(GetValidatorChangesResult.prototype);
        obj.__wbg_ptr = ptr;
        GetValidatorChangesResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GetValidatorChangesResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getvalidatorchangesresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.getvalidatorchangesresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the validator changes as a JsValue.
     * @returns {any}
     */
    get changes() {
        const ret = wasm.getvalidatorchangesresult_changes(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the GetValidatorChangesResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.getvalidatorchangesresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GetValidatorChangesResult.prototype[Symbol.dispose] = GetValidatorChangesResult.prototype.free;
exports.GetValidatorChangesResult = GetValidatorChangesResult;

class GlobalStateIdentifier {
    static __wrap(ptr) {
        const obj = Object.create(GlobalStateIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        GlobalStateIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GlobalStateIdentifierFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_globalstateidentifier_free(ptr, 0);
    }
    /**
     * @param {BlockHash} block_hash
     * @returns {GlobalStateIdentifier}
     */
    static fromBlockHash(block_hash) {
        _assertClass(block_hash, BlockHash);
        var ptr0 = block_hash.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_fromBlockHash(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
     * @param {bigint} block_height
     * @returns {GlobalStateIdentifier}
     */
    static fromBlockHeight(block_height) {
        const ret = wasm.globalstateidentifier_fromBlockHeight(block_height);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
     * @param {Digest} state_root_hash
     * @returns {GlobalStateIdentifier}
     */
    static fromStateRootHash(state_root_hash) {
        _assertClass(state_root_hash, Digest);
        var ptr0 = state_root_hash.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_fromStateRootHash(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
     * @param {GlobalStateIdentifier} global_state_identifier
     */
    constructor(global_state_identifier) {
        _assertClass(global_state_identifier, GlobalStateIdentifier);
        var ptr0 = global_state_identifier.__destroy_into_raw();
        const ret = wasm.globalstateidentifier_new(ptr0);
        this.__wbg_ptr = ret;
        GlobalStateIdentifierFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.globalstateidentifier_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) GlobalStateIdentifier.prototype[Symbol.dispose] = GlobalStateIdentifier.prototype.free;
exports.GlobalStateIdentifier = GlobalStateIdentifier;

class HashAddr {
    static __wrap(ptr) {
        const obj = Object.create(HashAddr.prototype);
        obj.__wbg_ptr = ptr;
        HashAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashAddrFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashaddr_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashaddr_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        HashAddrFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Uint8Array}
     */
    toBytes() {
        const ret = wasm.hashaddr_toBytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {string}
     */
    toHexString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashaddr_toHexString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) HashAddr.prototype[Symbol.dispose] = HashAddr.prototype.free;
exports.HashAddr = HashAddr;

class HashString {
    static __wrap(ptr) {
        const obj = Object.create(HashString.prototype);
        obj.__wbg_ptr = ptr;
        HashStringFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashStringFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashstring_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_hashstring_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get Deploy() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashstring_Deploy(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get Version1() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashstring_Version1(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.hashstring_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_hashstring_hash(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) HashString.prototype[Symbol.dispose] = HashString.prototype.free;
exports.HashString = HashString;

class IntoUnderlyingByteSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
}
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;
exports.IntoUnderlyingByteSource = IntoUnderlyingByteSource;

class IntoUnderlyingSink {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;
exports.IntoUnderlyingSink = IntoUnderlyingSink;

class IntoUnderlyingSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;
exports.IntoUnderlyingSource = IntoUnderlyingSource;

class Key {
    static __wrap(ptr) {
        const obj = Object.create(Key.prototype);
        obj.__wbg_ptr = ptr;
        KeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_key_free(ptr, 0);
    }
    /**
     * @returns {URefAddr | undefined}
     */
    asBalance() {
        const ret = wasm.key_asBalance(this.__wbg_ptr);
        return ret === 0 ? undefined : URefAddr.__wrap(ret);
    }
    /**
     * @returns {DictionaryAddr | undefined}
     */
    asDictionaryAddr() {
        const ret = wasm.key_asDictionaryAddr(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryAddr.__wrap(ret);
    }
    /**
     * @param {AccountHash} key
     * @returns {Key}
     */
    static fromAccount(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromAccount(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @param {URefAddr} key
     * @returns {Key}
     */
    static fromBalance(key) {
        _assertClass(key, URefAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromBalance(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @param {AccountHash} key
     * @returns {Key}
     */
    static fromBid(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromBid(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static fromChainspecRegistry() {
        const ret = wasm.key_fromChainspecRegistry();
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static fromChecksumRegistry() {
        const ret = wasm.key_fromChecksumRegistry();
        return Key.__wrap(ret);
    }
    /**
     * @param {DeployHash} key
     * @returns {Key}
     */
    static fromDeployInfo(key) {
        _assertClass(key, DeployHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromDeployInfo(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @param {DictionaryAddr} key
     * @returns {Key}
     */
    static fromDictionaryAddr(key) {
        _assertClass(key, DictionaryAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromDictionaryAddr(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @param {URef} seed_uref
     * @param {Uint8Array} dictionary_item_key
     * @returns {Key}
     */
    static fromDictionaryKey(seed_uref, dictionary_item_key) {
        _assertClass(seed_uref, URef);
        var ptr0 = seed_uref.__destroy_into_raw();
        const ptr1 = passArray8ToWasm0(dictionary_item_key, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.key_fromDictionaryKey(ptr0, ptr1, len1);
        return Key.__wrap(ret);
    }
    /**
     * @param {EraId} key
     * @returns {Key}
     */
    static fromEraInfo(key) {
        _assertClass(key, EraId);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromEraInfo(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static fromEraSummary() {
        const ret = wasm.key_fromEraSummary();
        return Key.__wrap(ret);
    }
    /**
     * @param {string} formatted_str
     * @returns {Key}
     */
    static fromFormattedString(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.key_fromFormattedString(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Key.__wrap(ret[0]);
    }
    /**
     * @param {HashAddr} key
     * @returns {Key}
     */
    static fromHash(key) {
        _assertClass(key, HashAddr);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromHash(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static fromSystemEntityRegistry() {
        const ret = wasm.key_fromSystemEntityRegistry();
        return Key.__wrap(ret);
    }
    /**
     * @param {Uint8Array} key
     * @returns {TransferAddr}
     */
    static fromTransfer(key) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.key_fromTransfer(ptr0, len0);
        return TransferAddr.__wrap(ret);
    }
    /**
     * @param {URef} key
     * @returns {Key}
     */
    static fromURef(key) {
        _assertClass(key, URef);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromURef(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @param {AccountHash} key
     * @returns {Key}
     */
    static fromUnbond(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromUnbond(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @param {AccountHash} key
     * @returns {Key}
     */
    static fromWithdraw(key) {
        _assertClass(key, AccountHash);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_fromWithdraw(ptr0);
        return Key.__wrap(ret);
    }
    /**
     * @returns {AccountHash | undefined}
     */
    intoAccount() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.key_intoAccount(ptr);
        return ret === 0 ? undefined : AccountHash.__wrap(ret);
    }
    /**
     * @returns {HashAddr | undefined}
     */
    intoHash() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.key_intoHash(ptr);
        return ret === 0 ? undefined : HashAddr.__wrap(ret);
    }
    /**
     * @returns {URef | undefined}
     */
    intoURef() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.key_intoURef(ptr);
        return ret === 0 ? undefined : URef.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    isDictionaryKey() {
        const ret = wasm.key_isDictionaryKey(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {Key} key
     */
    constructor(key) {
        _assertClass(key, Key);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.key_new(ptr0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        KeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.key_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.key_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Key | undefined}
     */
    urefToHash() {
        const ret = wasm.key_urefToHash(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
    /**
     * @returns {Key | undefined}
     */
    withdrawToUnbond() {
        const ret = wasm.key_withdrawToUnbond(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
}
if (Symbol.dispose) Key.prototype[Symbol.dispose] = Key.prototype.free;
exports.Key = Key;

/**
 * Wrapper struct for the `ListRpcsResult` from casper_client.
 */
class ListRpcsResult {
    static __wrap(ptr) {
        const obj = Object.create(ListRpcsResult.prototype);
        obj.__wbg_ptr = ptr;
        ListRpcsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ListRpcsResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_listrpcsresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.listrpcsresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the name of the RPC.
     * @returns {string}
     */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.listrpcsresult_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Gets the schema of the RPC as a JsValue.
     * @returns {any}
     */
    get schema() {
        const ret = wasm.listrpcsresult_schema(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the ListRpcsResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.listrpcsresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) ListRpcsResult.prototype[Symbol.dispose] = ListRpcsResult.prototype.free;
exports.ListRpcsResult = ListRpcsResult;

class Message {
    static __wrap(ptr) {
        const obj = Object.create(Message.prototype);
        obj.__wbg_ptr = ptr;
        MessageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MessageFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_message_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get String() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_message_String(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set String(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_message_String(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Message.prototype[Symbol.dispose] = Message.prototype.free;
exports.Message = Message;

class Messages {
    static __wrap(ptr) {
        const obj = Object.create(Messages.prototype);
        obj.__wbg_ptr = ptr;
        MessagesFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof Messages)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MessagesFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_messages_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get block_index() {
        const ret = wasm.__wbg_get_messages_block_index(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {string}
     */
    get entity_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_messages_entity_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Message}
     */
    get message() {
        const ret = wasm.__wbg_get_messages_message(this.__wbg_ptr);
        return Message.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get topic_index() {
        const ret = wasm.__wbg_get_messages_topic_index(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    get topic_name_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_messages_topic_name_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get topic_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_messages_topic_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {bigint} arg0
     */
    set block_index(arg0) {
        wasm.__wbg_set_messages_block_index(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set entity_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_messages_entity_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Message} arg0
     */
    set message(arg0) {
        _assertClass(arg0, Message);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_messages_message(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set topic_index(arg0) {
        wasm.__wbg_set_messages_topic_index(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} arg0
     */
    set topic_name_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_messages_topic_name_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} arg0
     */
    set topic_name(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_messages_topic_name(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Messages.prototype[Symbol.dispose] = Messages.prototype.free;
exports.Messages = Messages;

class PackageHash {
    static __wrap(ptr) {
        const obj = Object.create(PackageHash.prototype);
        obj.__wbg_ptr = ptr;
        PackageHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PackageHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_packagehash_free(ptr, 0);
    }
    /**
     * @param {string} formatted_str
     * @returns {PackageHash}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.packagehash_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PackageHash.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {PackageHash}
     */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.packagehash_fromUint8Array(ptr0, len0);
        return PackageHash.__wrap(ret);
    }
    /**
     * @param {string} package_hash_hex_str
     */
    constructor(package_hash_hex_str) {
        const ptr0 = passStringToWasm0(package_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.packagehash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        PackageHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.packagehash_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) PackageHash.prototype[Symbol.dispose] = PackageHash.prototype.free;
exports.PackageHash = PackageHash;

class Path {
    static __wrap(ptr) {
        const obj = Object.create(Path.prototype);
        obj.__wbg_ptr = ptr;
        PathFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PathFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_path_free(ptr, 0);
    }
    /**
     * @param {any} path
     * @returns {Path}
     */
    static fromArray(path) {
        const ret = wasm.path_fromArray(path);
        return Path.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    is_empty() {
        const ret = wasm.path_is_empty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {any} path
     */
    constructor(path) {
        const ret = wasm.path_new(path);
        this.__wbg_ptr = ret;
        PathFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.path_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.path_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) Path.prototype[Symbol.dispose] = Path.prototype.free;
exports.Path = Path;

class Payment {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PaymentFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_payment_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get source() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_payment_source(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set source(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_payment_source(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Payment.prototype[Symbol.dispose] = Payment.prototype.free;
exports.Payment = Payment;

class PaymentStrParams {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PaymentStrParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_paymentstrparams_free(ptr, 0);
    }
    /**
     * @param {string | null} [payment_amount]
     * @param {string | null} [payment_hash]
     * @param {string | null} [payment_name]
     * @param {string | null} [payment_package_hash]
     * @param {string | null} [payment_package_name]
     * @param {string | null} [payment_path]
     * @param {Array<any> | null} [payment_args_simple]
     * @param {string | null} [payment_args_json]
     * @param {string | null} [payment_version]
     * @param {string | null} [payment_entry_point]
     */
    constructor(payment_amount, payment_hash, payment_name, payment_package_hash, payment_package_name, payment_path, payment_args_simple, payment_args_json, payment_version, payment_entry_point) {
        var ptr0 = isLikeNone(payment_amount) ? 0 : passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(payment_hash) ? 0 : passStringToWasm0(payment_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(payment_name) ? 0 : passStringToWasm0(payment_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(payment_package_hash) ? 0 : passStringToWasm0(payment_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(payment_package_name) ? 0 : passStringToWasm0(payment_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(payment_path) ? 0 : passStringToWasm0(payment_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(payment_args_json) ? 0 : passStringToWasm0(payment_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(payment_version) ? 0 : passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(payment_entry_point) ? 0 : passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        const ret = wasm.paymentstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, isLikeNone(payment_args_simple) ? 0 : addToExternrefTable0(payment_args_simple), ptr6, len6, ptr7, len7, ptr8, len8);
        this.__wbg_ptr = ret;
        PaymentStrParamsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_amount() {
        const ret = wasm.paymentstrparams_payment_amount(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_args_json() {
        const ret = wasm.paymentstrparams_payment_args_json(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Array<any> | undefined}
     */
    get payment_args_simple() {
        const ret = wasm.paymentstrparams_payment_args_simple(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_entry_point() {
        const ret = wasm.paymentstrparams_payment_entry_point(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_hash() {
        const ret = wasm.paymentstrparams_payment_hash(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_name() {
        const ret = wasm.paymentstrparams_payment_name(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_package_hash() {
        const ret = wasm.paymentstrparams_payment_package_hash(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_package_name() {
        const ret = wasm.paymentstrparams_payment_package_name(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_path() {
        const ret = wasm.paymentstrparams_payment_path(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get payment_version() {
        const ret = wasm.paymentstrparams_payment_version(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string} payment_amount
     */
    set payment_amount(payment_amount) {
        const ptr0 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_amount(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} payment_args_json
     */
    set payment_args_json(payment_args_json) {
        const ptr0 = passStringToWasm0(payment_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Array<any>} payment_args_simple
     */
    set payment_args_simple(payment_args_simple) {
        wasm.paymentstrparams_set_payment_args_simple(this.__wbg_ptr, payment_args_simple);
    }
    /**
     * @param {string} payment_entry_point
     */
    set payment_entry_point(payment_entry_point) {
        const ptr0 = passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_entry_point(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} payment_hash
     */
    set payment_hash(payment_hash) {
        const ptr0 = passStringToWasm0(payment_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} payment_name
     */
    set payment_name(payment_name) {
        const ptr0 = passStringToWasm0(payment_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} payment_package_hash
     */
    set payment_package_hash(payment_package_hash) {
        const ptr0 = passStringToWasm0(payment_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_package_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} payment_package_name
     */
    set payment_package_name(payment_package_name) {
        const ptr0 = passStringToWasm0(payment_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_package_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} payment_path
     */
    set payment_path(payment_path) {
        const ptr0 = passStringToWasm0(payment_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} payment_version
     */
    set payment_version(payment_version) {
        const ptr0 = passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_version(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) PaymentStrParams.prototype[Symbol.dispose] = PaymentStrParams.prototype.free;
exports.PaymentStrParams = PaymentStrParams;

class PeerEntry {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PeerEntryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_peerentry_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get address() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.peerentry_address(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get node_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.peerentry_node_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) PeerEntry.prototype[Symbol.dispose] = PeerEntry.prototype.free;
exports.PeerEntry = PeerEntry;

/**
 * @enum {0 | 1 | 2}
 */
const PricingMode = Object.freeze({
    Fixed: 0, "0": "Fixed",
    Classic: 1, "1": "Classic",
    Reserved: 2, "2": "Reserved",
});
exports.PricingMode = PricingMode;

class PublicKey {
    static __wrap(ptr) {
        const obj = Object.create(PublicKey.prototype);
        obj.__wbg_ptr = ptr;
        PublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {PublicKey}
     */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_fromUint8Array(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * @param {string} public_key_hex_str
     */
    constructor(public_key_hex_str) {
        const ptr0 = passStringToWasm0(public_key_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        PublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {AccountHash}
     */
    toAccountHash() {
        const ret = wasm.publickey_toAccountHash(this.__wbg_ptr);
        return AccountHash.__wrap(ret);
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.publickey_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {URef}
     */
    toPurseUref() {
        const ret = wasm.publickey_toPurseUref(this.__wbg_ptr);
        return URef.__wrap(ret);
    }
}
if (Symbol.dispose) PublicKey.prototype[Symbol.dispose] = PublicKey.prototype.free;
exports.PublicKey = PublicKey;

class PublicKeyString {
    static __wrap(ptr) {
        const obj = Object.create(PublicKeyString.prototype);
        obj.__wbg_ptr = ptr;
        PublicKeyStringFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PublicKeyStringFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickeystring_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get PublicKey() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_publickeystring_PublicKey(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set PublicKey(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_publickeystring_PublicKey(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) PublicKeyString.prototype[Symbol.dispose] = PublicKeyString.prototype.free;
exports.PublicKeyString = PublicKeyString;

class PurseIdentifier {
    static __wrap(ptr) {
        const obj = Object.create(PurseIdentifier.prototype);
        obj.__wbg_ptr = ptr;
        PurseIdentifierFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PurseIdentifierFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_purseidentifier_free(ptr, 0);
    }
    /**
     * @param {AccountHash} account_hash
     * @returns {PurseIdentifier}
     */
    static fromAccountHash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.purseidentifier_fromAccountHash(ptr0);
        return PurseIdentifier.__wrap(ret);
    }
    /**
     * @param {PublicKey} key
     */
    constructor(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.purseidentifier_fromPublicKey(ptr0);
        this.__wbg_ptr = ret;
        PurseIdentifierFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {URef} uref
     * @returns {PurseIdentifier}
     */
    static fromURef(uref) {
        _assertClass(uref, URef);
        var ptr0 = uref.__destroy_into_raw();
        const ret = wasm.purseidentifier_fromURef(ptr0);
        return PurseIdentifier.__wrap(ret);
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.purseidentifier_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) PurseIdentifier.prototype[Symbol.dispose] = PurseIdentifier.prototype.free;
exports.PurseIdentifier = PurseIdentifier;

class PutDeployResult {
    static __wrap(ptr) {
        const obj = Object.create(PutDeployResult.prototype);
        obj.__wbg_ptr = ptr;
        PutDeployResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PutDeployResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_putdeployresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JavaScript value.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.putdeployresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the deploy hash associated with this result.
     * @returns {DeployHash}
     */
    get deploy_hash() {
        const ret = wasm.putdeployresult_deploy_hash(this.__wbg_ptr);
        return DeployHash.__wrap(ret);
    }
    /**
     * Converts PutDeployResult to a JavaScript object.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.putdeployresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) PutDeployResult.prototype[Symbol.dispose] = PutDeployResult.prototype.free;
exports.PutDeployResult = PutDeployResult;

class PutTransactionResult {
    static __wrap(ptr) {
        const obj = Object.create(PutTransactionResult.prototype);
        obj.__wbg_ptr = ptr;
        PutTransactionResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PutTransactionResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_puttransactionresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JavaScript value.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.puttransactionresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts PutTransactionResult to a JavaScript object.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.puttransactionresult_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the transaction hash associated with this result.
     * @returns {TransactionHash}
     */
    get transaction_hash() {
        const ret = wasm.puttransactionresult_transaction_hash(this.__wbg_ptr);
        return TransactionHash.__wrap(ret);
    }
}
if (Symbol.dispose) PutTransactionResult.prototype[Symbol.dispose] = PutTransactionResult.prototype.free;
exports.PutTransactionResult = PutTransactionResult;

class QueryBalanceDetailsResult {
    static __wrap(ptr) {
        const obj = Object.create(QueryBalanceDetailsResult.prototype);
        obj.__wbg_ptr = ptr;
        QueryBalanceDetailsResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueryBalanceDetailsResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalancedetailsresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.querybalancedetailsresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get available_balance() {
        const ret = wasm.querybalancedetailsresult_available_balance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get holds() {
        const ret = wasm.querybalancedetailsresult_holds(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the QueryBalanceDetailsResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.querybalancedetailsresult_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get total_balance() {
        const ret = wasm.querybalancedetailsresult_total_balance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get total_balance_proof() {
        const ret = wasm.querybalancedetailsresult_total_balance_proof(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) QueryBalanceDetailsResult.prototype[Symbol.dispose] = QueryBalanceDetailsResult.prototype.free;
exports.QueryBalanceDetailsResult = QueryBalanceDetailsResult;

class QueryBalanceResult {
    static __wrap(ptr) {
        const obj = Object.create(QueryBalanceResult.prototype);
        obj.__wbg_ptr = ptr;
        QueryBalanceResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueryBalanceResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalanceresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.querybalanceresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the balance as a JsValue.
     * @returns {any}
     */
    get balance() {
        const ret = wasm.querybalanceresult_balance(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the QueryBalanceResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.querybalanceresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) QueryBalanceResult.prototype[Symbol.dispose] = QueryBalanceResult.prototype.free;
exports.QueryBalanceResult = QueryBalanceResult;

class QueryGlobalStateResult {
    static __wrap(ptr) {
        const obj = Object.create(QueryGlobalStateResult.prototype);
        obj.__wbg_ptr = ptr;
        QueryGlobalStateResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        QueryGlobalStateResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_queryglobalstateresult_free(ptr, 0);
    }
    /**
     * Gets the API version as a JsValue.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.queryglobalstateresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the block header as a JsValue.
     * @returns {any}
     */
    get block_header() {
        const ret = wasm.queryglobalstateresult_block_header(this.__wbg_ptr);
        return ret;
    }
    /**
     * Gets the Merkle proof as a string.
     * @returns {string}
     */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.queryglobalstateresult_merkle_proof(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Gets the stored value as a JsValue.
     * @returns {any}
     */
    get stored_value() {
        const ret = wasm.queryglobalstateresult_stored_value(this.__wbg_ptr);
        return ret;
    }
    /**
     * Converts the QueryGlobalStateResult to a JsValue.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.queryglobalstateresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) QueryGlobalStateResult.prototype[Symbol.dispose] = QueryGlobalStateResult.prototype.free;
exports.QueryGlobalStateResult = QueryGlobalStateResult;

class RecordId {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RecordIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_recordid_free(ptr, 0);
    }
    /**
     * @param {number} value
     */
    constructor(value) {
        const ret = wasm.recordid_new_js_alias(value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        RecordIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) RecordId.prototype[Symbol.dispose] = RecordId.prototype.free;
exports.RecordId = RecordId;

class SDK {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SDKFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sdk_free(ptr, 0);
    }
    /**
     * JavaScript Alias for `put_deploy`.
     * @param {Deploy} deploy
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutDeployResult>}
     */
    account_put_deploy(deploy, verbosity, rpc_address) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_account_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return ret;
    }
    /**
     * JavaScript Alias for `put_transaction`.
     * @param {Transaction} transaction
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutTransactionResult>}
     */
    account_put_transaction(transaction, verbosity, rpc_address) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_account_put_transaction(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return ret;
    }
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
     * @param {TransactionBuilderParams} builder_params
     * @param {TransactionStrParams} transaction_params
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutTransactionResult>}
     */
    call_entrypoint(builder_params, transaction_params, rpc_address) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_call_entrypoint(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
        return ret;
    }
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
     * @param {DeployStrParams} deploy_params
     * @param {SessionStrParams} session_params
     * @param {string} payment_amount
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutDeployResult>}
     */
    call_entrypoint_deploy(deploy_params, session_params, payment_amount, rpc_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_call_entrypoint_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return ret;
    }
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
     * @param {getBlockOptions | null} [options]
     * @returns {Promise<GetBlockResult>}
     */
    chain_get_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_block(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {getBlockTransfersOptions | null} [options]
     * @returns {Promise<GetBlockTransfersResult>}
     */
    chain_get_block_transfers(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockTransfersOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_block_transfers(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {getEraInfoOptions | null} [options]
     * @returns {Promise<GetEraInfoResult>}
     */
    chain_get_era_info_by_switch_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_era_info_by_switch_block(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {getEraSummaryOptions | null} [options]
     * @returns {Promise<GetEraSummaryResult>}
     */
    chain_get_era_summary(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraSummaryOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_era_summary(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {getStateRootHashOptions | null} [options]
     * @returns {Promise<GetStateRootHashResult>}
     */
    chain_get_state_root_hash(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getStateRootHashOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_state_root_hash(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {DeployStrParams} deploy_params
     * @param {SessionStrParams} session_params
     * @param {PaymentStrParams} payment_params
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutDeployResult>}
     */
    deploy(deploy_params, session_params, payment_params, verbosity, rpc_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, isLikeNone(verbosity) ? 3 : verbosity, ptr3, len3);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {string}
     */
    getNodeAddress(node_address) {
        let deferred2_0;
        let deferred2_1;
        try {
            var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            const ret = wasm.sdk_getNodeAddress(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {string | null} [rpc_address]
     * @returns {string}
     */
    getRPCAddress(rpc_address) {
        let deferred2_0;
        let deferred2_1;
        try {
            var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            const ret = wasm.sdk_getRPCAddress(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {Verbosity | null} [verbosity]
     * @returns {Verbosity}
     */
    getVerbosity(verbosity) {
        const ret = wasm.sdk_getVerbosity(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
        return ret;
    }
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
     * @param {getAccountOptions | null} [options]
     * @returns {Promise<GetAccountResult>}
     */
    get_account(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAccountOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_account(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {any} options
     * @returns {getAccountOptions}
     */
    get_account_options(options) {
        const ret = wasm.sdk_get_account_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getAccountOptions.__wrap(ret[0]);
    }
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
     * @param {getAuctionInfoOptions | null} [options]
     * @returns {Promise<GetAuctionInfoResult>}
     */
    get_auction_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAuctionInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_auction_info(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {any} options
     * @returns {getAuctionInfoOptions}
     */
    get_auction_info_options(options) {
        const ret = wasm.sdk_get_auction_info_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getAuctionInfoOptions.__wrap(ret[0]);
    }
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
     * @param {getBalanceOptions | null} [options]
     * @returns {Promise<GetBalanceResult>}
     */
    get_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_balance(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    get_balance_options(options) {
        const ret = wasm.sdk_get_balance_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getBalanceOptions.__wrap(ret[0]);
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_available_block_range(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_available_block_range(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {BlockHash} block_hash
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_block_header_by_hash(block_hash, node_address) {
        _assertClass(block_hash, BlockHash);
        var ptr0 = block_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_block_header_by_hash(this.__wbg_ptr, ptr0, ptr1, len1);
        return ret;
    }
    /**
     * @param {bigint} height
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_block_header_by_height(height, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_block_header_by_height(this.__wbg_ptr, height, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_block_synchronizer_status(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_block_synchronizer_status(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {BlockHash} block_hash
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_block_with_signatures_by_hash(block_hash, node_address) {
        _assertClass(block_hash, BlockHash);
        var ptr0 = block_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_block_with_signatures_by_hash(this.__wbg_ptr, ptr0, ptr1, len1);
        return ret;
    }
    /**
     * @param {bigint} height
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_block_with_signatures_by_height(height, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_block_with_signatures_by_height(this.__wbg_ptr, height, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_chainspec_raw_bytes(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_chainspec_raw_bytes(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_consensus_status(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_consensus_status(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_consensus_validator_changes(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_consensus_validator_changes(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {PublicKey} validator_key
     * @param {PublicKey} delegator_key
     * @param {BlockHash} block_hash
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_delegator_reward_by_block_hash(validator_key, delegator_key, block_hash, node_address) {
        _assertClass(validator_key, PublicKey);
        var ptr0 = validator_key.__destroy_into_raw();
        _assertClass(delegator_key, PublicKey);
        var ptr1 = delegator_key.__destroy_into_raw();
        _assertClass(block_hash, BlockHash);
        var ptr2 = block_hash.__destroy_into_raw();
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_delegator_reward_by_block_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, ptr3, len3);
        return ret;
    }
    /**
     * @param {PublicKey} validator_key
     * @param {PublicKey} delegator_key
     * @param {bigint} block_height
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_delegator_reward_by_block_height(validator_key, delegator_key, block_height, node_address) {
        _assertClass(validator_key, PublicKey);
        var ptr0 = validator_key.__destroy_into_raw();
        _assertClass(delegator_key, PublicKey);
        var ptr1 = delegator_key.__destroy_into_raw();
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_delegator_reward_by_block_height(this.__wbg_ptr, ptr0, ptr1, block_height, ptr2, len2);
        return ret;
    }
    /**
     * @param {PublicKey} validator_key
     * @param {PublicKey} delegator_key
     * @param {EraId} era
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_delegator_reward_by_era(validator_key, delegator_key, era, node_address) {
        _assertClass(validator_key, PublicKey);
        var ptr0 = validator_key.__destroy_into_raw();
        _assertClass(delegator_key, PublicKey);
        var ptr1 = delegator_key.__destroy_into_raw();
        _assertClass(era, EraId);
        var ptr2 = era.__destroy_into_raw();
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_delegator_reward_by_era(this.__wbg_ptr, ptr0, ptr1, ptr2, ptr3, len3);
        return ret;
    }
    /**
     * @param {Key} key
     * @param {string[]} path
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_global_state_item(key, path, node_address) {
        _assertClass(key, Key);
        var ptr0 = key.__destroy_into_raw();
        const ptr1 = passArrayJsValueToWasm0(path, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_global_state_item(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2);
        return ret;
    }
    /**
     * @param {BlockHash} block_hash
     * @param {Key} key
     * @param {string[]} path
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_global_state_item_by_block_hash(block_hash, key, path, node_address) {
        _assertClass(block_hash, BlockHash);
        var ptr0 = block_hash.__destroy_into_raw();
        _assertClass(key, Key);
        var ptr1 = key.__destroy_into_raw();
        const ptr2 = passArrayJsValueToWasm0(path, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_global_state_item_by_block_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return ret;
    }
    /**
     * @param {bigint} block_height
     * @param {Key} key
     * @param {string[]} path
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_global_state_item_by_block_height(block_height, key, path, node_address) {
        _assertClass(key, Key);
        var ptr0 = key.__destroy_into_raw();
        const ptr1 = passArrayJsValueToWasm0(path, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_global_state_item_by_block_height(this.__wbg_ptr, block_height, ptr0, ptr1, len1, ptr2, len2);
        return ret;
    }
    /**
     * @param {Digest} state_root_hash
     * @param {Key} key
     * @param {string[]} path
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_global_state_item_by_state_root_hash(state_root_hash, key, path, node_address) {
        _assertClass(state_root_hash, Digest);
        var ptr0 = state_root_hash.__destroy_into_raw();
        _assertClass(key, Key);
        var ptr1 = key.__destroy_into_raw();
        const ptr2 = passArrayJsValueToWasm0(path, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_global_state_item_by_state_root_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_last_progress(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_last_progress(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_latest_block_header(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_latest_block_header(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_latest_block_with_signatures(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_latest_block_with_signatures(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_latest_switch_block_header(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_latest_switch_block_header(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_network_name(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_network_name(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_next_upgrade(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_next_upgrade(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_node_status(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_node_status(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_peers(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_peers(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_protocol_version(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_protocol_version(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_reactor_state(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_reactor_state(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {RecordId} record_id
     * @param {Uint8Array} key
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_read_record(record_id, key, node_address) {
        _assertClass(record_id, RecordId);
        var ptr0 = record_id.__destroy_into_raw();
        const ptr1 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_read_record(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2);
        return ret;
    }
    /**
     * @param {TransactionHash} hash
     * @param {boolean} with_finalized_approvals
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_transaction_by_hash(hash, with_finalized_approvals, node_address) {
        _assertClass(hash, TransactionHash);
        var ptr0 = hash.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_transaction_by_hash(this.__wbg_ptr, ptr0, with_finalized_approvals, ptr1, len1);
        return ret;
    }
    /**
     * @param {Transaction} transaction
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_try_accept_transaction(transaction, node_address) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_try_accept_transaction(this.__wbg_ptr, ptr0, ptr1, len1);
        return ret;
    }
    /**
     * @param {Transaction} transaction
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_try_speculative_execution(transaction, node_address) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_try_speculative_execution(this.__wbg_ptr, ptr0, ptr1, len1);
        return ret;
    }
    /**
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_uptime(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_uptime(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {PublicKey} validator_key
     * @param {BlockHash} block_hash
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_validator_reward_by_block_hash(validator_key, block_hash, node_address) {
        _assertClass(validator_key, PublicKey);
        var ptr0 = validator_key.__destroy_into_raw();
        _assertClass(block_hash, BlockHash);
        var ptr1 = block_hash.__destroy_into_raw();
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_validator_reward_by_block_hash(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
        return ret;
    }
    /**
     * @param {PublicKey} validator_key
     * @param {bigint} block_height
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_validator_reward_by_block_height(validator_key, block_height, node_address) {
        _assertClass(validator_key, PublicKey);
        var ptr0 = validator_key.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_validator_reward_by_block_height(this.__wbg_ptr, ptr0, block_height, ptr1, len1);
        return ret;
    }
    /**
     * @param {PublicKey} validator_key
     * @param {EraId} era
     * @param {string | null} [node_address]
     * @returns {Promise<any>}
     */
    get_binary_validator_reward_by_era(validator_key, era, node_address) {
        _assertClass(validator_key, PublicKey);
        var ptr0 = validator_key.__destroy_into_raw();
        _assertClass(era, EraId);
        var ptr1 = era.__destroy_into_raw();
        var ptr2 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_binary_validator_reward_by_era(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
        return ret;
    }
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
     * @param {getBlockOptions | null} [options]
     * @returns {Promise<GetBlockResult>}
     */
    get_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    get_block_options(options) {
        const ret = wasm.sdk_get_block_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getBlockOptions.__wrap(ret[0]);
    }
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
     * @param {getBlockTransfersOptions | null} [options]
     * @returns {Promise<GetBlockTransfersResult>}
     */
    get_block_transfers(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockTransfersOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block_transfers(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    get_block_transfers_options(options) {
        const ret = wasm.sdk_get_block_transfers_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getBlockTransfersOptions.__wrap(ret[0]);
    }
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
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetChainspecResult>}
     */
    get_chainspec(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_chainspec(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
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
     * @param {getDeployOptions | null} [options]
     * @returns {Promise<GetDeployResult>}
     */
    get_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_deploy(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    get_deploy_options(options) {
        const ret = wasm.sdk_get_deploy_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getDeployOptions.__wrap(ret[0]);
    }
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
     * @param {getDictionaryItemOptions | null} [options]
     * @returns {Promise<GetDictionaryItemResult>}
     */
    get_dictionary_item(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDictionaryItemOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_dictionary_item(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    get_dictionary_item_options(options) {
        const ret = wasm.sdk_get_dictionary_item_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getDictionaryItemOptions.__wrap(ret[0]);
    }
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
     * @param {getEntityOptions | null} [options]
     * @returns {Promise<GetAddressableEntityResult>}
     */
    get_entity(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEntityOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_entity(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {any} options
     * @returns {getEntityOptions}
     */
    get_entity_options(options) {
        const ret = wasm.sdk_get_entity_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getEntityOptions.__wrap(ret[0]);
    }
    /**
     * @param {getEraInfoOptions | null} [options]
     * @returns {Promise<GetEraInfoResult>}
     */
    get_era_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_info(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {any} options
     * @returns {getEraInfoOptions}
     */
    get_era_info_options(options) {
        const ret = wasm.sdk_get_era_info_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getEraInfoOptions.__wrap(ret[0]);
    }
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
     * @param {getEraSummaryOptions | null} [options]
     * @returns {Promise<GetEraSummaryResult>}
     */
    get_era_summary(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraSummaryOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_summary(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    get_era_summary_options(options) {
        const ret = wasm.sdk_get_era_summary_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getEraSummaryOptions.__wrap(ret[0]);
    }
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
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetNodeStatusResult>}
     */
    get_node_status(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_node_status(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
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
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetPeersResult>}
     */
    get_peers(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_peers(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
    /**
     * Get options for speculative execution from a JavaScript value.
     * @param {any} options
     * @returns {getSpeculativeExecDeployOptions}
     */
    get_speculative_exec_deploy_options(options) {
        const ret = wasm.sdk_get_speculative_exec_deploy_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getSpeculativeExecDeployOptions.__wrap(ret[0]);
    }
    /**
     * Get options for speculative execution from a JavaScript value.
     * @param {any} options
     * @returns {getSpeculativeExecTxnOptions}
     */
    get_speculative_exec_options(options) {
        const ret = wasm.sdk_get_speculative_exec_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getSpeculativeExecTxnOptions.__wrap(ret[0]);
    }
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
     * @param {getStateRootHashOptions | null} [options]
     * @returns {Promise<GetStateRootHashResult>}
     */
    get_state_root_hash(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getStateRootHashOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_state_root_hash(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    get_state_root_hash_options(options) {
        const ret = wasm.sdk_get_state_root_hash_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getStateRootHashOptions.__wrap(ret[0]);
    }
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
     * @param {getTransactionOptions | null} [options]
     * @returns {Promise<GetTransactionResult>}
     */
    get_transaction(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getTransactionOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_transaction(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {any} options
     * @returns {getTransactionOptions}
     */
    get_transaction_options(options) {
        const ret = wasm.sdk_get_transaction_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return getTransactionOptions.__wrap(ret[0]);
    }
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
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetValidatorChangesResult>}
     */
    get_validator_changes(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_validator_changes(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
    /**
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetChainspecResult>}
     */
    info_get_chainspec(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_chainspec(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
    /**
     * Retrieves deploy information using the provided options, alias for `get_deploy`.
     * @param {getDeployOptions | null} [options]
     * @returns {Promise<GetDeployResult>}
     */
    info_get_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_info_get_deploy(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetPeersResult>}
     */
    info_get_peers(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_peers(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
    /**
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetNodeStatusResult>}
     */
    info_get_status(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_status(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
    /**
     * Retrieves transaction information using the provided options, alias for `get_transaction`.
     * @param {getTransactionOptions | null} [options]
     * @returns {Promise<GetTransactionResult>}
     */
    info_get_transaction(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getTransactionOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_info_get_transaction(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<GetValidatorChangesResult>}
     */
    info_get_validator_change(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_info_get_validator_change(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
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
     * @param {TransactionStrParams} transaction_params
     * @param {Bytes} transaction_bytes
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutTransactionResult>}
     */
    install(transaction_params, transaction_bytes, rpc_address) {
        _assertClass(transaction_params, TransactionStrParams);
        var ptr0 = transaction_params.__destroy_into_raw();
        _assertClass(transaction_bytes, Bytes);
        var ptr1 = transaction_bytes.__destroy_into_raw();
        var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_install(this.__wbg_ptr, ptr0, ptr1, ptr2, len2);
        return ret;
    }
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
     * @param {DeployStrParams} deploy_params
     * @param {SessionStrParams} session_params
     * @param {string} payment_amount
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutDeployResult>}
     */
    install_deploy(deploy_params, session_params, payment_amount, rpc_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_install_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return ret;
    }
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
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<ListRpcsResult>}
     */
    list_rpcs(verbosity, rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_list_rpcs(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return ret;
    }
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
     * @param {DeployStrParams} deploy_params
     * @param {SessionStrParams} session_params
     * @param {PaymentStrParams} payment_params
     * @returns {Deploy}
     */
    make_deploy(deploy_params, session_params, payment_params) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_make_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Deploy.__wrap(ret[0]);
    }
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
     * @param {TransactionBuilderParams} builder_params
     * @param {TransactionStrParams} transaction_params
     * @returns {Transaction}
     */
    make_transaction(builder_params, transaction_params) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        const ret = wasm.sdk_make_transaction(this.__wbg_ptr, ptr0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
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
     * @param {string} amount
     * @param {string} target_account
     * @param {string | null | undefined} transfer_id
     * @param {DeployStrParams} deploy_params
     * @param {PaymentStrParams} payment_params
     * @returns {Deploy}
     */
    make_transfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        const ret = wasm.sdk_make_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Deploy.__wrap(ret[0]);
    }
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
     * @param {URef | null | undefined} maybe_source
     * @param {string} target
     * @param {string} amount
     * @param {TransactionStrParams} transaction_params
     * @param {string | null} [maybe_id]
     * @returns {Transaction}
     */
    make_transfer_transaction(maybe_source, target, amount, transaction_params, maybe_id) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr0 = maybe_source.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(target, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(transaction_params, TransactionStrParams);
        var ptr3 = transaction_params.__destroy_into_raw();
        var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_make_transfer_transaction(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * @param {string | null} [rpc_address]
     * @param {string | null} [node_address]
     * @param {Verbosity | null} [verbosity]
     */
    constructor(rpc_address, node_address, verbosity) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_new(ptr0, len0, ptr1, len1, isLikeNone(verbosity) ? 3 : verbosity);
        this.__wbg_ptr = ret;
        SDKFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
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
     * @param {Deploy} deploy
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutDeployResult>}
     */
    put_deploy(deploy, verbosity, rpc_address) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return ret;
    }
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
     * @param {Transaction} transaction
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutTransactionResult>}
     */
    put_transaction(transaction, verbosity, rpc_address) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        var ptr1 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_put_transaction(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return ret;
    }
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
     * @param {queryBalanceOptions | null} [options]
     * @returns {Promise<QueryBalanceResult>}
     */
    query_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_balance(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {queryBalanceDetailsOptions | null} [options]
     * @returns {Promise<QueryBalanceDetailsResult>}
     */
    query_balance_details(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryBalanceDetailsOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_balance_details(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {any} options
     * @returns {queryBalanceDetailsOptions}
     */
    query_balance_details_options(options) {
        const ret = wasm.sdk_query_balance_details_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return queryBalanceDetailsOptions.__wrap(ret[0]);
    }
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
    query_balance_options(options) {
        const ret = wasm.sdk_query_balance_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return queryBalanceOptions.__wrap(ret[0]);
    }
    /**
     * JavaScript function for query_contract_dict with deserialized options.
     * @param {queryContractDictOptions | null} [options]
     * @returns {Promise<GetDictionaryItemResult>}
     */
    query_contract_dict(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryContractDictOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_contract_dict(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * Deserialize query_contract_dict_options from a JavaScript object.
     * @param {any} options
     * @returns {queryContractDictOptions}
     */
    query_contract_dict_options(options) {
        const ret = wasm.sdk_query_contract_dict_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return queryContractDictOptions.__wrap(ret[0]);
    }
    /**
     * JavaScript function for query_contract_key with deserialized options.
     * @param {queryContractKeyOptions | null} [options]
     * @returns {Promise<QueryGlobalStateResult>}
     */
    query_contract_key(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryContractKeyOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_contract_key(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * Deserialize query_contract_key_options from a JavaScript object.
     * @param {any} options
     * @returns {queryContractKeyOptions}
     */
    query_contract_key_options(options) {
        const ret = wasm.sdk_query_contract_key_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return queryContractKeyOptions.__wrap(ret[0]);
    }
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
     * @param {queryGlobalStateOptions | null} [options]
     * @returns {Promise<QueryGlobalStateResult>}
     */
    query_global_state(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryGlobalStateOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_global_state(this.__wbg_ptr, ptr0);
        return ret;
    }
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
    query_global_state_options(options) {
        const ret = wasm.sdk_query_global_state_options(this.__wbg_ptr, options);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return queryGlobalStateOptions.__wrap(ret[0]);
    }
    /**
     * @param {string | null} [node_address]
     */
    setNodeAddress(node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_setNodeAddress(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string | null} [rpc_address]
     */
    setRPCAddress(rpc_address) {
        var ptr0 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_setRPCAddress(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {Verbosity | null} [verbosity]
     */
    setVerbosity(verbosity) {
        const ret = wasm.sdk_setVerbosity(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
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
     * @param {Deploy} deploy
     * @param {string} secret_key
     * @returns {Deploy}
     */
    sign_deploy(deploy, secret_key) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_sign_deploy(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
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
     * @param {Transaction} transaction
     * @param {string} secret_key
     * @returns {Transaction}
     */
    sign_transaction(transaction, secret_key) {
        _assertClass(transaction, Transaction);
        var ptr0 = transaction.__destroy_into_raw();
        const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_sign_transaction(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
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
     * @param {DeployStrParams} deploy_params
     * @param {SessionStrParams} session_params
     * @param {PaymentStrParams} payment_params
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<SpeculativeExecResult>}
     */
    speculative_deploy(deploy_params, session_params, payment_params, verbosity, rpc_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        var ptr3 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, isLikeNone(verbosity) ? 3 : verbosity, ptr3, len3);
        return ret;
    }
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
     * @param {getSpeculativeExecTxnOptions | null} [options]
     * @returns {Promise<SpeculativeExecTxnResult>}
     */
    speculative_exec(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getSpeculativeExecTxnOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_speculative_exec(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {getSpeculativeExecDeployOptions | null} [options]
     * @returns {Promise<SpeculativeExecResult>}
     */
    speculative_exec_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getSpeculativeExecDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_speculative_exec_deploy(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {TransactionBuilderParams} builder_params
     * @param {TransactionStrParams} transaction_params
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<SpeculativeExecTxnResult>}
     */
    speculative_transaction(builder_params, transaction_params, verbosity, rpc_address) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_transaction(this.__wbg_ptr, ptr0, ptr1, isLikeNone(verbosity) ? 3 : verbosity, ptr2, len2);
        return ret;
    }
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
     * @param {string} amount
     * @param {string} target_account
     * @param {string | null | undefined} transfer_id
     * @param {DeployStrParams} deploy_params
     * @param {PaymentStrParams} payment_params
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<SpeculativeExecResult>}
     */
    speculative_transfer(amount, target_account, transfer_id, deploy_params, payment_params, verbosity, rpc_address) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return ret;
    }
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
     * @param {URef | null | undefined} maybe_source
     * @param {string} target_account
     * @param {string} amount
     * @param {TransactionStrParams} transaction_params
     * @param {string | null} [maybe_id]
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<SpeculativeExecTxnResult>}
     */
    speculative_transfer_transaction(maybe_source, target_account, amount, transaction_params, maybe_id, verbosity, rpc_address) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr0 = maybe_source.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(transaction_params, TransactionStrParams);
        var ptr3 = transaction_params.__destroy_into_raw();
        var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_transfer_transaction(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return ret;
    }
    /**
     * @param {getAccountOptions | null} [options]
     * @returns {Promise<GetAccountResult>}
     */
    state_get_account_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAccountOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_account_info(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {getAuctionInfoOptions | null} [options]
     * @returns {Promise<GetAuctionInfoResult>}
     */
    state_get_auction_info_js_alias(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAuctionInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_auction_info_js_alias(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {getBalanceOptions | null} [options]
     * @returns {Promise<GetBalanceResult>}
     */
    state_get_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_balance(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * JavaScript Alias for `get_dictionary_item`
     * @param {getDictionaryItemOptions | null} [options]
     * @returns {Promise<GetDictionaryItemResult>}
     */
    state_get_dictionary_item(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDictionaryItemOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_dictionary_item(this.__wbg_ptr, ptr0);
        return ret;
    }
    /**
     * @param {getEntityOptions | null} [options]
     * @returns {Promise<GetAddressableEntityResult>}
     */
    state_get_entity(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEntityOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_entity(this.__wbg_ptr, ptr0);
        return ret;
    }
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
     * @param {TransactionBuilderParams} builder_params
     * @param {TransactionStrParams} transaction_params
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutTransactionResult>}
     */
    transaction(builder_params, transaction_params, verbosity, rpc_address) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        var ptr2 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_transaction(this.__wbg_ptr, ptr0, ptr1, isLikeNone(verbosity) ? 3 : verbosity, ptr2, len2);
        return ret;
    }
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
     * @param {string} amount
     * @param {string} target_account
     * @param {string | null | undefined} transfer_id
     * @param {DeployStrParams} deploy_params
     * @param {PaymentStrParams} payment_params
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutDeployResult>}
     */
    transfer(amount, target_account, transfer_id, deploy_params, payment_params, verbosity, rpc_address) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(transfer_id) ? 0 : passStringToWasm0(transfer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(deploy_params, DeployStrParams);
        var ptr3 = deploy_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr4 = payment_params.__destroy_into_raw();
        var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return ret;
    }
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
     * @param {URef | null | undefined} maybe_source
     * @param {string} target_account
     * @param {string} amount
     * @param {TransactionStrParams} transaction_params
     * @param {string | null} [maybe_id]
     * @param {Verbosity | null} [verbosity]
     * @param {string | null} [rpc_address]
     * @returns {Promise<PutTransactionResult>}
     */
    transfer_transaction(maybe_source, target_account, amount, transaction_params, maybe_id, verbosity, rpc_address) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr0 = maybe_source.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(transaction_params, TransactionStrParams);
        var ptr3 = transaction_params.__destroy_into_raw();
        var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(rpc_address) ? 0 : passStringToWasm0(rpc_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_transfer_transaction(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return ret;
    }
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
     * @param {string} events_url
     * @param {string} deploy_hash
     * @param {number | null} [timeout_duration]
     * @returns {Promise<Promise<any>>}
     */
    waitDeploy(events_url, deploy_hash, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_waitDeploy(this.__wbg_ptr, ptr0, len0, ptr1, len1, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : (timeout_duration) >>> 0);
        return ret;
    }
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
     * @param {string} events_url
     * @param {string} target_hash
     * @param {number | null} [timeout_duration]
     * @returns {Promise<Promise<any>>}
     */
    waitTransaction(events_url, target_hash, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_waitTransaction(this.__wbg_ptr, ptr0, len0, ptr1, len1, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : (timeout_duration) >>> 0);
        return ret;
    }
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
     * @param {string} events_url
     * @param {number | null} [timeout_duration]
     * @returns {Watcher}
     */
    watchDeploy(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_watchDeploy(this.__wbg_ptr, ptr0, len0, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : (timeout_duration) >>> 0);
        return Watcher.__wrap(ret);
    }
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
     * @param {string} events_url
     * @param {number | null} [timeout_duration]
     * @returns {Watcher}
     */
    watchTransaction(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_watchTransaction(this.__wbg_ptr, ptr0, len0, isLikeNone(timeout_duration) ? Number.MAX_SAFE_INTEGER : (timeout_duration) >>> 0);
        return Watcher.__wrap(ret);
    }
}
if (Symbol.dispose) SDK.prototype[Symbol.dispose] = SDK.prototype.free;
exports.SDK = SDK;

class SessionStrParams {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SessionStrParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sessionstrparams_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get is_session_transfer() {
        const ret = wasm.sessionstrparams_is_session_transfer(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {string | null} [session_hash]
     * @param {string | null} [session_name]
     * @param {string | null} [session_package_hash]
     * @param {string | null} [session_package_name]
     * @param {string | null} [session_path]
     * @param {Bytes | null} [session_bytes]
     * @param {Array<any> | null} [session_args_simple]
     * @param {string | null} [session_args_json]
     * @param {string | null} [session_version]
     * @param {string | null} [session_entry_point]
     * @param {boolean | null} [is_session_transfer]
     */
    constructor(session_hash, session_name, session_package_hash, session_package_name, session_path, session_bytes, session_args_simple, session_args_json, session_version, session_entry_point, is_session_transfer) {
        var ptr0 = isLikeNone(session_hash) ? 0 : passStringToWasm0(session_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(session_name) ? 0 : passStringToWasm0(session_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(session_package_hash) ? 0 : passStringToWasm0(session_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(session_package_name) ? 0 : passStringToWasm0(session_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(session_path) ? 0 : passStringToWasm0(session_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        let ptr5 = 0;
        if (!isLikeNone(session_bytes)) {
            _assertClass(session_bytes, Bytes);
            ptr5 = session_bytes.__destroy_into_raw();
        }
        var ptr6 = isLikeNone(session_args_json) ? 0 : passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(session_version) ? 0 : passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(session_entry_point) ? 0 : passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        const ret = wasm.sessionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, isLikeNone(session_args_simple) ? 0 : addToExternrefTable0(session_args_simple), ptr6, len6, ptr7, len7, ptr8, len8, isLikeNone(is_session_transfer) ? 0xFFFFFF : is_session_transfer ? 1 : 0);
        this.__wbg_ptr = ret;
        SessionStrParamsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string | undefined}
     */
    get session_args_json() {
        const ret = wasm.sessionstrparams_session_args_json(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {ArgsSimple | undefined}
     */
    get session_args_simple() {
        const ret = wasm.sessionstrparams_session_args_simple(this.__wbg_ptr);
        return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
    }
    /**
     * @returns {Bytes | undefined}
     */
    get session_bytes() {
        const ret = wasm.sessionstrparams_session_bytes(this.__wbg_ptr);
        return ret === 0 ? undefined : Bytes.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get session_entry_point() {
        const ret = wasm.sessionstrparams_session_entry_point(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_hash() {
        const ret = wasm.sessionstrparams_session_hash(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_name() {
        const ret = wasm.sessionstrparams_session_name(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_package_hash() {
        const ret = wasm.sessionstrparams_session_package_hash(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_package_name() {
        const ret = wasm.sessionstrparams_session_package_name(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_path() {
        const ret = wasm.sessionstrparams_session_path(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_version() {
        const ret = wasm.sessionstrparams_session_version(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean} is_session_transfer
     */
    set is_session_transfer(is_session_transfer) {
        wasm.sessionstrparams_set_is_session_transfer(this.__wbg_ptr, is_session_transfer);
    }
    /**
     * @param {string} session_args_json
     */
    set session_args_json(session_args_json) {
        const ptr0 = passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Array<any>} session_args_simple
     */
    set session_args_simple(session_args_simple) {
        wasm.sessionstrparams_set_session_args_simple(this.__wbg_ptr, session_args_simple);
    }
    /**
     * @param {Bytes} session_bytes
     */
    set session_bytes(session_bytes) {
        _assertClass(session_bytes, Bytes);
        var ptr0 = session_bytes.__destroy_into_raw();
        wasm.sessionstrparams_set_session_bytes(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} session_entry_point
     */
    set session_entry_point(session_entry_point) {
        const ptr0 = passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_entry_point(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_hash
     */
    set session_hash(session_hash) {
        const ptr0 = passStringToWasm0(session_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_name
     */
    set session_name(session_name) {
        const ptr0 = passStringToWasm0(session_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_package_hash
     */
    set session_package_hash(session_package_hash) {
        const ptr0 = passStringToWasm0(session_package_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_package_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_package_name
     */
    set session_package_name(session_package_name) {
        const ptr0 = passStringToWasm0(session_package_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_package_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_path
     */
    set session_path(session_path) {
        const ptr0 = passStringToWasm0(session_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_version
     */
    set session_version(session_version) {
        const ptr0 = passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_version(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) SessionStrParams.prototype[Symbol.dispose] = SessionStrParams.prototype.free;
exports.SessionStrParams = SessionStrParams;

class SignatureResponse {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SignatureResponseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signatureresponse_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get_signature() {
        const ret = wasm.signatureresponse_get_signature(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {string}
     */
    get_signature_hex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signatureresponse_get_signature_hex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    is_cancelled() {
        const ret = wasm.signatureresponse_is_cancelled(this.__wbg_ptr);
        return ret !== 0;
    }
}
if (Symbol.dispose) SignatureResponse.prototype[Symbol.dispose] = SignatureResponse.prototype.free;
exports.SignatureResponse = SignatureResponse;

class SpeculativeExecResult {
    static __wrap(ptr) {
        const obj = Object.create(SpeculativeExecResult.prototype);
        obj.__wbg_ptr = ptr;
        SpeculativeExecResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SpeculativeExecResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_speculativeexecresult_free(ptr, 0);
    }
    /**
     * Get the API version of the result.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.speculativeexecresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get the block hash.
     * @returns {BlockHash}
     */
    get block_hash() {
        const ret = wasm.speculativeexecresult_block_hash(this.__wbg_ptr);
        return BlockHash.__wrap(ret);
    }
    /**
     * Get the execution result.
     * @returns {any}
     */
    get execution_result() {
        const ret = wasm.speculativeexecresult_execution_result(this.__wbg_ptr);
        return ret;
    }
    /**
     * Convert the result to JSON format.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.speculativeexecresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) SpeculativeExecResult.prototype[Symbol.dispose] = SpeculativeExecResult.prototype.free;
exports.SpeculativeExecResult = SpeculativeExecResult;

class SpeculativeExecTxnResult {
    static __wrap(ptr) {
        const obj = Object.create(SpeculativeExecTxnResult.prototype);
        obj.__wbg_ptr = ptr;
        SpeculativeExecTxnResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SpeculativeExecTxnResultFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_speculativeexectxnresult_free(ptr, 0);
    }
    /**
     * Get the API version of the result.
     * @returns {any}
     */
    get api_version() {
        const ret = wasm.speculativeexectxnresult_api_version(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get the block hash.
     * @returns {BlockHash}
     */
    get block_hash() {
        const ret = wasm.speculativeexectxnresult_block_hash(this.__wbg_ptr);
        return BlockHash.__wrap(ret);
    }
    /**
     * Get the execution result.
     * @returns {any}
     */
    get execution_result() {
        const ret = wasm.speculativeexectxnresult_execution_result(this.__wbg_ptr);
        return ret;
    }
    /**
     * Convert the result to JSON format.
     * @returns {any}
     */
    toJson() {
        const ret = wasm.speculativeexectxnresult_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) SpeculativeExecTxnResult.prototype[Symbol.dispose] = SpeculativeExecTxnResult.prototype.free;
exports.SpeculativeExecTxnResult = SpeculativeExecTxnResult;

/**
 * Represents a subscription to transaction events for wasm32 target architecture.
 */
class Subscription {
    static __unwrap(jsValue) {
        if (!(jsValue instanceof Subscription)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SubscriptionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_subscription_free(ptr, 0);
    }
    /**
     * Handler function for transaction events.
     * @returns {Function}
     */
    get eventHandlerFn() {
        const ret = wasm.__wbg_get_subscription_eventHandlerFn(this.__wbg_ptr);
        return ret;
    }
    /**
     * Transaction target hash to identify the subscription.
     * @returns {string}
     */
    get targetHash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_subscription_targetHash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Handler function for transaction events.
     * @param {Function} arg0
     */
    set eventHandlerFn(arg0) {
        wasm.__wbg_set_subscription_eventHandlerFn(this.__wbg_ptr, arg0);
    }
    /**
     * Transaction target hash to identify the subscription.
     * @param {string} arg0
     */
    set targetHash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_subscription_targetHash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Constructor for Subscription for wasm32 target architecture.
     *
     * # Arguments
     *
     * * `transaction_hash` - Transaction hash to identify the subscription.
     * * `event_handler_fn` - Handler function for transaction events.
     * @param {string} target_hash
     * @param {Function} event_handler_fn
     */
    constructor(target_hash, event_handler_fn) {
        const ptr0 = passStringToWasm0(target_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.subscription_new(ptr0, len0, event_handler_fn);
        this.__wbg_ptr = ret;
        SubscriptionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) Subscription.prototype[Symbol.dispose] = Subscription.prototype.free;
exports.Subscription = Subscription;

class Transaction {
    static __wrap(ptr) {
        const obj = Object.create(Transaction.prototype);
        obj.__wbg_ptr = ptr;
        TransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transaction_free(ptr, 0);
    }
    /**
     * @returns {AccountHash}
     */
    get account_hash() {
        const ret = wasm.transaction_account_hash(this.__wbg_ptr);
        return AccountHash.__wrap(ret);
    }
    /**
     * @param {any} js_value_arg
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    addArg(js_value_arg, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_addArg(this.__wbg_ptr, js_value_arg, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * @param {string} public_key
     * @param {string} signature
     * @returns {Transaction}
     */
    addSignature(public_key, signature) {
        const ptr0 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_addSignature(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get additional_computation_factor() {
        const ret = wasm.transaction_additional_computation_factor(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get approvals() {
        const ret = wasm.transaction_approvals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    approvalsHash() {
        const ret = wasm.transaction_approvalsHash(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    get authorization_keys() {
        const ret = wasm.transaction_authorization_keys(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get chain_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_chain_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get entry_point() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_entry_point(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    get expired() {
        const ret = wasm.transaction_expired(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {any}
     */
    get expires() {
        const ret = wasm.transaction_expires(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get gas_price_tolerance() {
        const ret = wasm.transaction_gas_price_tolerance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {TransactionHash}
     */
    get hash() {
        const ret = wasm.transaction_hash(this.__wbg_ptr);
        return TransactionHash.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    get initiator_addr() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_initiator_addr(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    get is_native() {
        const ret = wasm.transaction_is_native(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get is_standard_payment() {
        const ret = wasm.transaction_is_standard_payment(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {any} transaction
     */
    constructor(transaction) {
        const ret = wasm.transaction_new(transaction);
        this.__wbg_ptr = ret;
        TransactionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {TransactionBuilderParams} builder_params
     * @param {TransactionStrParams} transaction_params
     * @returns {Transaction}
     */
    static newSession(builder_params, transaction_params) {
        _assertClass(builder_params, TransactionBuilderParams);
        var ptr0 = builder_params.__destroy_into_raw();
        _assertClass(transaction_params, TransactionStrParams);
        var ptr1 = transaction_params.__destroy_into_raw();
        const ret = wasm.transaction_newSession(ptr0, ptr1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * @param {URef | null | undefined} maybe_source
     * @param {string} target_account
     * @param {string} amount
     * @param {TransactionStrParams} transaction_params
     * @param {string | null} [maybe_id]
     * @returns {Transaction}
     */
    static newTransfer(maybe_source, target_account, amount, transaction_params, maybe_id) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr0 = maybe_source.__destroy_into_raw();
        }
        const ptr1 = passStringToWasm0(target_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(transaction_params, TransactionStrParams);
        var ptr3 = transaction_params.__destroy_into_raw();
        var ptr4 = isLikeNone(maybe_id) ? 0 : passStringToWasm0(maybe_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_newTransfer(ptr0, ptr1, len1, ptr2, len2, ptr3, ptr4, len4);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * @returns {bigint | undefined}
     */
    get payment_amount() {
        const ret = wasm.transaction_payment_amount(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @returns {PricingMode}
     */
    get pricing_mode() {
        const ret = wasm.transaction_pricing_mode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Digest}
     */
    get receipt() {
        const ret = wasm.transaction_receipt(this.__wbg_ptr);
        return Digest.__wrap(ret);
    }
    /**
     * @returns {any}
     */
    session_args() {
        const ret = wasm.transaction_session_args(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} secret_key
     * @returns {Transaction}
     */
    sign(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_sign(this.__wbg_ptr, ptr0, len0);
        return Transaction.__wrap(ret);
    }
    /**
     * @returns {any}
     */
    get signers() {
        const ret = wasm.transaction_signers(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get size_estimate() {
        const ret = wasm.transaction_size_estimate(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {any}
     */
    get target() {
        const ret = wasm.transaction_target(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_timestamp(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.transaction_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    get ttl() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_ttl(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    verify() {
        const ret = wasm.transaction_verify(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {AccountHash} account_hash
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withAccountHash(account_hash, secret_key) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withAccountHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {string} chain_name
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withChainName(chain_name, secret_key) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withChainName(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {AddressableEntityHash} hash
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withEntityHash(hash, secret_key) {
        _assertClass(hash, AddressableEntityHash);
        var ptr0 = hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withEntityHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {string} entry_point
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withEntryPoint(entry_point, secret_key) {
        const ptr0 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withEntryPoint(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {PackageHash} package_hash
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withPackageHash(package_hash, secret_key) {
        _assertClass(package_hash, PackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withPackageHash(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {PublicKey} public_key
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withPublicKey(public_key, secret_key) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withPublicKey(this.__wbg_ptr, ptr0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withSecretKey(secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withSecretKey(this.__wbg_ptr, ptr0, len0);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {string} ttl
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withTTL(ttl, secret_key) {
        const ptr0 = passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withTTL(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {string} timestamp
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withTimestamp(timestamp, secret_key) {
        const ptr0 = passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withTimestamp(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
    /**
     * @param {Bytes} transaction_bytes
     * @param {boolean | null} [is_install_upgrade]
     * @param {string | null} [secret_key]
     * @returns {Transaction}
     */
    withTransactionBytes(transaction_bytes, is_install_upgrade, secret_key) {
        _assertClass(transaction_bytes, Bytes);
        var ptr0 = transaction_bytes.__destroy_into_raw();
        var ptr1 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_withTransactionBytes(this.__wbg_ptr, ptr0, isLikeNone(is_install_upgrade) ? 0xFFFFFF : is_install_upgrade ? 1 : 0, ptr1, len1);
        return Transaction.__wrap(ret);
    }
}
if (Symbol.dispose) Transaction.prototype[Symbol.dispose] = Transaction.prototype.free;
exports.Transaction = Transaction;

class TransactionBuilderParams {
    static __wrap(ptr) {
        const obj = Object.create(TransactionBuilderParams.prototype);
        obj.__wbg_ptr = ptr;
        TransactionBuilderParamsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionBuilderParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionbuilderparams_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get amount() {
        const ret = wasm.transactionbuilderparams_amount(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {number | undefined}
     */
    get delegation_rate() {
        const ret = wasm.transactionbuilderparams_delegation_rate(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {PublicKey | undefined}
     */
    get delegator() {
        const ret = wasm.transactionbuilderparams_delegator(this.__wbg_ptr);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get entity_alias() {
        const ret = wasm.transactionbuilderparams_entity_alias(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {AddressableEntityHash | undefined}
     */
    get entity_hash() {
        const ret = wasm.transactionbuilderparams_entity_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : AddressableEntityHash.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get entry_point() {
        const ret = wasm.transactionbuilderparams_entry_point(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {boolean | undefined}
     */
    get is_install_upgrade() {
        const ret = wasm.transactionbuilderparams_is_install_upgrade(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {TransactionKind}
     */
    get kind() {
        const ret = wasm.transactionbuilderparams_kind(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {bigint | undefined}
     */
    get maximum_delegation_amount() {
        const ret = wasm.transactionbuilderparams_maximum_delegation_amount(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @returns {bigint | undefined}
     */
    get maybe_id() {
        const ret = wasm.transactionbuilderparams_maybe_id(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @returns {URef | undefined}
     */
    get maybe_source() {
        const ret = wasm.transactionbuilderparams_maybe_source(this.__wbg_ptr);
        return ret === 0 ? undefined : URef.__wrap(ret);
    }
    /**
     * @returns {bigint | undefined}
     */
    get minimum_delegation_amount() {
        const ret = wasm.transactionbuilderparams_minimum_delegation_amount(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @param {PublicKey} public_key
     * @param {number} delegation_rate
     * @param {string} amount
     * @param {bigint | null} [minimum_delegation_amount]
     * @param {bigint | null} [maximum_delegation_amount]
     * @param {number | null} [reserved_slots]
     * @returns {TransactionBuilderParams}
     */
    static newAddBid(public_key, delegation_rate, amount, minimum_delegation_amount, maximum_delegation_amount, reserved_slots) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newAddBid(ptr0, delegation_rate, ptr1, len1, !isLikeNone(minimum_delegation_amount), isLikeNone(minimum_delegation_amount) ? BigInt(0) : minimum_delegation_amount, !isLikeNone(maximum_delegation_amount), isLikeNone(maximum_delegation_amount) ? BigInt(0) : maximum_delegation_amount, isLikeNone(reserved_slots) ? Number.MAX_SAFE_INTEGER : (reserved_slots) >>> 0);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {PublicKey} delegator
     * @param {PublicKey} validator
     * @param {string} amount
     * @returns {TransactionBuilderParams}
     */
    static newDelegate(delegator, validator, amount) {
        _assertClass(delegator, PublicKey);
        var ptr0 = delegator.__destroy_into_raw();
        _assertClass(validator, PublicKey);
        var ptr1 = validator.__destroy_into_raw();
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newDelegate(ptr0, ptr1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {AddressableEntityHash} entity_hash
     * @param {string} entry_point
     * @returns {TransactionBuilderParams}
     */
    static newInvocableEntity(entity_hash, entry_point) {
        _assertClass(entity_hash, AddressableEntityHash);
        var ptr0 = entity_hash.__destroy_into_raw();
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newInvocableEntity(ptr0, ptr1, len1);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {string} entity_alias
     * @param {string} entry_point
     * @returns {TransactionBuilderParams}
     */
    static newInvocableEntityAlias(entity_alias, entry_point) {
        const ptr0 = passStringToWasm0(entity_alias, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newInvocableEntityAlias(ptr0, len0, ptr1, len1);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {PackageHash} package_hash
     * @param {string} entry_point
     * @param {string | null} [maybe_entity_version]
     * @returns {TransactionBuilderParams}
     */
    static newPackage(package_hash, entry_point, maybe_entity_version) {
        _assertClass(package_hash, PackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newPackage(ptr0, ptr1, len1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {string} package_alias
     * @param {string} entry_point
     * @param {string | null} [maybe_entity_version]
     * @returns {TransactionBuilderParams}
     */
    static newPackageAlias(package_alias, entry_point, maybe_entity_version) {
        const ptr0 = passStringToWasm0(package_alias, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newPackageAlias(ptr0, len0, ptr1, len1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {string} package_alias
     * @param {string} entry_point
     * @param {string | null} [maybe_entity_version]
     * @param {number | null} [major_protocol_version]
     * @returns {TransactionBuilderParams}
     */
    static newPackageAliasWithMajor(package_alias, entry_point, maybe_entity_version, major_protocol_version) {
        const ptr0 = passStringToWasm0(package_alias, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newPackageAliasWithMajor(ptr0, len0, ptr1, len1, ptr2, len2, isLikeNone(major_protocol_version) ? Number.MAX_SAFE_INTEGER : (major_protocol_version) >>> 0);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {PackageHash} package_hash
     * @param {string} entry_point
     * @param {string | null} [maybe_entity_version]
     * @param {number | null} [major_protocol_version]
     * @returns {TransactionBuilderParams}
     */
    static newPackageWithMajor(package_hash, entry_point, maybe_entity_version, major_protocol_version) {
        _assertClass(package_hash, PackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        const ptr1 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(maybe_entity_version) ? 0 : passStringToWasm0(maybe_entity_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newPackageWithMajor(ptr0, ptr1, len1, ptr2, len2, isLikeNone(major_protocol_version) ? Number.MAX_SAFE_INTEGER : (major_protocol_version) >>> 0);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {PublicKey} delegator
     * @param {PublicKey} validator
     * @param {PublicKey} new_validator
     * @param {string} amount
     * @returns {TransactionBuilderParams}
     */
    static newRedelegate(delegator, validator, new_validator, amount) {
        _assertClass(delegator, PublicKey);
        var ptr0 = delegator.__destroy_into_raw();
        _assertClass(validator, PublicKey);
        var ptr1 = validator.__destroy_into_raw();
        _assertClass(new_validator, PublicKey);
        var ptr2 = new_validator.__destroy_into_raw();
        const ptr3 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newRedelegate(ptr0, ptr1, ptr2, ptr3, len3);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {Bytes | null} [transaction_bytes]
     * @param {boolean | null} [is_install_upgrade]
     * @returns {TransactionBuilderParams}
     */
    static newSession(transaction_bytes, is_install_upgrade) {
        let ptr0 = 0;
        if (!isLikeNone(transaction_bytes)) {
            _assertClass(transaction_bytes, Bytes);
            ptr0 = transaction_bytes.__destroy_into_raw();
        }
        const ret = wasm.transactionbuilderparams_newSession(ptr0, isLikeNone(is_install_upgrade) ? 0xFFFFFF : is_install_upgrade ? 1 : 0);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {URef | null | undefined} maybe_source
     * @param {TransferTarget} target
     * @param {string} amount
     * @param {bigint | null} [maybe_id]
     * @returns {TransactionBuilderParams}
     */
    static newTransfer(maybe_source, target, amount, maybe_id) {
        let ptr0 = 0;
        if (!isLikeNone(maybe_source)) {
            _assertClass(maybe_source, URef);
            ptr0 = maybe_source.__destroy_into_raw();
        }
        _assertClass(target, TransferTarget);
        var ptr1 = target.__destroy_into_raw();
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newTransfer(ptr0, ptr1, ptr2, len2, !isLikeNone(maybe_id), isLikeNone(maybe_id) ? BigInt(0) : maybe_id);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {PublicKey} delegator
     * @param {PublicKey} validator
     * @param {string} amount
     * @returns {TransactionBuilderParams}
     */
    static newUndelegate(delegator, validator, amount) {
        _assertClass(delegator, PublicKey);
        var ptr0 = delegator.__destroy_into_raw();
        _assertClass(validator, PublicKey);
        var ptr1 = validator.__destroy_into_raw();
        const ptr2 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newUndelegate(ptr0, ptr1, ptr2, len2);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @param {PublicKey} public_key
     * @param {string} amount
     * @returns {TransactionBuilderParams}
     */
    static newWithdrawBid(public_key, amount) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilderparams_newWithdrawBid(ptr0, ptr1, len1);
        return TransactionBuilderParams.__wrap(ret);
    }
    /**
     * @returns {PublicKey | undefined}
     */
    get new_validator() {
        const ret = wasm.transactionbuilderparams_new_validator(this.__wbg_ptr);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get package_alias() {
        const ret = wasm.transactionbuilderparams_package_alias(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {PackageHash | undefined}
     */
    get package_hash() {
        const ret = wasm.transactionbuilderparams_package_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : PackageHash.__wrap(ret);
    }
    /**
     * @returns {PublicKey | undefined}
     */
    get public_key() {
        const ret = wasm.transactionbuilderparams_public_key(this.__wbg_ptr);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
    /**
     * @param {string} amount
     */
    set amount(amount) {
        const ptr0 = passStringToWasm0(amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionbuilderparams_set_amount(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} delegation_rate
     */
    set delegation_rate(delegation_rate) {
        wasm.transactionbuilderparams_set_delegation_rate(this.__wbg_ptr, delegation_rate);
    }
    /**
     * @param {PublicKey} delegator
     */
    set delegator(delegator) {
        _assertClass(delegator, PublicKey);
        var ptr0 = delegator.__destroy_into_raw();
        wasm.transactionbuilderparams_set_delegator(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} entity_alias
     */
    set entity_alias(entity_alias) {
        const ptr0 = passStringToWasm0(entity_alias, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionbuilderparams_set_entity_alias(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {AddressableEntityHash} entity_hash
     */
    set entity_hash(entity_hash) {
        _assertClass(entity_hash, AddressableEntityHash);
        var ptr0 = entity_hash.__destroy_into_raw();
        wasm.transactionbuilderparams_set_entity_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} entry_point
     */
    set entry_point(entry_point) {
        const ptr0 = passStringToWasm0(entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionbuilderparams_set_entry_point(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} is_install_upgrade
     */
    set is_install_upgrade(is_install_upgrade) {
        wasm.transactionbuilderparams_set_is_install_upgrade(this.__wbg_ptr, is_install_upgrade);
    }
    /**
     * @param {TransactionKind} kind
     */
    set kind(kind) {
        wasm.transactionbuilderparams_set_kind(this.__wbg_ptr, kind);
    }
    /**
     * @param {bigint | null} [maximum_delegation_amount]
     */
    set maximum_delegation_amount(maximum_delegation_amount) {
        wasm.transactionbuilderparams_set_maximum_delegation_amount(this.__wbg_ptr, !isLikeNone(maximum_delegation_amount), isLikeNone(maximum_delegation_amount) ? BigInt(0) : maximum_delegation_amount);
    }
    /**
     * @param {bigint} id
     */
    set maybe_id(id) {
        wasm.transactionbuilderparams_set_maybe_id(this.__wbg_ptr, id);
    }
    /**
     * @param {URef} maybe_source
     */
    set maybe_source(maybe_source) {
        _assertClass(maybe_source, URef);
        var ptr0 = maybe_source.__destroy_into_raw();
        wasm.transactionbuilderparams_set_maybe_source(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {bigint | null} [minimum_delegation_amount]
     */
    set minimum_delegation_amount(minimum_delegation_amount) {
        wasm.transactionbuilderparams_set_minimum_delegation_amount(this.__wbg_ptr, !isLikeNone(minimum_delegation_amount), isLikeNone(minimum_delegation_amount) ? BigInt(0) : minimum_delegation_amount);
    }
    /**
     * @param {PublicKey} new_validator
     */
    set new_validator(new_validator) {
        _assertClass(new_validator, PublicKey);
        var ptr0 = new_validator.__destroy_into_raw();
        wasm.transactionbuilderparams_set_new_validator(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} package_alias
     */
    set package_alias(package_alias) {
        const ptr0 = passStringToWasm0(package_alias, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionbuilderparams_set_package_alias(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {PackageHash} package_hash
     */
    set package_hash(package_hash) {
        _assertClass(package_hash, PackageHash);
        var ptr0 = package_hash.__destroy_into_raw();
        wasm.transactionbuilderparams_set_package_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PublicKey} public_key
     */
    set public_key(public_key) {
        _assertClass(public_key, PublicKey);
        var ptr0 = public_key.__destroy_into_raw();
        wasm.transactionbuilderparams_set_public_key(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferTarget} target
     */
    set target(target) {
        _assertClass(target, TransferTarget);
        var ptr0 = target.__destroy_into_raw();
        wasm.transactionbuilderparams_set_target(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Bytes} transaction_bytes
     */
    set transaction_bytes(transaction_bytes) {
        _assertClass(transaction_bytes, Bytes);
        var ptr0 = transaction_bytes.__destroy_into_raw();
        wasm.transactionbuilderparams_set_transaction_bytes(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PublicKey} validator
     */
    set validator(validator) {
        _assertClass(validator, PublicKey);
        var ptr0 = validator.__destroy_into_raw();
        wasm.transactionbuilderparams_set_validator(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferTarget | undefined}
     */
    get target() {
        const ret = wasm.transactionbuilderparams_target(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferTarget.__wrap(ret);
    }
    /**
     * @returns {Bytes | undefined}
     */
    get transaction_bytes() {
        const ret = wasm.transactionbuilderparams_transaction_bytes(this.__wbg_ptr);
        return ret === 0 ? undefined : Bytes.__wrap(ret);
    }
    /**
     * @returns {PublicKey | undefined}
     */
    get validator() {
        const ret = wasm.transactionbuilderparams_validator(this.__wbg_ptr);
        return ret === 0 ? undefined : PublicKey.__wrap(ret);
    }
}
if (Symbol.dispose) TransactionBuilderParams.prototype[Symbol.dispose] = TransactionBuilderParams.prototype.free;
exports.TransactionBuilderParams = TransactionBuilderParams;

class TransactionHash {
    static __wrap(ptr) {
        const obj = Object.create(TransactionHash.prototype);
        obj.__wbg_ptr = ptr;
        TransactionHashFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionHashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionhash_free(ptr, 0);
    }
    /**
     * @returns {Digest}
     */
    digest() {
        const ret = wasm.transactionhash_digest(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Digest.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {TransactionHash}
     */
    static fromRaw(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transactionhash_fromRaw(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return TransactionHash.__wrap(ret[0]);
    }
    /**
     * @param {string} transaction_hash_hex_str
     */
    constructor(transaction_hash_hex_str) {
        const ptr0 = passStringToWasm0(transaction_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transactionhash_new_js_alias(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        TransactionHashFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.transactionhash_toJson(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transactionhash_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) TransactionHash.prototype[Symbol.dispose] = TransactionHash.prototype.free;
exports.TransactionHash = TransactionHash;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}
 */
const TransactionKind = Object.freeze({
    InvocableEntity: 0, "0": "InvocableEntity",
    InvocableEntityAlias: 1, "1": "InvocableEntityAlias",
    Package: 2, "2": "Package",
    PackageAlias: 3, "3": "PackageAlias",
    Session: 4, "4": "Session",
    Transfer: 5, "5": "Transfer",
    AddBid: 6, "6": "AddBid",
    Delegate: 7, "7": "Delegate",
    Undelegate: 8, "8": "Undelegate",
    Redelegate: 9, "9": "Redelegate",
    WithdrawBid: 10, "10": "WithdrawBid",
});
exports.TransactionKind = TransactionKind;

/**
 * Represents processed deploy information.
 */
class TransactionProcessed {
    static __wrap(ptr) {
        const obj = Object.create(TransactionProcessed.prototype);
        obj.__wbg_ptr = ptr;
        TransactionProcessedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionProcessedFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionprocessed_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get block_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_transactionprocessed_block_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Result of the execution, either Success or Failure.
     * @returns {ExecutionResult}
     */
    get execution_result() {
        const ret = wasm.__wbg_get_transactionprocessed_execution_result(this.__wbg_ptr);
        return ExecutionResult.__wrap(ret);
    }
    /**
     * @returns {HashString}
     */
    get hash() {
        const ret = wasm.__wbg_get_transactionprocessed_hash(this.__wbg_ptr);
        return HashString.__wrap(ret);
    }
    /**
     * @returns {PublicKeyString}
     */
    get initiator_addr() {
        const ret = wasm.__wbg_get_transactionprocessed_initiator_addr(this.__wbg_ptr);
        return PublicKeyString.__wrap(ret);
    }
    /**
     * @returns {Messages[]}
     */
    get messages() {
        const ret = wasm.__wbg_get_transactionprocessed_messages(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {string}
     */
    get timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_transactionprocessed_timestamp(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get ttl() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_transactionprocessed_ttl(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set block_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_block_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Result of the execution, either Success or Failure.
     * @param {ExecutionResult} arg0
     */
    set execution_result(arg0) {
        _assertClass(arg0, ExecutionResult);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transactionprocessed_execution_result(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {HashString} arg0
     */
    set hash(arg0) {
        _assertClass(arg0, HashString);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transactionprocessed_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PublicKeyString} arg0
     */
    set initiator_addr(arg0) {
        _assertClass(arg0, PublicKeyString);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transactionprocessed_initiator_addr(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Messages[]} arg0
     */
    set messages(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_messages(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} arg0
     */
    set timestamp(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} arg0
     */
    set ttl(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_transactionprocessed_ttl(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) TransactionProcessed.prototype[Symbol.dispose] = TransactionProcessed.prototype.free;
exports.TransactionProcessed = TransactionProcessed;

class TransactionStrParams {
    static __wrap(ptr) {
        const obj = Object.create(TransactionStrParams.prototype);
        obj.__wbg_ptr = ptr;
        TransactionStrParamsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionStrParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionstrparams_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get additional_computation_factor() {
        const ret = wasm.transactionstrparams_additional_computation_factor(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get chain_name() {
        const ret = wasm.transactionstrparams_chain_name(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Bytes | undefined}
     */
    get chunked_args() {
        const ret = wasm.transactionstrparams_chunked_args(this.__wbg_ptr);
        return ret === 0 ? undefined : Bytes.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get gas_price_tolerance() {
        const ret = wasm.transactionstrparams_gas_price_tolerance(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get initiator_addr() {
        const ret = wasm.transactionstrparams_initiator_addr(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string} chain_name
     * @param {string | null} [initiator_addr]
     * @param {string | null} [secret_key]
     * @param {string | null} [timestamp]
     * @param {string | null} [ttl]
     * @param {string[] | null} [session_args_simple]
     * @param {string | null} [session_args_json]
     * @param {PricingMode | null} [pricing_mode]
     * @param {string | null} [additional_computation_factor]
     * @param {string | null} [payment_amount]
     * @param {string | null} [gas_price_tolerance]
     * @param {string | null} [receipt]
     * @param {boolean | null} [standard_payment]
     * @param {string | null} [transferred_value]
     * @param {string | null} [session_entry_point]
     * @param {Bytes | null} [chunked_args]
     * @param {boolean | null} [min_bid_override]
     */
    constructor(chain_name, initiator_addr, secret_key, timestamp, ttl, session_args_simple, session_args_json, pricing_mode, additional_computation_factor, payment_amount, gas_price_tolerance, receipt, standard_payment, transferred_value, session_entry_point, chunked_args, min_bid_override) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(initiator_addr) ? 0 : passStringToWasm0(initiator_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(session_args_simple) ? 0 : passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_malloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(session_args_json) ? 0 : passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        var ptr7 = isLikeNone(additional_computation_factor) ? 0 : passStringToWasm0(additional_computation_factor, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(payment_amount) ? 0 : passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        var ptr9 = isLikeNone(gas_price_tolerance) ? 0 : passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len9 = WASM_VECTOR_LEN;
        var ptr10 = isLikeNone(receipt) ? 0 : passStringToWasm0(receipt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len10 = WASM_VECTOR_LEN;
        var ptr11 = isLikeNone(transferred_value) ? 0 : passStringToWasm0(transferred_value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len11 = WASM_VECTOR_LEN;
        var ptr12 = isLikeNone(session_entry_point) ? 0 : passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len12 = WASM_VECTOR_LEN;
        let ptr13 = 0;
        if (!isLikeNone(chunked_args)) {
            _assertClass(chunked_args, Bytes);
            ptr13 = chunked_args.__destroy_into_raw();
        }
        const ret = wasm.transactionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, isLikeNone(pricing_mode) ? 3 : pricing_mode, ptr7, len7, ptr8, len8, ptr9, len9, ptr10, len10, isLikeNone(standard_payment) ? 0xFFFFFF : standard_payment ? 1 : 0, ptr11, len11, ptr12, len12, ptr13, isLikeNone(min_bid_override) ? 0xFFFFFF : min_bid_override ? 1 : 0);
        this.__wbg_ptr = ret;
        TransactionStrParamsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} chain_name
     * @param {string | null} [initiator_addr]
     * @param {string | null} [secret_key]
     * @param {string | null} [ttl]
     * @returns {TransactionStrParams}
     */
    static new_with_defaults(chain_name, initiator_addr, secret_key, ttl) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(initiator_addr) ? 0 : passStringToWasm0(initiator_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.transactionstrparams_new_with_defaults(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        return TransactionStrParams.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get payment_amount() {
        const ret = wasm.transactionstrparams_payment_amount(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {PricingMode | undefined}
     */
    get pricing_mode() {
        const ret = wasm.transactionstrparams_pricing_mode(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @returns {string | undefined}
     */
    get receipt() {
        const ret = wasm.transactionstrparams_receipt(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get secret_key() {
        const ret = wasm.transactionstrparams_secret_key(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get session_args_json() {
        const ret = wasm.transactionstrparams_session_args_json(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {ArgsSimple | undefined}
     */
    get session_args_simple() {
        const ret = wasm.transactionstrparams_session_args_simple(this.__wbg_ptr);
        return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get session_entry_point() {
        const ret = wasm.transactionstrparams_session_entry_point(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    setDefaultTTL() {
        wasm.transactionstrparams_setDefaultTTL(this.__wbg_ptr);
    }
    setDefaultTimestamp() {
        wasm.transactionstrparams_setDefaultTimestamp(this.__wbg_ptr);
    }
    /**
     * @param {string} additional_computation_factor
     */
    set additional_computation_factor(additional_computation_factor) {
        const ptr0 = passStringToWasm0(additional_computation_factor, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_additional_computation_factor(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} chain_name
     */
    set chain_name(chain_name) {
        const ptr0 = passStringToWasm0(chain_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_chain_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Bytes} chunked_args
     */
    set chunked_args(chunked_args) {
        _assertClass(chunked_args, Bytes);
        var ptr0 = chunked_args.__destroy_into_raw();
        wasm.transactionstrparams_set_chunked_args(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} gas_price_tolerance
     */
    set gas_price_tolerance(gas_price_tolerance) {
        const ptr0 = passStringToWasm0(gas_price_tolerance, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_gas_price_tolerance(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} initiator_addr
     */
    set initiator_addr(initiator_addr) {
        const ptr0 = passStringToWasm0(initiator_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_initiator_addr(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} min_bid_override
     */
    set min_bid_override(min_bid_override) {
        wasm.transactionstrparams_set_min_bid_override(this.__wbg_ptr, min_bid_override);
    }
    /**
     * @param {string} payment_amount
     */
    set payment_amount(payment_amount) {
        const ptr0 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_payment_amount(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {PricingMode} pricing_mode
     */
    set pricing_mode(pricing_mode) {
        wasm.transactionstrparams_set_pricing_mode(this.__wbg_ptr, pricing_mode);
    }
    /**
     * @param {string} receipt
     */
    set receipt(receipt) {
        const ptr0 = passStringToWasm0(receipt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_receipt(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} secret_key
     */
    set secret_key(secret_key) {
        const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_secret_key(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_args_json
     */
    set session_args_json(session_args_json) {
        const ptr0 = passStringToWasm0(session_args_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_session_args_json(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string[]} session_args_simple
     */
    set session_args_simple(session_args_simple) {
        const ptr0 = passArrayJsValueToWasm0(session_args_simple, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_session_args_simple(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} session_entry_point
     */
    set session_entry_point(session_entry_point) {
        const ptr0 = passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_session_entry_point(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} standard_payment
     */
    set standard_payment(standard_payment) {
        wasm.transactionstrparams_set_standard_payment(this.__wbg_ptr, standard_payment);
    }
    /**
     * @param {string | null} [timestamp]
     */
    set timestamp(timestamp) {
        var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} transferred_value
     */
    set transferred_value(transferred_value) {
        const ptr0 = passStringToWasm0(transferred_value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_transferred_value(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [ttl]
     */
    set ttl(ttl) {
        var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.transactionstrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get standard_payment() {
        const ret = wasm.transactionstrparams_standard_payment(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get timestamp() {
        const ret = wasm.transactionstrparams_timestamp(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get transferred_value() {
        const ret = wasm.transactionstrparams_transferred_value(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get ttl() {
        const ret = wasm.transactionstrparams_ttl(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
}
if (Symbol.dispose) TransactionStrParams.prototype[Symbol.dispose] = TransactionStrParams.prototype.free;
exports.TransactionStrParams = TransactionStrParams;

class TransferAddr {
    static __wrap(ptr) {
        const obj = Object.create(TransferAddr.prototype);
        obj.__wbg_ptr = ptr;
        TransferAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferAddrFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferaddr_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transferaddr_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        TransferAddrFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferAddr.prototype[Symbol.dispose] = TransferAddr.prototype.free;
exports.TransferAddr = TransferAddr;

class TransferTarget {
    static __wrap(ptr) {
        const obj = Object.create(TransferTarget.prototype);
        obj.__wbg_ptr = ptr;
        TransferTargetFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferTargetFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transfertarget_free(ptr, 0);
    }
    /**
     * @param {TransferTargetKind} kind
     * @param {PublicKey | null} [public_key]
     * @param {AccountHash | null} [account_hash]
     * @param {URef | null} [uref]
     */
    constructor(kind, public_key, account_hash, uref) {
        let ptr0 = 0;
        if (!isLikeNone(public_key)) {
            _assertClass(public_key, PublicKey);
            ptr0 = public_key.__destroy_into_raw();
        }
        let ptr1 = 0;
        if (!isLikeNone(account_hash)) {
            _assertClass(account_hash, AccountHash);
            ptr1 = account_hash.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(uref)) {
            _assertClass(uref, URef);
            ptr2 = uref.__destroy_into_raw();
        }
        const ret = wasm.transfertarget_new(kind, ptr0, ptr1, ptr2);
        this.__wbg_ptr = ret;
        TransferTargetFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) TransferTarget.prototype[Symbol.dispose] = TransferTarget.prototype.free;
exports.TransferTarget = TransferTarget;

/**
 * @enum {0 | 1 | 2}
 */
const TransferTargetKind = Object.freeze({
    PublicKey: 0, "0": "PublicKey",
    AccountHash: 1, "1": "AccountHash",
    URef: 2, "2": "URef",
});
exports.TransferTargetKind = TransferTargetKind;

class URef {
    static __wrap(ptr) {
        const obj = Object.create(URef.prototype);
        obj.__wbg_ptr = ptr;
        URefFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        URefFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_uref_free(ptr, 0);
    }
    /**
     * @param {string} formatted_str
     * @returns {URef}
     */
    static fromFormattedStr(formatted_str) {
        const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.uref_fromFormattedStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return URef.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} bytes
     * @param {number} access_rights
     * @returns {URef}
     */
    static fromUint8Array(bytes, access_rights) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.uref_fromUint8Array(ptr0, len0, access_rights);
        return URef.__wrap(ret);
    }
    /**
     * @param {string} uref_hex_str
     * @param {number} access_rights
     */
    constructor(uref_hex_str, access_rights) {
        const ptr0 = passStringToWasm0(uref_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.uref_new_js_alias(ptr0, len0, access_rights);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        URefFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {string}
     */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.uref_toFormattedString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {any}
     */
    toJson() {
        const ret = wasm.uref_toJson(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) URef.prototype[Symbol.dispose] = URef.prototype.free;
exports.URef = URef;

class URefAddr {
    static __wrap(ptr) {
        const obj = Object.create(URefAddr.prototype);
        obj.__wbg_ptr = ptr;
        URefAddrFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        URefAddrFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_urefaddr_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.urefaddr_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        URefAddrFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) URefAddr.prototype[Symbol.dispose] = URefAddr.prototype.free;
exports.URefAddr = URefAddr;

/**
 * @enum {0 | 1 | 2}
 */
const Verbosity = Object.freeze({
    Low: 0, "0": "Low",
    Medium: 1, "1": "Medium",
    High: 2, "2": "High",
});
exports.Verbosity = Verbosity;

/**
 * Represents a success response containing a cost value.
 */
class Version2 {
    static __wrap(ptr) {
        const obj = Object.create(Version2.prototype);
        obj.__wbg_ptr = ptr;
        Version2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Version2Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_version2_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get consumed() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_version2_consumed(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get cost() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_version2_cost(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get error_message() {
        const ret = wasm.__wbg_get_version2_error_message(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {PublicKeyString}
     */
    get initiator() {
        const ret = wasm.__wbg_get_version2_initiator(this.__wbg_ptr);
        return PublicKeyString.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    get limit() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_version2_limit(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set consumed(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_version2_consumed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} arg0
     */
    set cost(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_version2_cost(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set error_message(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_version2_error_message(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {PublicKeyString} arg0
     */
    set initiator(arg0) {
        _assertClass(arg0, PublicKeyString);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_version2_initiator(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} arg0
     */
    set limit(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_version2_limit(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Version2.prototype[Symbol.dispose] = Version2.prototype.free;
exports.Version2 = Version2;

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
class Watcher {
    static __wrap(ptr) {
        const obj = Object.create(Watcher.prototype);
        obj.__wbg_ptr = ptr;
        WatcherFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WatcherFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_watcher_free(ptr, 0);
    }
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
     * @param {string} events_url
     * @param {bigint | null} [timeout_duration]
     */
    constructor(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.watcher_new(ptr0, len0, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? BigInt(0) : timeout_duration);
        this.__wbg_ptr = ret;
        WatcherFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Starts watching for transaction events (JavaScript-friendly).
     *
     * # Returns
     *
     * Result containing the serialized transaction events data or an error message.
     * @returns {Promise<any>}
     */
    start() {
        const ret = wasm.watcher_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * Stops watching for transaction events.
     *
     * This method sets the deploy watcher as inactive and stops the event listener if it exists.
     */
    stop() {
        wasm.watcher_stop(this.__wbg_ptr);
    }
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
     * @param {Subscription[]} subscriptions
     */
    subscribe(subscriptions) {
        const ptr0 = passArrayJsValueToWasm0(subscriptions, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.watcher_subscribe(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Unsubscribes from transaction events based on the provided transaction hash.
     *
     * # Arguments
     *
     * * `transaction_hash` - The transaction hash to unsubscribe.
     *
     * This method removes the deploy subscription associated with the provided transaction hash.
     * @param {string} target_hash
     */
    unsubscribe(target_hash) {
        const ptr0 = passStringToWasm0(target_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.watcher_unsubscribe(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Watcher.prototype[Symbol.dispose] = Watcher.prototype.free;
exports.Watcher = Watcher;

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
 * @param {string} formatted_account_hash
 * @returns {string}
 */
function accountHashToBase64Key(formatted_account_hash) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(formatted_account_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.accountHashToBase64Key(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}
exports.accountHashToBase64Key = accountHashToBase64Key;

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
function encodeLowerBlake2b(meta_data) {
    const ptr0 = passStringToWasm0(meta_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.encodeLowerBlake2b(ptr0, len0);
    return ret;
}
exports.encodeLowerBlake2b = encodeLowerBlake2b;

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
 * @returns {any}
 */
function generateSecretKey() {
    const ret = wasm.generateSecretKey();
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}
exports.generateSecretKey = generateSecretKey;

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
 * @returns {any}
 */
function generateSecretKey_secp256k1() {
    const ret = wasm.generateSecretKey_secp256k1();
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}
exports.generateSecretKey_secp256k1 = generateSecretKey_secp256k1;

class getAccountOptions {
    static __wrap(ptr) {
        const obj = Object.create(getAccountOptions.prototype);
        obj.__wbg_ptr = ptr;
        getAccountOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getAccountOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getaccountoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get account_identifier_as_string() {
        const ret = wasm.__wbg_get_getaccountoptions_account_identifier_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {AccountIdentifier | undefined}
     */
    get account_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_account_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : AccountIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_getaccountoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getaccountoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getaccountoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set account_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_account_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {AccountIdentifier | null} [arg0]
     */
    set account_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, AccountIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getaccountoptions_account_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getaccountoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getaccountoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getAccountOptions.prototype[Symbol.dispose] = getAccountOptions.prototype.free;
exports.getAccountOptions = getAccountOptions;

/**
 * Options for the `get_auction_info` method.
 */
class getAuctionInfoOptions {
    static __wrap(ptr) {
        const obj = Object.create(getAuctionInfoOptions.prototype);
        obj.__wbg_ptr = ptr;
        getAuctionInfoOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getAuctionInfoOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getauctioninfooptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_getauctioninfooptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getauctioninfooptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getauctioninfooptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getauctioninfooptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getauctioninfooptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getauctioninfooptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getauctioninfooptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getauctioninfooptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getAuctionInfoOptions.prototype[Symbol.dispose] = getAuctionInfoOptions.prototype.free;
exports.getAuctionInfoOptions = getAuctionInfoOptions;

/**
 * Options for the `get_balance` method.
 */
class getBalanceOptions {
    static __wrap(ptr) {
        const obj = Object.create(getBalanceOptions.prototype);
        obj.__wbg_ptr = ptr;
        getBalanceOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getBalanceOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getbalanceoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get purse_uref_as_string() {
        const ret = wasm.__wbg_get_getbalanceoptions_purse_uref_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {URef | undefined}
     */
    get purse_uref() {
        const ret = wasm.__wbg_get_getbalanceoptions_purse_uref(this.__wbg_ptr);
        return ret === 0 ? undefined : URef.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getbalanceoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get state_root_hash_as_string() {
        const ret = wasm.__wbg_get_getbalanceoptions_state_root_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Digest | undefined}
     */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getbalanceoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getbalanceoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set purse_uref_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_purse_uref_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {URef | null} [arg0]
     */
    set purse_uref(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, URef);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getbalanceoptions_purse_uref(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Digest | null} [arg0]
     */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getbalanceoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getbalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getBalanceOptions.prototype[Symbol.dispose] = getBalanceOptions.prototype.free;
exports.getBalanceOptions = getBalanceOptions;

/**
 * Options for the `get_block` method.
 */
class getBlockOptions {
    static __wrap(ptr) {
        const obj = Object.create(getBlockOptions.prototype);
        obj.__wbg_ptr = ptr;
        getBlockOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getBlockOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblockoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblockoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getblockoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getblockoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getblockoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getblockoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getBlockOptions.prototype[Symbol.dispose] = getBlockOptions.prototype.free;
exports.getBlockOptions = getBlockOptions;

/**
 * Options for the `get_block_transfers` method.
 */
class getBlockTransfersOptions {
    static __wrap(ptr) {
        const obj = Object.create(getBlockTransfersOptions.prototype);
        obj.__wbg_ptr = ptr;
        getBlockTransfersOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getBlockTransfersOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getblocktransfersoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_getblocktransfersoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblocktransfersoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getblocktransfersoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getblocktransfersoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblocktransfersoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getblocktransfersoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblocktransfersoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getblocktransfersoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getBlockTransfersOptions.prototype[Symbol.dispose] = getBlockTransfersOptions.prototype.free;
exports.getBlockTransfersOptions = getBlockTransfersOptions;

/**
 * Options for the `get_deploy` method.
 */
class getDeployOptions {
    static __wrap(ptr) {
        const obj = Object.create(getDeployOptions.prototype);
        obj.__wbg_ptr = ptr;
        getDeployOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getDeployOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdeployoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get deploy_hash_as_string() {
        const ret = wasm.__wbg_get_getdeployoptions_deploy_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {DeployHash | undefined}
     */
    get deploy_hash() {
        const ret = wasm.__wbg_get_getdeployoptions_deploy_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : DeployHash.__wrap(ret);
    }
    /**
     * @returns {boolean | undefined}
     */
    get finalized_approvals() {
        const ret = wasm.__wbg_get_getdeployoptions_finalized_approvals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getdeployoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getdeployoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set deploy_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_deploy_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {DeployHash | null} [arg0]
     */
    set deploy_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DeployHash);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdeployoptions_deploy_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set finalized_approvals(arg0) {
        wasm.__wbg_set_getdeployoptions_finalized_approvals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getDeployOptions.prototype[Symbol.dispose] = getDeployOptions.prototype.free;
exports.getDeployOptions = getDeployOptions;

/**
 * Options for the `get_dictionary_item` method.
 */
class getDictionaryItemOptions {
    static __wrap(ptr) {
        const obj = Object.create(getDictionaryItemOptions.prototype);
        obj.__wbg_ptr = ptr;
        getDictionaryItemOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getDictionaryItemOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getdictionaryitemoptions_free(ptr, 0);
    }
    /**
     * @returns {DictionaryItemIdentifier | undefined}
     */
    get dictionary_item_identifier() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
    }
    /**
     * @returns {DictionaryItemStrParams | undefined}
     */
    get dictionary_item_params() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get state_root_hash_as_string() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Digest | undefined}
     */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {DictionaryItemIdentifier | null} [arg0]
     */
    set dictionary_item_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {DictionaryItemStrParams | null} [arg0]
     */
    set dictionary_item_params(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemStrParams);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Digest | null} [arg0]
     */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getdictionaryitemoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getDictionaryItemOptions.prototype[Symbol.dispose] = getDictionaryItemOptions.prototype.free;
exports.getDictionaryItemOptions = getDictionaryItemOptions;

class getEntityOptions {
    static __wrap(ptr) {
        const obj = Object.create(getEntityOptions.prototype);
        obj.__wbg_ptr = ptr;
        getEntityOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getEntityOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getentityoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get entity_identifier_as_string() {
        const ret = wasm.__wbg_get_getentityoptions_entity_identifier_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {EntityIdentifier | undefined}
     */
    get entity_identifier() {
        const ret = wasm.__wbg_get_getentityoptions_entity_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : EntityIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_getentityoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getentityoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getentityoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getentityoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set entity_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getentityoptions_entity_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {EntityIdentifier | null} [arg0]
     */
    set entity_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, EntityIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getentityoptions_entity_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getentityoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getentityoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getentityoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getentityoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getEntityOptions.prototype[Symbol.dispose] = getEntityOptions.prototype.free;
exports.getEntityOptions = getEntityOptions;

class getEraInfoOptions {
    static __wrap(ptr) {
        const obj = Object.create(getEraInfoOptions.prototype);
        obj.__wbg_ptr = ptr;
        getEraInfoOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getEraInfoOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterainfooptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_geterainfooptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_geterainfooptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_geterainfooptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_geterainfooptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterainfooptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geterainfooptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterainfooptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_geterainfooptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getEraInfoOptions.prototype[Symbol.dispose] = getEraInfoOptions.prototype.free;
exports.getEraInfoOptions = getEraInfoOptions;

/**
 * Options for the `get_era_summary` method.
 */
class getEraSummaryOptions {
    static __wrap(ptr) {
        const obj = Object.create(getEraSummaryOptions.prototype);
        obj.__wbg_ptr = ptr;
        getEraSummaryOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getEraSummaryOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geterasummaryoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_geterasummaryoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_geterasummaryoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_geterasummaryoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_geterasummaryoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterasummaryoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geterasummaryoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geterasummaryoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_geterasummaryoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getEraSummaryOptions.prototype[Symbol.dispose] = getEraSummaryOptions.prototype.free;
exports.getEraSummaryOptions = getEraSummaryOptions;

/**
 * Options for speculative execution.
 */
class getSpeculativeExecDeployOptions {
    static __wrap(ptr) {
        const obj = Object.create(getSpeculativeExecDeployOptions.prototype);
        obj.__wbg_ptr = ptr;
        getSpeculativeExecDeployOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getSpeculativeExecDeployOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getspeculativeexecdeployoptions_free(ptr, 0);
    }
    /**
     * The deploy as a JSON string.
     * @returns {string | undefined}
     */
    get deploy_as_string() {
        const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_deploy_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * The deploy to execute.
     * @returns {Deploy | undefined}
     */
    get deploy() {
        const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_deploy(this.__wbg_ptr);
        return ret === 0 ? undefined : Deploy.__wrap(ret);
    }
    /**
     * The rpc address.
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * The verbosity level for logging.
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getspeculativeexecdeployoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * The deploy as a JSON string.
     * @param {string | null} [arg0]
     */
    set deploy_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecdeployoptions_deploy_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The deploy to execute.
     * @param {Deploy | null} [arg0]
     */
    set deploy(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Deploy);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexecdeployoptions_deploy(this.__wbg_ptr, ptr0);
    }
    /**
     * The rpc address.
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecdeployoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The verbosity level for logging.
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getspeculativeexecdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getSpeculativeExecDeployOptions.prototype[Symbol.dispose] = getSpeculativeExecDeployOptions.prototype.free;
exports.getSpeculativeExecDeployOptions = getSpeculativeExecDeployOptions;

/**
 * Options for speculative execution.
 */
class getSpeculativeExecTxnOptions {
    static __wrap(ptr) {
        const obj = Object.create(getSpeculativeExecTxnOptions.prototype);
        obj.__wbg_ptr = ptr;
        getSpeculativeExecTxnOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getSpeculativeExecTxnOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getspeculativeexectxnoptions_free(ptr, 0);
    }
    /**
     * The rpc address.
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getspeculativeexectxnoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * The transaction as a JSON string.
     * @returns {string | undefined}
     */
    get transaction_as_string() {
        const ret = wasm.__wbg_get_getspeculativeexectxnoptions_transaction_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * The transaction to execute.
     * @returns {Transaction | undefined}
     */
    get transaction() {
        const ret = wasm.__wbg_get_getspeculativeexectxnoptions_transaction(this.__wbg_ptr);
        return ret === 0 ? undefined : Transaction.__wrap(ret);
    }
    /**
     * The verbosity level for logging.
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getspeculativeexectxnoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * The rpc address.
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexectxnoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The transaction as a JSON string.
     * @param {string | null} [arg0]
     */
    set transaction_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexectxnoptions_transaction_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * The transaction to execute.
     * @param {Transaction | null} [arg0]
     */
    set transaction(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Transaction);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexectxnoptions_transaction(this.__wbg_ptr, ptr0);
    }
    /**
     * The verbosity level for logging.
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getspeculativeexectxnoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getSpeculativeExecTxnOptions.prototype[Symbol.dispose] = getSpeculativeExecTxnOptions.prototype.free;
exports.getSpeculativeExecTxnOptions = getSpeculativeExecTxnOptions;

/**
 * Options for the `get_state_root_hash` method.
 */
class getStateRootHashOptions {
    static __wrap(ptr) {
        const obj = Object.create(getStateRootHashOptions.prototype);
        obj.__wbg_ptr = ptr;
        getStateRootHashOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getStateRootHashOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getstateroothashoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_getstateroothashoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getstateroothashoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_getstateroothashoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_getstateroothashoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getstateroothashoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getstateroothashoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getstateroothashoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_getstateroothashoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getStateRootHashOptions.prototype[Symbol.dispose] = getStateRootHashOptions.prototype.free;
exports.getStateRootHashOptions = getStateRootHashOptions;

/**
 * Gets the current timestamp.
 *
 * # Returns
 *
 * A JsValue containing the current timestamp.
 * @returns {any}
 */
function getTimestamp() {
    const ret = wasm.getTimestamp();
    return ret;
}
exports.getTimestamp = getTimestamp;

/**
 * Options for the `get_transaction` method.
 */
class getTransactionOptions {
    static __wrap(ptr) {
        const obj = Object.create(getTransactionOptions.prototype);
        obj.__wbg_ptr = ptr;
        getTransactionOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getTransactionOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gettransactionoptions_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get finalized_approvals() {
        const ret = wasm.__wbg_get_gettransactionoptions_finalized_approvals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_gettransactionoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get transaction_hash_as_string() {
        const ret = wasm.__wbg_get_gettransactionoptions_transaction_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {TransactionHash | undefined}
     */
    get transaction_hash() {
        const ret = wasm.__wbg_get_gettransactionoptions_transaction_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : TransactionHash.__wrap(ret);
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_gettransactionoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set finalized_approvals(arg0) {
        wasm.__wbg_set_gettransactionoptions_finalized_approvals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_gettransactionoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set transaction_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_gettransactionoptions_transaction_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {TransactionHash | null} [arg0]
     */
    set transaction_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransactionHash);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_gettransactionoptions_transaction_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_gettransactionoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) getTransactionOptions.prototype[Symbol.dispose] = getTransactionOptions.prototype.free;
exports.getTransactionOptions = getTransactionOptions;

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
function hexToString(hex_string) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hexToString(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}
exports.hexToString = hexToString;

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
function hexToUint8Array(hex_string) {
    const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.hexToUint8Array(ptr0, len0);
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
}
exports.hexToUint8Array = hexToUint8Array;

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
 * @param {Verbosity | null} [verbosity]
 * @returns {any}
 */
function jsonPrettyPrint(value, verbosity) {
    const ret = wasm.jsonPrettyPrint(value, isLikeNone(verbosity) ? 3 : verbosity);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}
exports.jsonPrettyPrint = jsonPrettyPrint;

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
 * @param {string} formatted_key_hash
 * @returns {string}
 */
function keyHashToBase64Key(formatted_key_hash) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(formatted_key_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keyHashToBase64Key(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}
exports.keyHashToBase64Key = keyHashToBase64Key;

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
function makeDictionaryItemKey(key, value) {
    let deferred3_0;
    let deferred3_1;
    try {
        _assertClass(key, Key);
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.makeDictionaryItemKey(key.__wbg_ptr, ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}
exports.makeDictionaryItemKey = makeDictionaryItemKey;

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
function motesToCSPR(motes) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(motes, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.motesToCSPR(ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}
exports.motesToCSPR = motesToCSPR;

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
 * @param {string} secret_key
 * @returns {any}
 */
function publicKeyFromSecretKey(secret_key) {
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.publicKeyFromSecretKey(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}
exports.publicKeyFromSecretKey = publicKeyFromSecretKey;

/**
 * Options for the `query_balance` method.
 */
class queryBalanceDetailsOptions {
    static __wrap(ptr) {
        const obj = Object.create(queryBalanceDetailsOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryBalanceDetailsOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryBalanceDetailsOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalancedetailsoptions_free(ptr, 0);
    }
    /**
     * @returns {GlobalStateIdentifier | undefined}
     */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get purse_identifier_as_string() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_purse_identifier_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {PurseIdentifier | undefined}
     */
    get purse_identifier() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_purse_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : PurseIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get state_root_hash_as_string() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_state_root_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Digest | undefined}
     */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_querybalancedetailsoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {GlobalStateIdentifier | null} [arg0]
     */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalancedetailsoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set purse_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_purse_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {PurseIdentifier | null} [arg0]
     */
    set purse_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PurseIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalancedetailsoptions_purse_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalancedetailsoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Digest | null} [arg0]
     */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalancedetailsoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_querybalancedetailsoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) queryBalanceDetailsOptions.prototype[Symbol.dispose] = queryBalanceDetailsOptions.prototype.free;
exports.queryBalanceDetailsOptions = queryBalanceDetailsOptions;

/**
 * Options for the `query_balance` method.
 */
class queryBalanceOptions {
    static __wrap(ptr) {
        const obj = Object.create(queryBalanceOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryBalanceOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryBalanceOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querybalanceoptions_free(ptr, 0);
    }
    /**
     * @returns {GlobalStateIdentifier | undefined}
     */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_querybalanceoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_querybalanceoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get purse_identifier_as_string() {
        const ret = wasm.__wbg_get_querybalanceoptions_purse_identifier_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {PurseIdentifier | undefined}
     */
    get purse_identifier() {
        const ret = wasm.__wbg_get_querybalanceoptions_purse_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : PurseIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_querybalanceoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get state_root_hash_as_string() {
        const ret = wasm.__wbg_get_querybalanceoptions_state_root_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Digest | undefined}
     */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querybalanceoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_querybalanceoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {GlobalStateIdentifier | null} [arg0]
     */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalanceoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set purse_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_purse_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {PurseIdentifier | null} [arg0]
     */
    set purse_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PurseIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalanceoptions_purse_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Digest | null} [arg0]
     */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querybalanceoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_querybalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) queryBalanceOptions.prototype[Symbol.dispose] = queryBalanceOptions.prototype.free;
exports.queryBalanceOptions = queryBalanceOptions;

class queryContractDictOptions {
    static __wrap(ptr) {
        const obj = Object.create(queryContractDictOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryContractDictOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryContractDictOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querycontractdictoptions_free(ptr, 0);
    }
    /**
     * @returns {DictionaryItemIdentifier | undefined}
     */
    get dictionary_item_identifier() {
        const ret = wasm.__wbg_get_querycontractdictoptions_dictionary_item_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
    }
    /**
     * @returns {DictionaryItemStrParams | undefined}
     */
    get dictionary_item_params() {
        const ret = wasm.__wbg_get_querycontractdictoptions_dictionary_item_params(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_querycontractdictoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get state_root_hash_as_string() {
        const ret = wasm.__wbg_get_querycontractdictoptions_state_root_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Digest | undefined}
     */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querycontractdictoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_querycontractdictoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {DictionaryItemIdentifier | null} [arg0]
     */
    set dictionary_item_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractdictoptions_dictionary_item_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {DictionaryItemStrParams | null} [arg0]
     */
    set dictionary_item_params(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DictionaryItemStrParams);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractdictoptions_dictionary_item_params(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractdictoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractdictoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Digest | null} [arg0]
     */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractdictoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_querycontractdictoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) queryContractDictOptions.prototype[Symbol.dispose] = queryContractDictOptions.prototype.free;
exports.queryContractDictOptions = queryContractDictOptions;

class queryContractKeyOptions {
    static __wrap(ptr) {
        const obj = Object.create(queryContractKeyOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryContractKeyOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryContractKeyOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_querycontractkeyoptions_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get entity_identifier_as_string() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_entity_identifier_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {EntityIdentifier | undefined}
     */
    get entity_identifier() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_entity_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : EntityIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {BlockIdentifier | undefined}
     */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get path_as_string() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_path_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Path | undefined}
     */
    get path() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_path(this.__wbg_ptr);
        return ret === 0 ? undefined : Path.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {string | null} [arg0]
     */
    set entity_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_entity_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {EntityIdentifier | null} [arg0]
     */
    set entity_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, EntityIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_entity_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {BlockIdentifier | null} [arg0]
     */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set path_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Path | null} [arg0]
     */
    set path(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Path);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_path(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_querycontractkeyoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) queryContractKeyOptions.prototype[Symbol.dispose] = queryContractKeyOptions.prototype.free;
exports.queryContractKeyOptions = queryContractKeyOptions;

/**
 * Options for the `query_global_state` method.
 */
class queryGlobalStateOptions {
    static __wrap(ptr) {
        const obj = Object.create(queryGlobalStateOptions.prototype);
        obj.__wbg_ptr = ptr;
        queryGlobalStateOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        queryGlobalStateOptionsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_queryglobalstateoptions_free(ptr, 0);
    }
    /**
     * @returns {GlobalStateIdentifier | undefined}
     */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get key_as_string() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_key_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Key | undefined}
     */
    get key() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_key(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get maybe_block_id_as_string() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_maybe_block_id_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get path_as_string() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_path_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Path | undefined}
     */
    get path() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_path(this.__wbg_ptr);
        return ret === 0 ? undefined : Path.__wrap(ret);
    }
    /**
     * @returns {string | undefined}
     */
    get rpc_address() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_rpc_address(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {string | undefined}
     */
    get state_root_hash_as_string() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_state_root_hash_as_string(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Digest | undefined}
     */
    get state_root_hash() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
     * @returns {Verbosity | undefined}
     */
    get verbosity() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
     * @param {GlobalStateIdentifier | null} [arg0]
     */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set key_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_key_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Key | null} [arg0]
     */
    set key(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Key);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_key(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set path_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Path | null} [arg0]
     */
    set path(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Path);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_path(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set rpc_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_rpc_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [arg0]
     */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Digest | null} [arg0]
     */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_queryglobalstateoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Verbosity | null} [arg0]
     */
    set verbosity(arg0) {
        wasm.__wbg_set_queryglobalstateoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
if (Symbol.dispose) queryGlobalStateOptions.prototype[Symbol.dispose] = queryGlobalStateOptions.prototype.free;
exports.queryGlobalStateOptions = queryGlobalStateOptions;

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
function uint8ArrayToBytes(uint8_array) {
    const ret = wasm.uint8ArrayToBytes(uint8_array);
    return Bytes.__wrap(ret);
}
exports.uint8ArrayToBytes = uint8ArrayToBytes;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_CasperWalletProvider_f530469ddf0d38f5: function() {
            const ret = CasperWalletProvider();
            return ret;
        },
        __wbg_Error_ef53bc310eb298a0: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_boolean_get_1a45e2c38d4d41b9: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_0accd80f45e5faa2: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_is_function_754e9f305ff6029e: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_87c3bfe968c6a5ad: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_object_56732c2bc353f41d: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_c236cabd84a4d769: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_67b456be8673d3d7: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_1068e624fa87f6ab: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_9bb1761122181af2: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_72bdf95d3ae505b1: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_1506f2235d1bdba0: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_61db23ac97f16c31: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_abort_2ec46222bf378517: function(arg0) {
            arg0.abort();
        },
        __wbg_abort_b29d719932441c95: function(arg0, arg1) {
            arg0.abort(arg1);
        },
        __wbg_append_e1746995edcb0170: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_apply_292b6d94e4f92b15: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.apply(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_arrayBuffer_05927079aabe6d46: function() { return handleError(function (arg0) {
            const ret = arg0.arrayBuffer();
            return ret;
        }, arguments); },
        __wbg_body_61a0827da5b6d2bc: function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_buffer_d370c8cae5692933: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_byobRequest_2c89fb4ab478fa09: function(arg0) {
            const ret = arg0.byobRequest;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_byteLength_2c6dc3b4b85d3547: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteOffset_349aa9bf0a183eca: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_call_8a89609d89f6608a: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_9c758de292015997: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_cancel_3dedc1c2245a59d4: function(arg0) {
            const ret = arg0.cancel();
            return ret;
        },
        __wbg_catch_17ae9c6dfb88ad8a: function(arg0, arg1) {
            const ret = arg0.catch(arg1);
            return ret;
        },
        __wbg_clearTimeout_6b8d9a38b9263d65: function(arg0) {
            const ret = clearTimeout(arg0);
            return ret;
        },
        __wbg_close_4859304bbf0f8208: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_6f12196fe155e8d2: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_9acc00cbca310439: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_crypto_38df2bab126b63dc: function(arg0) {
            const ret = arg0.crypto;
            return ret;
        },
        __wbg_data_bd354b70c783c66e: function(arg0) {
            const ret = arg0.data;
            return ret;
        },
        __wbg_deploy_new: function(arg0) {
            const ret = Deploy.__wrap(arg0);
            return ret;
        },
        __wbg_disconnectFromSite_b5c78e940e76ce4a: function() { return handleError(function (arg0) {
            const ret = arg0.disconnectFromSite();
            return ret;
        }, arguments); },
        __wbg_done_60cf307fcc680536: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_enqueue_09035479e2081625: function() { return handleError(function (arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments); },
        __wbg_error_b1ac7bd2c338af0f: function(arg0, arg1) {
            console.error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_eval_35600f795897d127: function() { return handleError(function (arg0, arg1) {
            const ret = eval(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_fetch_344c8d3849002659: function(arg0, arg1) {
            const ret = arg0.fetch(arg1);
            return ret;
        },
        __wbg_fetch_9dad4fe911207b37: function(arg0) {
            const ret = fetch(arg0);
            return ret;
        },
        __wbg_getActivePublicKey_ffe368ffda41af08: function() { return handleError(function (arg0) {
            const ret = arg0.getActivePublicKey();
            return ret;
        }, arguments); },
        __wbg_getRandomValues_3f44b700395062e5: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getRandomValues_c44a50d8cfdaebeb: function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments); },
        __wbg_getReader_b4b1868fbca77dbe: function() { return handleError(function (arg0) {
            const ret = arg0.getReader();
            return ret;
        }, arguments); },
        __wbg_getTime_00b3f7db575e4ef5: function(arg0) {
            const ret = arg0.getTime();
            return ret;
        },
        __wbg_getVersion_c3d69646cb59f15a: function() { return handleError(function (arg0) {
            const ret = arg0.getVersion();
            return ret;
        }, arguments); },
        __wbg_get_1f8f054ddbaa7db2: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_2b48c7d0d006a781: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_de6a0f7d4d18a304: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_done_ea9eb315d4ec1e81: function(arg0) {
            const ret = arg0.done;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_index_ab123d64c89e3156: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_unchecked_33f6e5c9e2f2d6b2: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_value_c68fe2e1a76c69ca: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_getaccountresult_new: function(arg0) {
            const ret = GetAccountResult.__wrap(arg0);
            return ret;
        },
        __wbg_getaddressableentityresult_new: function(arg0) {
            const ret = GetAddressableEntityResult.__wrap(arg0);
            return ret;
        },
        __wbg_getauctioninforesult_new: function(arg0) {
            const ret = GetAuctionInfoResult.__wrap(arg0);
            return ret;
        },
        __wbg_getbalanceresult_new: function(arg0) {
            const ret = GetBalanceResult.__wrap(arg0);
            return ret;
        },
        __wbg_getblockresult_new: function(arg0) {
            const ret = GetBlockResult.__wrap(arg0);
            return ret;
        },
        __wbg_getblocktransfersresult_new: function(arg0) {
            const ret = GetBlockTransfersResult.__wrap(arg0);
            return ret;
        },
        __wbg_getchainspecresult_new: function(arg0) {
            const ret = GetChainspecResult.__wrap(arg0);
            return ret;
        },
        __wbg_getdeployresult_new: function(arg0) {
            const ret = GetDeployResult.__wrap(arg0);
            return ret;
        },
        __wbg_getdictionaryitemresult_new: function(arg0) {
            const ret = GetDictionaryItemResult.__wrap(arg0);
            return ret;
        },
        __wbg_geterainforesult_new: function(arg0) {
            const ret = GetEraInfoResult.__wrap(arg0);
            return ret;
        },
        __wbg_geterasummaryresult_new: function(arg0) {
            const ret = GetEraSummaryResult.__wrap(arg0);
            return ret;
        },
        __wbg_getnodestatusresult_new: function(arg0) {
            const ret = GetNodeStatusResult.__wrap(arg0);
            return ret;
        },
        __wbg_getpeersresult_new: function(arg0) {
            const ret = GetPeersResult.__wrap(arg0);
            return ret;
        },
        __wbg_getstateroothashresult_new: function(arg0) {
            const ret = GetStateRootHashResult.__wrap(arg0);
            return ret;
        },
        __wbg_gettransactionresult_new: function(arg0) {
            const ret = GetTransactionResult.__wrap(arg0);
            return ret;
        },
        __wbg_getvalidatorchangesresult_new: function(arg0) {
            const ret = GetValidatorChangesResult.__wrap(arg0);
            return ret;
        },
        __wbg_has_73740b27f436fed3: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_headers_0feb63d2d374b44a: function(arg0) {
            const ret = arg0.headers;
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_8f49811467741499: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Blob_f6321ce92d2740fd: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Blob;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Object_873c13f9f41aec78: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Object;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Promise_d0db99486956c8e8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Promise;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_cb984bd66d7bd408: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_67c2c9c4313f4448: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isConnected_af6af3e723449e09: function() { return handleError(function (arg0) {
            const ret = arg0.isConnected();
            return ret;
        }, arguments); },
        __wbg_iterator_8732428d309e270e: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_length_4a591ecaa01354d9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_66f1a4b2e9026940: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_listrpcsresult_new: function(arg0) {
            const ret = ListRpcsResult.__wrap(arg0);
            return ret;
        },
        __wbg_log_1acadced1cea2119: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_log_fae8bdb68293977f: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_messages_new: function(arg0) {
            const ret = Messages.__wrap(arg0);
            return ret;
        },
        __wbg_messages_unwrap: function(arg0) {
            const ret = Messages.__unwrap(arg0);
            return ret;
        },
        __wbg_msCrypto_bd5a034af96bcba6: function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        },
        __wbg_new_0_445c13a750296eb6: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_0d09705104e164af: function() { return handleError(function () {
            const ret = new AbortController();
            return ret;
        }, arguments); },
        __wbg_new_50bb5ebeecef71a8: function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_578aeef4b6b94378: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_6114450be2525299: function() { return handleError(function () {
            const ret = new FileReader();
            return ret;
        }, arguments); },
        __wbg_new_b682b81e8eaaf027: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined_______true_(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_ce1ab61c1c2b300d: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_d7e476b433a26bea: function() { return handleError(function (arg0, arg1) {
            const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_d90091b82fdf5b91: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_e436d06bc8e77460: function() { return handleError(function () {
            const ret = new Headers();
            return ret;
        }, arguments); },
        __wbg_new_from_slice_18fa1f71286d66b8: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_typed_bf31d18f92484486: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined_______true_(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_byte_offset_and_length_d836f26d916dd9ad: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_length_36a4998e27b014c5: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_str_and_init_bcd02b79a793d27f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_next_9e03acdf51c4960d: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_next_eb8ca7351fa27906: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_node_84ea875411254db1: function(arg0) {
            const ret = arg0.node;
            return ret;
        },
        __wbg_parse_03863847d06c4e89: function() { return handleError(function (arg0, arg1) {
            const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_process_44c7a14e11e9f69e: function(arg0) {
            const ret = arg0.process;
            return ret;
        },
        __wbg_prototypesetcall_3249fc62a0fafa30: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_push_a6822215aa43e71c: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_putdeployresult_new: function(arg0) {
            const ret = PutDeployResult.__wrap(arg0);
            return ret;
        },
        __wbg_puttransactionresult_new: function(arg0) {
            const ret = PutTransactionResult.__wrap(arg0);
            return ret;
        },
        __wbg_querybalancedetailsresult_new: function(arg0) {
            const ret = QueryBalanceDetailsResult.__wrap(arg0);
            return ret;
        },
        __wbg_querybalanceresult_new: function(arg0) {
            const ret = QueryBalanceResult.__wrap(arg0);
            return ret;
        },
        __wbg_queryglobalstateresult_new: function(arg0) {
            const ret = QueryGlobalStateResult.__wrap(arg0);
            return ret;
        },
        __wbg_queueMicrotask_35c611f4a14830b2: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queueMicrotask_404ed0a58e0b63cc: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_randomFillSync_6c25eac9869eb53c: function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments); },
        __wbg_readAsArrayBuffer_dcc71a4ed6cdcf06: function() { return handleError(function (arg0, arg1) {
            arg0.readAsArrayBuffer(arg1);
        }, arguments); },
        __wbg_read_282e152a24fd0856: function(arg0) {
            const ret = arg0.read();
            return ret;
        },
        __wbg_readyState_490503c1fa8f8dd6: function(arg0) {
            const ret = arg0.readyState;
            return ret;
        },
        __wbg_releaseLock_cd76770b7f82a961: function(arg0) {
            arg0.releaseLock();
        },
        __wbg_requestConnection_caca08804ac756d6: function() { return handleError(function (arg0) {
            const ret = arg0.requestConnection();
            return ret;
        }, arguments); },
        __wbg_requestSwitchAccount_0ed59402fd15e03a: function() { return handleError(function (arg0) {
            const ret = arg0.requestSwitchAccount();
            return ret;
        }, arguments); },
        __wbg_require_b4edbdcf3e2a1ef0: function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments); },
        __wbg_resolve_25a7e548d5881dca: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_respond_33b6f330b6d299fd: function() { return handleError(function (arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments); },
        __wbg_result_2804124b89ae22a3: function() { return handleError(function (arg0) {
            const ret = arg0.result;
            return ret;
        }, arguments); },
        __wbg_setTimeout_f757f00851f76c42: function(arg0, arg1) {
            const ret = setTimeout(arg0, arg1);
            return ret;
        },
        __wbg_set_29c99a8aac1c01e5: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_body_36614c7e61546809: function(arg0, arg1) {
            arg0.body = arg1;
        },
        __wbg_set_cache_488ea16c11cbf20d: function(arg0, arg1) {
            arg0.cache = __wbindgen_enum_RequestCache[arg1];
        },
        __wbg_set_credentials_fa9c491a27c4bdf0: function(arg0, arg1) {
            arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
        },
        __wbg_set_headers_7c1e39ece7826bec: function(arg0, arg1) {
            arg0.headers = arg1;
        },
        __wbg_set_method_7a6811dec7a4feff: function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_mode_c90e3667002857d4: function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_RequestMode[arg1];
        },
        __wbg_set_onclose_13787fb31ae8aefd: function(arg0, arg1) {
            arg0.onclose = arg1;
        },
        __wbg_set_onerror_5a45265839edf1b1: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onload_c8366a4de7e51593: function(arg0, arg1) {
            arg0.onload = arg1;
        },
        __wbg_set_onmessage_9c6b4cb14e244b7f: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onopen_db452f4233e99d7d: function(arg0, arg1) {
            arg0.onopen = arg1;
        },
        __wbg_set_signal_d9da62b3f215c821: function(arg0, arg1) {
            arg0.signal = arg1;
        },
        __wbg_signMessage_507965b3c6eb409d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.signMessage(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_sign_fb99fc956d85b206: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.sign(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_signal_e03304a84df9ed09: function(arg0) {
            const ret = arg0.signal;
            return ret;
        },
        __wbg_slice_765bd2e8494bd9b4: function(arg0, arg1) {
            const ret = arg1.slice();
            const ptr1 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_speculativeexecresult_new: function(arg0) {
            const ret = SpeculativeExecResult.__wrap(arg0);
            return ret;
        },
        __wbg_speculativeexectxnresult_new: function(arg0) {
            const ret = SpeculativeExecTxnResult.__wrap(arg0);
            return ret;
        },
        __wbg_static_accessor_GLOBAL_9d53f2689e622ca1: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_a1a35cec07001a8a: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_4c59f6c7ea29a144: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_e70ae9f2eb052253: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_status_00549d55b78d949e: function(arg0) {
            const ret = arg0.status;
            return ret;
        },
        __wbg_stringify_8286df6dcc591521: function() { return handleError(function (arg0) {
            const ret = JSON.stringify(arg0);
            return ret;
        }, arguments); },
        __wbg_subarray_4aa221f6a4f5ab22: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subscription_unwrap: function(arg0) {
            const ret = Subscription.__unwrap(arg0);
            return ret;
        },
        __wbg_then_18f476d590e58992: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_ac7b025999b52837: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_transaction_new: function(arg0) {
            const ret = Transaction.__wrap(arg0);
            return ret;
        },
        __wbg_url_6808f1c468f2d0cd: function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_url_8b9d120d9dc02d8f: function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_f3625092ee4b37f4: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_versions_276b2795b1c6a219: function(arg0) {
            const ret = arg0.versions;
            return ret;
        },
        __wbg_view_d523e3b92648b62c: function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1063, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true_);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1290, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__1_);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1839, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue__core_1f2aeb10b02743db___result__Result_____wasm_bindgen_b51ba37c0b261151___JsError___true_);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 1063, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__3);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("ProgressEvent")], shim_idx: 1063, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__4);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1212, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke_______true_);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./casper_rust_wasm_sdk_bg.js": import0,
    };
}

function wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke_______true_(arg0, arg1) {
    wasm.wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke_______true_(arg0, arg1);
}

function wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true_(arg0, arg1, arg2);
}

function wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__1_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__1_(arg0, arg1, arg2);
}

function wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__3(arg0, arg1, arg2) {
    wasm.wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__3(arg0, arg1, arg2);
}

function wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__4(arg0, arg1, arg2) {
    wasm.wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue______true__4(arg0, arg1, arg2);
}

function wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue__core_1f2aeb10b02743db___result__Result_____wasm_bindgen_b51ba37c0b261151___JsError___true_(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___wasm_bindgen_b51ba37c0b261151___JsValue__core_1f2aeb10b02743db___result__Result_____wasm_bindgen_b51ba37c0b261151___JsError___true_(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined_______true_(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen_b51ba37c0b261151___convert__closures_____invoke___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined___js_sys_cb43ef41b575e181___Function_fn_wasm_bindgen_b51ba37c0b261151___JsValue_____wasm_bindgen_b51ba37c0b261151___sys__Undefined_______true_(arg0, arg1, arg2, arg3);
}


const __wbindgen_enum_ReadableStreamType = ["bytes"];


const __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];


const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];


const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
const AccessRightsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accessrights_free(ptr, 1));
const AccountHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accounthash_free(ptr, 1));
const AccountIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accountidentifier_free(ptr, 1));
const AddressableEntityHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_addressableentityhash_free(ptr, 1));
const ArgsSimpleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_argssimple_free(ptr, 1));
const BlockHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blockhash_free(ptr, 1));
const BlockIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blockidentifier_free(ptr, 1));
const BodyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_body_free(ptr, 1));
const BytesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bytes_free(ptr, 1));
const CasperWalletFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_casperwallet_free(ptr, 1));
const ContractHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_contracthash_free(ptr, 1));
const ContractPackageHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_contractpackagehash_free(ptr, 1));
const DeployFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploy_free(ptr, 1));
const DeployHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deployhash_free(ptr, 1));
const DeployStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploystrparams_free(ptr, 1));
const DictionaryAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryaddr_free(ptr, 1));
const DictionaryItemIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemidentifier_free(ptr, 1));
const DictionaryItemStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemstrparams_free(ptr, 1));
const DigestFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_digest_free(ptr, 1));
const EntityAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_entityaddr_free(ptr, 1));
const EntityIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_entityidentifier_free(ptr, 1));
const EraIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_eraid_free(ptr, 1));
const EventParseResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_eventparseresult_free(ptr, 1));
const ExecutionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_executionresult_free(ptr, 1));
const FailureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_failure_free(ptr, 1));
const GetAccountResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaccountresult_free(ptr, 1));
const GetAddressableEntityResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaddressableentityresult_free(ptr, 1));
const GetAuctionInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninforesult_free(ptr, 1));
const GetBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceresult_free(ptr, 1));
const GetBlockResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblockresult_free(ptr, 1));
const GetBlockTransfersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersresult_free(ptr, 1));
const GetChainspecResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getchainspecresult_free(ptr, 1));
const GetDeployResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdeployresult_free(ptr, 1));
const GetDictionaryItemResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemresult_free(ptr, 1));
const GetEraInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterainforesult_free(ptr, 1));
const GetEraSummaryResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryresult_free(ptr, 1));
const GetNodeStatusResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getnodestatusresult_free(ptr, 1));
const GetPeersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getpeersresult_free(ptr, 1));
const GetStateRootHashResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashresult_free(ptr, 1));
const GetTransactionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gettransactionresult_free(ptr, 1));
const GetValidatorChangesResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getvalidatorchangesresult_free(ptr, 1));
const GlobalStateIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_globalstateidentifier_free(ptr, 1));
const HashAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashaddr_free(ptr, 1));
const HashStringFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashstring_free(ptr, 1));
const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr, 1));
const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr, 1));
const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr, 1));
const KeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_key_free(ptr, 1));
const ListRpcsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_listrpcsresult_free(ptr, 1));
const MessageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_message_free(ptr, 1));
const MessagesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_messages_free(ptr, 1));
const PackageHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_packagehash_free(ptr, 1));
const PathFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_path_free(ptr, 1));
const PaymentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_payment_free(ptr, 1));
const PaymentStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_paymentstrparams_free(ptr, 1));
const PeerEntryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_peerentry_free(ptr, 1));
const PublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickey_free(ptr, 1));
const PublicKeyStringFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickeystring_free(ptr, 1));
const PurseIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_purseidentifier_free(ptr, 1));
const PutDeployResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_putdeployresult_free(ptr, 1));
const PutTransactionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_puttransactionresult_free(ptr, 1));
const QueryBalanceDetailsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalancedetailsresult_free(ptr, 1));
const QueryBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceresult_free(ptr, 1));
const QueryGlobalStateResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateresult_free(ptr, 1));
const RecordIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_recordid_free(ptr, 1));
const SDKFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sdk_free(ptr, 1));
const SessionStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sessionstrparams_free(ptr, 1));
const SignatureResponseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signatureresponse_free(ptr, 1));
const SpeculativeExecResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_speculativeexecresult_free(ptr, 1));
const SpeculativeExecTxnResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_speculativeexectxnresult_free(ptr, 1));
const SubscriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_subscription_free(ptr, 1));
const TransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transaction_free(ptr, 1));
const TransactionBuilderParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionbuilderparams_free(ptr, 1));
const TransactionHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionhash_free(ptr, 1));
const TransactionProcessedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionprocessed_free(ptr, 1));
const TransactionStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionstrparams_free(ptr, 1));
const TransferAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferaddr_free(ptr, 1));
const TransferTargetFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transfertarget_free(ptr, 1));
const URefFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_uref_free(ptr, 1));
const URefAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_urefaddr_free(ptr, 1));
const Version2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_version2_free(ptr, 1));
const WatcherFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_watcher_free(ptr, 1));
const getAccountOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaccountoptions_free(ptr, 1));
const getAuctionInfoOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninfooptions_free(ptr, 1));
const getBalanceOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceoptions_free(ptr, 1));
const getBlockOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblockoptions_free(ptr, 1));
const getBlockTransfersOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersoptions_free(ptr, 1));
const getDeployOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdeployoptions_free(ptr, 1));
const getDictionaryItemOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemoptions_free(ptr, 1));
const getEntityOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getentityoptions_free(ptr, 1));
const getEraInfoOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterainfooptions_free(ptr, 1));
const getEraSummaryOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryoptions_free(ptr, 1));
const getSpeculativeExecDeployOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getspeculativeexecdeployoptions_free(ptr, 1));
const getSpeculativeExecTxnOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getspeculativeexectxnoptions_free(ptr, 1));
const getStateRootHashOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashoptions_free(ptr, 1));
const getTransactionOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gettransactionoptions_free(ptr, 1));
const queryBalanceDetailsOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalancedetailsoptions_free(ptr, 1));
const queryBalanceOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceoptions_free(ptr, 1));
const queryContractDictOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querycontractdictoptions_free(ptr, 1));
const queryContractKeyOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querycontractkeyoptions_free(ptr, 1));
const queryGlobalStateOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateoptions_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
function decodeText(ptr, len) {
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

const wasmPath = `${__dirname}/casper_rust_wasm_sdk_bg.wasm`;
const wasmBytes = require('fs').readFileSync(wasmPath);
const wasmModule = new WebAssembly.Module(wasmBytes);
let wasmInstance = new WebAssembly.Instance(wasmModule, __wbg_get_imports());
let wasm = wasmInstance.exports;
wasm.__wbindgen_start();
