let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextEncoder, TextDecoder } = require(`util`);

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

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
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

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
    if (builtInMatches.length > 1) {
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

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
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
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1_mut__h23fc3b35db167f91(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_35(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h950a3df6e852f9c6(arg0, arg1, addHeapObject(arg2));
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
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
* @param {string} hex_string
* @returns {string}
*/
module.exports.hexToString = function(hex_string) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hexToString(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
};

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
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
module.exports.hexToUint8Array = function(hex_string) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(hex_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.hexToUint8Array(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1, 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

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
module.exports.uint8ArrayToBytes = function(uint8_array) {
    const ret = wasm.uint8ArrayToBytes(addHeapObject(uint8_array));
    return Bytes.__wrap(ret);
};

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
module.exports.motesToCSPR = function(motes) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(motes, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.motesToCSPR(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
};

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
module.exports.jsonPrettyPrint = function(value, verbosity) {
    const ret = wasm.jsonPrettyPrint(addHeapObject(value), isLikeNone(verbosity) ? 3 : verbosity);
    return takeObject(ret);
};

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
module.exports.privateToPublicKey = function(secret_key) {
    const ptr0 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.privateToPublicKey(ptr0, len0);
    return takeObject(ret);
};

/**
* Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
*
* # Returns
*
* A `JsValue` containing the PEM-encoded secret key or `JsValue::null()` if an error occurs.
*
* # Errors
*
* Returns an error if the secret key generation or serialization fails.
* @returns {any}
*/
module.exports.generatePrivateKey = function() {
    const ret = wasm.generatePrivateKey();
    return takeObject(ret);
};

/**
* Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
*
* # Returns
*
* A `JsValue` containing the PEM-encoded secret key or `JsValue::null()` if an error occurs.
*
* # Errors
*
* Returns an error if the secret key generation or serialization fails.
* @returns {any}
*/
module.exports.generatePrivateKey_secp256k1 = function() {
    const ret = wasm.generatePrivateKey_secp256k1();
    return takeObject(ret);
};

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
module.exports.accountHashToBase64 = function(formatted_account_hash) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(formatted_account_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.accountHashToBase64(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
};

/**
* Gets the current timestamp.
*
* # Returns
*
* A JsValue containing the current timestamp.
* @returns {any}
*/
module.exports.getTimestamp = function() {
    const ret = wasm.getTimestamp();
    return takeObject(ret);
};

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
module.exports.encodeLowerBlake2b = function(meta_data) {
    const ptr0 = passStringToWasm0(meta_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.encodeLowerBlake2b(ptr0, len0);
    return takeObject(ret);
};

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
module.exports.makeDictionaryItemKey = function(key, value) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        _assertClass(key, Key);
        var ptr0 = key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.makeDictionaryItemKey(retptr, ptr0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
};

/**
* @param {Uint8Array} key
* @returns {TransferAddr}
*/
module.exports.fromTransfer = function(key) {
    const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.fromTransfer(ptr0, len0);
    return TransferAddr.__wrap(ret);
};

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_796(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h418f18809bb538b9(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
module.exports.CLTypeEnum = Object.freeze({ Bool:0,"0":"Bool",I32:1,"1":"I32",I64:2,"2":"I64",U8:3,"3":"U8",U32:4,"4":"U32",U64:5,"5":"U64",U128:6,"6":"U128",U256:7,"7":"U256",U512:8,"8":"U512",Unit:9,"9":"Unit",String:10,"10":"String",Key:11,"11":"Key",URef:12,"12":"URef",PublicKey:13,"13":"PublicKey",Option:14,"14":"Option",List:15,"15":"List",ByteArray:16,"16":"ByteArray",Result:17,"17":"Result",Map:18,"18":"Map",Tuple1:19,"19":"Tuple1",Tuple2:20,"20":"Tuple2",Tuple3:21,"21":"Tuple3",Any:22,"22":"Any", });
/**
*/
module.exports.Verbosity = Object.freeze({ Low:0,"0":"Low",Medium:1,"1":"Medium",High:2,"2":"High", });

const AccessRightsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accessrights_free(ptr >>> 0));
/**
*/
class AccessRights {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_accessrights_free(ptr);
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
    static WRITE() {
        const ret = wasm.accessrights_WRITE();
        return ret;
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
    static READ_ADD() {
        const ret = wasm.accessrights_READ_ADD();
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
    static ADD_WRITE() {
        const ret = wasm.accessrights_ADD_WRITE();
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
    * @param {number} access_rights
    */
    constructor(access_rights) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accessrights_new(retptr, access_rights);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
}
module.exports.AccessRights = AccessRights;

const AccountHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accounthash_free(ptr >>> 0));
/**
*/
class AccountHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_accounthash_free(ptr);
    }
    /**
    * @param {string} account_hash_hex_str
    */
    constructor(account_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(account_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accounthash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} formatted_str
    * @returns {AccountHash}
    */
    static fromFormattedStr(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accounthash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccountHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accounthash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
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
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.accounthash_toHexString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
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
    * @returns {any}
    */
    toJson() {
        const ret = wasm.accounthash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.AccountHash = AccountHash;

const AccountIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_accountidentifier_free(ptr >>> 0));
/**
*/
class AccountIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_accountidentifier_free(ptr);
    }
    /**
    * @param {string} formatted_str
    */
    constructor(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accountidentifier_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} formatted_str
    * @returns {AccountIdentifier}
    */
    static fromFormattedStr(formatted_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(formatted_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.accountidentifier_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return AccountIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {any}
    */
    toJson() {
        const ret = wasm.accountidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.AccountIdentifier = AccountIdentifier;

const ArgsSimpleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_argssimple_free(ptr >>> 0));
/**
*/
class ArgsSimple {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_argssimple_free(ptr);
    }
}
module.exports.ArgsSimple = ArgsSimple;

const BlockHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blockhash_free(ptr >>> 0));
/**
*/
class BlockHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_blockhash_free(ptr);
    }
    /**
    * @param {string} block_hash_hex_str
    */
    constructor(block_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(block_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.blockhash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Digest} digest
    * @returns {BlockHash}
    */
    static fromDigest(digest) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(digest, Digest);
            var ptr0 = digest.__destroy_into_raw();
            wasm.blockhash_fromDigest(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BlockHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.blockhash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.blockhash_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
module.exports.BlockHash = BlockHash;

const BlockIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blockidentifier_free(ptr >>> 0));
/**
*/
class BlockIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_blockidentifier_free(ptr);
    }
    /**
    * @param {BlockIdentifier} block_identifier
    */
    constructor(block_identifier) {
        _assertClass(block_identifier, BlockIdentifier);
        var ptr0 = block_identifier.__destroy_into_raw();
        const ret = wasm.blockidentifier_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
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
    * @param {bigint} height
    * @returns {BlockIdentifier}
    */
    static fromHeight(height) {
        const ret = wasm.blockidentifier_fromHeight(height);
        return BlockIdentifier.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.blockidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.BlockIdentifier = BlockIdentifier;

const BodyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_body_free(ptr >>> 0));
/**
* Represents the body of an event, containing processed deploy information.
*/
class Body {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_body_free(ptr);
    }
    /**
    * @returns {DeployProcessed | undefined}
    */
    get DeployProcessed() {
        const ret = wasm.__wbg_get_body_DeployProcessed(this.__wbg_ptr);
        return ret === 0 ? undefined : DeployProcessed.__wrap(ret);
    }
    /**
    * @param {DeployProcessed | undefined} [arg0]
    */
    set DeployProcessed(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, DeployProcessed);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_body_DeployProcessed(this.__wbg_ptr, ptr0);
    }
}
module.exports.Body = Body;

const BytesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bytes_free(ptr >>> 0));
/**
*/
class Bytes {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_bytes_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.bytes_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {Uint8Array} uint8_array
    * @returns {Bytes}
    */
    static fromUint8Array(uint8_array) {
        const ret = wasm.bytes_fromUint8Array(addHeapObject(uint8_array));
        return Bytes.__wrap(ret);
    }
}
module.exports.Bytes = Bytes;

const CLTypeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cltype_free(ptr >>> 0));
/**
*/
class CLType {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CLType.prototype);
        obj.__wbg_ptr = ptr;
        CLTypeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CLTypeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cltype_free(ptr);
    }
    /**
    * @returns {CLType}
    */
    static Bool() {
        const ret = wasm.cltype_Bool();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static I32() {
        const ret = wasm.cltype_I32();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static I64() {
        const ret = wasm.cltype_I64();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U8() {
        const ret = wasm.cltype_U8();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U32() {
        const ret = wasm.cltype_U32();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U64() {
        const ret = wasm.cltype_U64();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U128() {
        const ret = wasm.cltype_U128();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U256() {
        const ret = wasm.cltype_U256();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static U512() {
        const ret = wasm.cltype_U512();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Unit() {
        const ret = wasm.cltype_Unit();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static String() {
        const ret = wasm.cltype_String();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Key() {
        const ret = wasm.cltype_Key();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static URef() {
        const ret = wasm.cltype_URef();
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static PublicKey() {
        const ret = wasm.cltype_PublicKey();
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLType} _inner_type
    * @returns {CLType}
    */
    static Option(_inner_type) {
        _assertClass(_inner_type, CLType);
        var ptr0 = _inner_type.__destroy_into_raw();
        const ret = wasm.cltype_Option(ptr0);
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLType} _inner_type
    * @returns {CLType}
    */
    static List(_inner_type) {
        _assertClass(_inner_type, CLType);
        var ptr0 = _inner_type.__destroy_into_raw();
        const ret = wasm.cltype_List(ptr0);
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static ByteArray() {
        const ret = wasm.cltype_ByteArray();
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLType} _inner_type
    * @param {CLType} _error_type
    * @returns {CLType}
    */
    static Result(_inner_type, _error_type) {
        _assertClass(_inner_type, CLType);
        var ptr0 = _inner_type.__destroy_into_raw();
        _assertClass(_error_type, CLType);
        var ptr1 = _error_type.__destroy_into_raw();
        const ret = wasm.cltype_Result(ptr0, ptr1);
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLType} _key_type
    * @param {CLType} _value_type
    * @returns {CLType}
    */
    static Map(_key_type, _value_type) {
        _assertClass(_key_type, CLType);
        var ptr0 = _key_type.__destroy_into_raw();
        _assertClass(_value_type, CLType);
        var ptr1 = _value_type.__destroy_into_raw();
        const ret = wasm.cltype_Map(ptr0, ptr1);
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLType} _value_type
    * @returns {CLType}
    */
    static Tuple1(_value_type) {
        _assertClass(_value_type, CLType);
        var ptr0 = _value_type.__destroy_into_raw();
        const ret = wasm.cltype_Tuple1(ptr0);
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLType} _value_type
    * @param {CLType} _value_type2
    * @returns {CLType}
    */
    static Tuple2(_value_type, _value_type2) {
        _assertClass(_value_type, CLType);
        var ptr0 = _value_type.__destroy_into_raw();
        _assertClass(_value_type2, CLType);
        var ptr1 = _value_type2.__destroy_into_raw();
        const ret = wasm.cltype_Tuple2(ptr0, ptr1);
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLType} _value_type
    * @param {CLType} _value_type2
    * @param {CLType} _value_type3
    * @returns {CLType}
    */
    static Tuple3(_value_type, _value_type2, _value_type3) {
        _assertClass(_value_type, CLType);
        var ptr0 = _value_type.__destroy_into_raw();
        _assertClass(_value_type2, CLType);
        var ptr1 = _value_type2.__destroy_into_raw();
        _assertClass(_value_type3, CLType);
        var ptr2 = _value_type3.__destroy_into_raw();
        const ret = wasm.cltype_Tuple3(ptr0, ptr1, ptr2);
        return CLType.__wrap(ret);
    }
    /**
    * @returns {CLType}
    */
    static Any() {
        const ret = wasm.cltype_Any();
        return CLType.__wrap(ret);
    }
    /**
    * @param {CLTypeEnum} cl_type
    */
    constructor(cl_type) {
        const ret = wasm.cltype_new(cl_type);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.cltype_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
module.exports.CLType = CLType;

const ContractHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_contracthash_free(ptr >>> 0));
/**
*/
class ContractHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_contracthash_free(ptr);
    }
    /**
    * @param {string} input
    */
    constructor(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contracthash_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {ContractHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contracthash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contracthash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
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
}
module.exports.ContractHash = ContractHash;

const ContractPackageHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_contractpackagehash_free(ptr >>> 0));
/**
*/
class ContractPackageHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_contractpackagehash_free(ptr);
    }
    /**
    * @param {string} input
    */
    constructor(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contractpackagehash_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} input
    * @returns {ContractPackageHash}
    */
    static fromFormattedStr(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.contractpackagehash_fromFormattedStr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ContractPackageHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.contractpackagehash_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
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
}
module.exports.ContractPackageHash = ContractPackageHash;

const DeployFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploy_free(ptr >>> 0));
/**
*/
class Deploy {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_deploy_free(ptr);
    }
    /**
    * @param {any} deploy
    */
    constructor(deploy) {
        const ret = wasm.deploy_new(addHeapObject(deploy));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.deploy_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {DeployStrParams} deploy_params
    * @param {SessionStrParams} session_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    static withPaymentAndSession(deploy_params, session_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(deploy_params, DeployStrParams);
            var ptr0 = deploy_params.__destroy_into_raw();
            _assertClass(session_params, SessionStrParams);
            var ptr1 = session_params.__destroy_into_raw();
            _assertClass(payment_params, PaymentStrParams);
            var ptr2 = payment_params.__destroy_into_raw();
            wasm.deploy_withPaymentAndSession(retptr, ptr0, ptr1, ptr2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} amount
    * @param {string} target_account
    * @param {string | undefined} transfer_id
    * @param {DeployStrParams} deploy_params
    * @param {PaymentStrParams} payment_params
    * @returns {Deploy}
    */
    static withTransfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
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
            wasm.deploy_withTransfer(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} ttl
    * @param {string | undefined} [secret_key]
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
    * @param {string | undefined} [secret_key]
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
    * @param {string} chain_name
    * @param {string | undefined} [secret_key]
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
    * @param {PublicKey} account
    * @param {string | undefined} [secret_key]
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
    * @param {string} entry_point_name
    * @param {string | undefined} [secret_key]
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
    * @param {string | undefined} [secret_key]
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
    * @param {ContractPackageHash} package_hash
    * @param {string | undefined} [secret_key]
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
    * @param {Bytes} module_bytes
    * @param {string | undefined} [secret_key]
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
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withSecretKey(secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSecretKey(this.__wbg_ptr, ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {string} amount
    * @param {string | undefined} [secret_key]
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
    * @param {any} payment
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withPayment(payment, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withPayment(this.__wbg_ptr, addHeapObject(payment), ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @param {any} session
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    withSession(session, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_withSession(this.__wbg_ptr, addHeapObject(session), ptr0, len0);
        return Deploy.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    validateDeploySize() {
        const ret = wasm.deploy_validateDeploySize(this.__wbg_ptr);
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
    TTL() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_TTL(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    chainName() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_chainName(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
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
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploy_account(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    args() {
        const ret = wasm.deploy_args(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} js_value_arg
    * @param {string | undefined} [secret_key]
    * @returns {Deploy}
    */
    addArg(js_value_arg, secret_key) {
        var ptr0 = isLikeNone(secret_key) ? 0 : passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploy_addArg(this.__wbg_ptr, addHeapObject(js_value_arg), ptr0, len0);
        return Deploy.__wrap(ret);
    }
}
module.exports.Deploy = Deploy;

const DeployHashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deployhash_free(ptr >>> 0));
/**
*/
class DeployHash {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_deployhash_free(ptr);
    }
    /**
    * @param {string} deploy_hash_hex_str
    */
    constructor(deploy_hash_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(deploy_hash_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.deployhash_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Digest} digest
    * @returns {DeployHash}
    */
    static fromDigest(digest) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(digest, Digest);
            var ptr0 = digest.__destroy_into_raw();
            wasm.deployhash_fromDigest(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DeployHash.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.deployhash_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deployhash_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
module.exports.DeployHash = DeployHash;

const DeployProcessedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deployprocessed_free(ptr >>> 0));
/**
* Represents processed deploy information.
*/
class DeployProcessed {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DeployProcessed.prototype);
        obj.__wbg_ptr = ptr;
        DeployProcessedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployProcessedFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deployprocessed_free(ptr);
    }
    /**
    * @returns {string}
    */
    get deploy_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_deploy_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set deploy_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_deploy_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get account() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_account(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set account(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_account(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get timestamp() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set timestamp(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get ttl() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_ttl(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set ttl(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {(string)[]}
    */
    get dependencies() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_dependencies(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {(string)[]} arg0
    */
    set dependencies(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_dependencies(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string}
    */
    get block_hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_block_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set block_hash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_block_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * Result of the execution, either Success or Failure.
    * @returns {ExecutionResult}
    */
    get execution_result() {
        const ret = wasm.__wbg_get_deployprocessed_execution_result(this.__wbg_ptr);
        return ExecutionResult.__wrap(ret);
    }
    /**
    * Result of the execution, either Success or Failure.
    * @param {ExecutionResult} arg0
    */
    set execution_result(arg0) {
        _assertClass(arg0, ExecutionResult);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_deployprocessed_execution_result(this.__wbg_ptr, ptr0);
    }
}
module.exports.DeployProcessed = DeployProcessed;

const DeployStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploystrparams_free(ptr >>> 0));
/**
*/
class DeployStrParams {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploystrparams_free(ptr);
    }
    /**
    * @param {string} chain_name
    * @param {string} session_account
    * @param {string | undefined} [secret_key]
    * @param {string | undefined} [timestamp]
    * @param {string | undefined} [ttl]
    */
    constructor(chain_name, session_account, secret_key, timestamp, ttl) {
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
        const ret = wasm.deploystrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string | undefined}
    */
    get secret_key() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_secret_key(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get timestamp() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_timestamp(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [timestamp]
    */
    set timestamp(timestamp) {
        var ptr0 = isLikeNone(timestamp) ? 0 : passStringToWasm0(timestamp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_timestamp(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTimestamp() {
        wasm.deploystrparams_setDefaultTimestamp(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get ttl() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_ttl(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [ttl]
    */
    set ttl(ttl) {
        var ptr0 = isLikeNone(ttl) ? 0 : passStringToWasm0(ttl, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_ttl(this.__wbg_ptr, ptr0, len0);
    }
    /**
    */
    setDefaultTTL() {
        wasm.deploystrparams_setDefaultTTL(this.__wbg_ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get chain_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_chain_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get session_account() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.deploystrparams_session_account(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_account
    */
    set session_account(session_account) {
        const ptr0 = passStringToWasm0(session_account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploystrparams_set_session_account(this.__wbg_ptr, ptr0, len0);
    }
}
module.exports.DeployStrParams = DeployStrParams;

const DeploySubscriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploysubscription_free(ptr >>> 0));
/**
* Represents a subscription to deploy events for wasm32 target architecture.
*/
class DeploySubscription {

    static __unwrap(jsValue) {
        if (!(jsValue instanceof DeploySubscription)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeploySubscriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploysubscription_free(ptr);
    }
    /**
    * Deploy hash to identify the subscription.
    * @returns {string}
    */
    get deployHash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_deploy_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Deploy hash to identify the subscription.
    * @param {string} arg0
    */
    set deployHash(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_deploy_hash(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * Handler function for deploy events.
    * @returns {Function}
    */
    get eventHandlerFn() {
        const ret = wasm.__wbg_get_deploysubscription_eventHandlerFn(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Handler function for deploy events.
    * @param {Function} arg0
    */
    set eventHandlerFn(arg0) {
        wasm.__wbg_set_deploysubscription_eventHandlerFn(this.__wbg_ptr, addHeapObject(arg0));
    }
    /**
    * Constructor for DeploySubscription for wasm32 target architecture.
    *
    * # Arguments
    *
    * * `deploy_hash` - Deploy hash to identify the subscription.
    * * `event_handler_fn` - Handler function for deploy events.
    * @param {string} deploy_hash
    * @param {Function} event_handler_fn
    */
    constructor(deploy_hash, event_handler_fn) {
        const ptr0 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploysubscription_new(ptr0, len0, addHeapObject(event_handler_fn));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}
module.exports.DeploySubscription = DeploySubscription;

const DeployWatcherFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_deploywatcher_free(ptr >>> 0));
/**
* Represents a deploy watcher responsible for monitoring deploy events.
*
* This struct allows clients to subscribe to deploy events, start watching for events,
* or wait for an event and handle the received deploy event data.
*
* # Fields
*
* * `events_url` - The URL for deploy events.
* * `deploy_subscriptions` - Vector containing deploy subscriptions.
* * `active` - Reference-counted cell indicating whether the deploy watcher is active.
* * `timeout_duration` - Duration representing the optional timeout for watching events.
*/
class DeployWatcher {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DeployWatcher.prototype);
        obj.__wbg_ptr = ptr;
        DeployWatcherFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeployWatcherFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_deploywatcher_free(ptr);
    }
    /**
    * Creates a new `DeployWatcher` instance.
    *
    * # Arguments
    *
    * * `events_url` - The URL for deploy events.
    * * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
    *   a default timeout of 60,000 milliseconds (1 minute) is used.
    *
    * # Returns
    *
    * A new `DeployWatcher` instance.
    * @param {string} events_url
    * @param {bigint | undefined} [timeout_duration]
    */
    constructor(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.deploywatcher_new(ptr0, len0, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? BigInt(0) : timeout_duration);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * Subscribes to deploy events.
    *
    * # Arguments
    *
    * * `deploy_subscriptions` - Vector of deploy subscriptions to be added.
    *
    * # Returns
    *
    * Result indicating success or an error message.
    * @param {(DeploySubscription)[]} deploy_subscriptions
    */
    subscribe(deploy_subscriptions) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(deploy_subscriptions, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.deploywatcher_subscribe(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Unsubscribes from deploy events based on the provided deploy hash.
    *
    * # Arguments
    *
    * * `deploy_hash` - The deploy hash to unsubscribe.
    *
    * This method removes the deploy subscription associated with the provided deploy hash.
    * @param {string} deploy_hash
    */
    unsubscribe(deploy_hash) {
        const ptr0 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.deploywatcher_unsubscribe(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * Starts watching for deploy events (JavaScript-friendly).
    *
    * # Returns
    *
    * Result containing the serialized deploy events data or an error message.
    * @returns {Promise<any>}
    */
    start() {
        const ret = wasm.deploywatcher_start(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Stops watching for deploy events.
    *
    * This method sets the deploy watcher as inactive and stops the event listener if it exists.
    */
    stop() {
        wasm.deploywatcher_stop(this.__wbg_ptr);
    }
}
module.exports.DeployWatcher = DeployWatcher;

const DictionaryAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryaddr_free(ptr >>> 0));
/**
*/
class DictionaryAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_dictionaryaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.dictionaryaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.DictionaryAddr = DictionaryAddr;

const DictionaryItemIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemidentifier_free(ptr >>> 0));
/**
*/
class DictionaryItemIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_dictionaryitemidentifier_free(ptr);
    }
    /**
    * @param {string} account_hash
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromAccountInfo(account_hash, dictionary_name, dictionary_item_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(account_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromAccountInfo(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} contract_addr
    * @param {string} dictionary_name
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromContractInfo(contract_addr, dictionary_name, dictionary_item_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(contract_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(dictionary_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromContractInfo(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} seed_uref
    * @param {string} dictionary_item_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromSeedUref(seed_uref, dictionary_item_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(seed_uref, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(dictionary_item_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromSeedUref(retptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} dictionary_key
    * @returns {DictionaryItemIdentifier}
    */
    static newFromDictionaryKey(dictionary_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(dictionary_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.dictionaryitemidentifier_newFromDictionaryKey(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return DictionaryItemIdentifier.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.dictionaryitemidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.DictionaryItemIdentifier = DictionaryItemIdentifier;

const DictionaryItemStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dictionaryitemstrparams_free(ptr >>> 0));
/**
*/
class DictionaryItemStrParams {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_dictionaryitemstrparams_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.dictionaryitemstrparams_new();
        this.__wbg_ptr = ret >>> 0;
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
    * @param {string} value
    */
    setDictionary(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.dictionaryitemstrparams_setDictionary(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.dictionaryitemstrparams_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.DictionaryItemStrParams = DictionaryItemStrParams;

const DigestFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_digest_free(ptr >>> 0));
/**
*/
class Digest {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_digest_free(ptr);
    }
    /**
    * @param {string} digest_hex_str
    */
    constructor(digest_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest__new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} digest_hex_str
    * @returns {Digest}
    */
    static fromString(digest_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(digest_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest__new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Digest.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {Digest}
    */
    static fromDigest(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.digest_fromDigest(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Digest.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.digest_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.digest_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
module.exports.Digest = Digest;

const EraIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_eraid_free(ptr >>> 0));
/**
*/
class EraId {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EraIdFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eraid_free(ptr);
    }
    /**
    * @param {bigint} value
    */
    constructor(value) {
        const ret = wasm.eraid_new(value);
        this.__wbg_ptr = ret >>> 0;
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
module.exports.EraId = EraId;

const EventParseResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_eventparseresult_free(ptr >>> 0));
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
        wasm.__wbg_eventparseresult_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get err() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_eventparseresult_err(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set err(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_eventparseresult_err(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Body | undefined}
    */
    get body() {
        const ret = wasm.__wbg_get_eventparseresult_body(this.__wbg_ptr);
        return ret === 0 ? undefined : Body.__wrap(ret);
    }
    /**
    * @param {Body | undefined} [arg0]
    */
    set body(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Body);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_eventparseresult_body(this.__wbg_ptr, ptr0);
    }
}
module.exports.EventParseResult = EventParseResult;

const ExecutionResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_executionresult_free(ptr >>> 0));
/**
* Represents the result of an execution, either Success or Failure.
*/
class ExecutionResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_executionresult_free(ptr);
    }
    /**
    * Optional Success information.
    * @returns {Success | undefined}
    */
    get Success() {
        const ret = wasm.__wbg_get_executionresult_Success(this.__wbg_ptr);
        return ret === 0 ? undefined : Success.__wrap(ret);
    }
    /**
    * Optional Success information.
    * @param {Success | undefined} [arg0]
    */
    set Success(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Success);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_executionresult_Success(this.__wbg_ptr, ptr0);
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
    * Optional Failure information.
    * @param {Failure | undefined} [arg0]
    */
    set Failure(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Failure);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_executionresult_Failure(this.__wbg_ptr, ptr0);
    }
}
module.exports.ExecutionResult = ExecutionResult;

const FailureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_failure_free(ptr >>> 0));
/**
* Represents a failure response containing an error message.
*/
class Failure {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_failure_free(ptr);
    }
    /**
    * @returns {string}
    */
    get error_message() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_deploy_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set error_message(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_deploy_hash(this.__wbg_ptr, ptr0, len0);
    }
}
module.exports.Failure = Failure;

const GetAccountResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaccountresult_free(ptr >>> 0));
/**
*/
class GetAccountResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getaccountresult_free(ptr);
    }
    /**
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getaccountresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get account() {
        const ret = wasm.getaccountresult_account(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getaccountresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getaccountresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetAccountResult = GetAccountResult;

const GetAuctionInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninforesult_free(ptr >>> 0));
/**
*/
class GetAuctionInfoResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getauctioninforesult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getauctioninforesult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the auction state as a JsValue.
    * @returns {any}
    */
    get auction_state() {
        const ret = wasm.getauctioninforesult_auction_state(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetAuctionInfoResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getauctioninforesult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetAuctionInfoResult = GetAuctionInfoResult;

const GetBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceresult_free(ptr >>> 0));
/**
*/
class GetBalanceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getbalanceresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getbalanceresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the balance value as a JsValue.
    * @returns {any}
    */
    get balance_value() {
        const ret = wasm.getbalanceresult_balance_value(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the Merkle proof as a string.
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getbalanceresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the GetBalanceResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getbalanceresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetBalanceResult = GetBalanceResult;

const GetBlockResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblockresult_free(ptr >>> 0));
/**
*/
class GetBlockResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getblockresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getblockresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the block information as a JsValue.
    * @returns {any}
    */
    get block() {
        const ret = wasm.getblockresult_block(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetBlockResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getblockresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetBlockResult = GetBlockResult;

const GetBlockTransfersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersresult_free(ptr >>> 0));
/**
*/
class GetBlockTransfersResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getblocktransfersresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getblocktransfersresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
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
    * Gets the transfers as a JsValue.
    * @returns {any}
    */
    get transfers() {
        const ret = wasm.getblocktransfersresult_transfers(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetBlockTransfersResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getblocktransfersresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetBlockTransfersResult = GetBlockTransfersResult;

const GetChainspecResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getchainspecresult_free(ptr >>> 0));
/**
* A struct representing the result of the `get_chainspec` function.
*/
class GetChainspecResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getchainspecresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getchainspecresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the chainspec bytes as a JsValue.
    * @returns {any}
    */
    get chainspec_bytes() {
        const ret = wasm.getchainspecresult_chainspec_bytes(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the `GetChainspecResult` to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getchainspecresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetChainspecResult = GetChainspecResult;

const GetDeployResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdeployresult_free(ptr >>> 0));
/**
*/
class GetDeployResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getdeployresult_free(ptr);
    }
    /**
    * Gets the API version as a JavaScript value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getdeployresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
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
    * Converts the result to a JSON JavaScript value.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getdeployresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetDeployResult = GetDeployResult;

const GetDictionaryItemResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemresult_free(ptr >>> 0));
/**
*/
class GetDictionaryItemResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getdictionaryitemresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getdictionaryitemresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the dictionary key as a String.
    * @returns {string}
    */
    get dictionary_key() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getdictionaryitemresult_dictionary_key(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Gets the stored value as a JsValue.
    * @returns {any}
    */
    get stored_value() {
        const ret = wasm.getdictionaryitemresult_stored_value(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the merkle proof as a String.
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getdictionaryitemresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the GetDictionaryItemResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getdictionaryitemresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetDictionaryItemResult = GetDictionaryItemResult;

const GetEraInfoResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterainforesult_free(ptr >>> 0));
/**
*/
class GetEraInfoResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_geterainforesult_free(ptr);
    }
    /**
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.geterainforesult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get era_summary() {
        const ret = wasm.geterainforesult_era_summary(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.geterainforesult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetEraInfoResult = GetEraInfoResult;

const GetEraSummaryResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetEraSummaryResult` from casper_client.
*/
class GetEraSummaryResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_geterasummaryresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.geterasummaryresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the era summary as a JsValue.
    * @returns {any}
    */
    get era_summary() {
        const ret = wasm.geterasummaryresult_era_summary(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetEraSummaryResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.geterasummaryresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetEraSummaryResult = GetEraSummaryResult;

const GetNodeStatusResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getnodestatusresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetNodeStatusResult` from casper_client.
*/
class GetNodeStatusResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getnodestatusresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getnodestatusresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the chainspec name as a String.
    * @returns {string}
    */
    get chainspec_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getnodestatusresult_chainspec_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
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
    * Gets the list of peers as a JsValue.
    * @returns {any}
    */
    get peers() {
        const ret = wasm.getnodestatusresult_peers(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets information about the last added block as a JsValue.
    * @returns {any}
    */
    get last_added_block_info() {
        const ret = wasm.getnodestatusresult_last_added_block_info(this.__wbg_ptr);
        return takeObject(ret);
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
    * Gets the round length as a JsValue.
    * @returns {any}
    */
    get round_length() {
        const ret = wasm.getnodestatusresult_round_length(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets information about the next upgrade as a JsValue.
    * @returns {any}
    */
    get next_upgrade() {
        const ret = wasm.getnodestatusresult_next_upgrade(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the build version as a String.
    * @returns {string}
    */
    get build_version() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getnodestatusresult_build_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Gets the uptime information as a JsValue.
    * @returns {any}
    */
    get uptime() {
        const ret = wasm.getnodestatusresult_uptime(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the reactor state information as a JsValue.
    * @returns {any}
    */
    get reactor_state() {
        const ret = wasm.getnodestatusresult_reactor_state(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the last progress information as a JsValue.
    * @returns {any}
    */
    get last_progress() {
        const ret = wasm.getnodestatusresult_last_progress(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the available block range as a JsValue.
    * @returns {any}
    */
    get available_block_range() {
        const ret = wasm.getnodestatusresult_available_block_range(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the block sync information as a JsValue.
    * @returns {any}
    */
    get block_sync() {
        const ret = wasm.getnodestatusresult_block_sync(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetNodeStatusResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getnodestatusresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetNodeStatusResult = GetNodeStatusResult;

const GetPeersResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getpeersresult_free(ptr >>> 0));
/**
* A wrapper for the `GetPeersResult` type from the Casper client.
*/
class GetPeersResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getpeersresult_free(ptr);
    }
    /**
    * Gets the API version as a JSON value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getpeersresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the peers as a JSON value.
    * @returns {any}
    */
    get peers() {
        const ret = wasm.getpeersresult_peers(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the result to JSON format as a JavaScript value.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getpeersresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetPeersResult = GetPeersResult;

const GetStateRootHashResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetStateRootHashResult` from casper_client.
*/
class GetStateRootHashResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getstateroothashresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getstateroothashresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
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
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getstateroothashresult_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Alias for state_root_hash_as_string
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.getstateroothashresult_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the GetStateRootHashResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getstateroothashresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetStateRootHashResult = GetStateRootHashResult;

const GetValidatorChangesResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getvalidatorchangesresult_free(ptr >>> 0));
/**
* Wrapper struct for the `GetValidatorChangesResult` from casper_client.
*/
class GetValidatorChangesResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getvalidatorchangesresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.getvalidatorchangesresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the validator changes as a JsValue.
    * @returns {any}
    */
    get changes() {
        const ret = wasm.getvalidatorchangesresult_changes(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the GetValidatorChangesResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.getvalidatorchangesresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GetValidatorChangesResult = GetValidatorChangesResult;

const GlobalStateIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_globalstateidentifier_free(ptr >>> 0));
/**
*/
class GlobalStateIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_globalstateidentifier_free(ptr);
    }
    /**
    * @param {GlobalStateIdentifier} global_state_identifier
    */
    constructor(global_state_identifier) {
        _assertClass(global_state_identifier, GlobalStateIdentifier);
        var ptr0 = global_state_identifier.__destroy_into_raw();
        const ret = wasm.blockidentifier_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {BlockHash} block_hash
    * @returns {GlobalStateIdentifier}
    */
    static fromBlockHash(block_hash) {
        _assertClass(block_hash, BlockHash);
        var ptr0 = block_hash.__destroy_into_raw();
        const ret = wasm.blockidentifier_from_hash(ptr0);
        return GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {bigint} block_height
    * @returns {GlobalStateIdentifier}
    */
    static fromBlockHeight(block_height) {
        const ret = wasm.blockidentifier_fromHeight(block_height);
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
    * @returns {any}
    */
    toJson() {
        const ret = wasm.globalstateidentifier_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.GlobalStateIdentifier = GlobalStateIdentifier;

const HashAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashaddr_free(ptr >>> 0));
/**
*/
class HashAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_hashaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.hashaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.HashAddr = HashAddr;

const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0));
/**
*/
class IntoUnderlyingByteSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr);
    }
    /**
    * @returns {string}
    */
    get type() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.intounderlyingbytesource_type(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {number}
    */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {ReadableByteStreamController} controller
    */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, addHeapObject(controller));
    }
    /**
    * @param {ReadableByteStreamController} controller
    * @returns {Promise<any>}
    */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, addHeapObject(controller));
        return takeObject(ret);
    }
    /**
    */
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
}
module.exports.IntoUnderlyingByteSource = IntoUnderlyingByteSource;

const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0));
/**
*/
class IntoUnderlyingSink {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr);
    }
    /**
    * @param {any} chunk
    * @returns {Promise<any>}
    */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, addHeapObject(chunk));
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} reason
    * @returns {Promise<any>}
    */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, addHeapObject(reason));
        return takeObject(ret);
    }
}
module.exports.IntoUnderlyingSink = IntoUnderlyingSink;

const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0));
/**
*/
class IntoUnderlyingSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr);
    }
    /**
    * @param {ReadableStreamDefaultController} controller
    * @returns {Promise<any>}
    */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, addHeapObject(controller));
        return takeObject(ret);
    }
    /**
    */
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
}
module.exports.IntoUnderlyingSource = IntoUnderlyingSource;

const KeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_key_free(ptr >>> 0));
/**
*/
class Key {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_key_free(ptr);
    }
    /**
    * @param {Key} key
    */
    constructor(key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(key, Key);
            var ptr0 = key.__destroy_into_raw();
            wasm.key_new(retptr, ptr0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.key_toJson(this.__wbg_ptr);
        return takeObject(ret);
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
    * @returns {DictionaryAddr | undefined}
    */
    asDictionaryAddr() {
        const ret = wasm.key_asDictionaryAddr(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryAddr.__wrap(ret);
    }
    /**
    * @returns {Key}
    */
    static fromSystemContractRegistry() {
        const ret = wasm.key_fromSystemContractRegistry();
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
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.key_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {any} input
    * @returns {Key}
    */
    static fromFormattedString(input) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.key_fromFormattedString(retptr, addHeapObject(input));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Key.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {boolean}
    */
    isDictionaryKey() {
        const ret = wasm.key_isDictionaryKey(this.__wbg_ptr);
        return ret !== 0;
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
    * @returns {URefAddr | undefined}
    */
    asBalance() {
        const ret = wasm.key_asBalance(this.__wbg_ptr);
        return ret === 0 ? undefined : URefAddr.__wrap(ret);
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
module.exports.Key = Key;

const ListRpcsResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_listrpcsresult_free(ptr >>> 0));
/**
* Wrapper struct for the `ListRpcsResult` from casper_client.
*/
class ListRpcsResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_listrpcsresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.listrpcsresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the name of the RPC.
    * @returns {string}
    */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.listrpcsresult_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Gets the schema of the RPC as a JsValue.
    * @returns {any}
    */
    get schema() {
        const ret = wasm.listrpcsresult_schema(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the ListRpcsResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.listrpcsresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.ListRpcsResult = ListRpcsResult;

const PathFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_path_free(ptr >>> 0));
/**
*/
class Path {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_path_free(ptr);
    }
    /**
    * @param {any} path
    */
    constructor(path) {
        const ret = wasm.path_new(addHeapObject(path));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {any} path
    * @returns {Path}
    */
    static fromArray(path) {
        const ret = wasm.path_fromArray(addHeapObject(path));
        return Path.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.path_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.path_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {boolean}
    */
    is_empty() {
        const ret = wasm.path_is_empty(this.__wbg_ptr);
        return ret !== 0;
    }
}
module.exports.Path = Path;

const PaymentStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_paymentstrparams_free(ptr >>> 0));
/**
*/
class PaymentStrParams {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PaymentStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_paymentstrparams_free(ptr);
    }
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
    constructor(payment_amount, payment_hash, payment_name, payment_package_hash, payment_package_name, payment_path, payment_args_simple, payment_args_json, payment_args_complex, payment_version, payment_entry_point) {
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
        var ptr7 = isLikeNone(payment_args_complex) ? 0 : passStringToWasm0(payment_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(payment_version) ? 0 : passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        var ptr9 = isLikeNone(payment_entry_point) ? 0 : passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len9 = WASM_VECTOR_LEN;
        const ret = wasm.paymentstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, isLikeNone(payment_args_simple) ? 0 : addHeapObject(payment_args_simple), ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string | undefined}
    */
    get payment_amount() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_amount(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get payment_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get payment_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get payment_package_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get payment_package_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_package_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get payment_path() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_path(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {Array<any> | undefined}
    */
    get payment_args_simple() {
        const ret = wasm.paymentstrparams_payment_args_simple(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {Array<any>} payment_args_simple
    */
    set payment_args_simple(payment_args_simple) {
        wasm.paymentstrparams_set_payment_args_simple(this.__wbg_ptr, addHeapObject(payment_args_simple));
    }
    /**
    * @returns {string | undefined}
    */
    get payment_args_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get payment_args_complex() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_args_complex(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_args_complex
    */
    set payment_args_complex(payment_args_complex) {
        const ptr0 = passStringToWasm0(payment_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_args_complex(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_version() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_version
    */
    set payment_version(payment_version) {
        const ptr0 = passStringToWasm0(payment_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_version(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get payment_entry_point() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.paymentstrparams_payment_entry_point(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} payment_entry_point
    */
    set payment_entry_point(payment_entry_point) {
        const ptr0 = passStringToWasm0(payment_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.paymentstrparams_set_payment_entry_point(this.__wbg_ptr, ptr0, len0);
    }
}
module.exports.PaymentStrParams = PaymentStrParams;

const PeerEntryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_peerentry_free(ptr >>> 0));
/**
*/
class PeerEntry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PeerEntryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_peerentry_free(ptr);
    }
    /**
    * @returns {string}
    */
    get node_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.peerentry_node_id(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    get address() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.peerentry_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
module.exports.PeerEntry = PeerEntry;

const PublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickey_free(ptr >>> 0));
/**
*/
class PublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_publickey_free(ptr);
    }
    /**
    * @param {string} public_key_hex_str
    */
    constructor(public_key_hex_str) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(public_key_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.publickey_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} bytes
    * @returns {PublicKey}
    */
    static fromUint8Array(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_fromUint8Array(ptr0, len0);
        return PublicKey.__wrap(ret);
    }
    /**
    * @returns {AccountHash}
    */
    toAccountHash() {
        const ret = wasm.publickey_toAccountHash(this.__wbg_ptr);
        return AccountHash.__wrap(ret);
    }
    /**
    * @returns {URef}
    */
    toPurseUref() {
        const ret = wasm.publickey_toPurseUref(this.__wbg_ptr);
        return URef.__wrap(ret);
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.publickey_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.PublicKey = PublicKey;

const PurseIdentifierFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_purseidentifier_free(ptr >>> 0));
/**
*/
class PurseIdentifier {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_purseidentifier_free(ptr);
    }
    /**
    * @param {PublicKey} key
    */
    constructor(key) {
        _assertClass(key, PublicKey);
        var ptr0 = key.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromPublicKey(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {AccountHash} account_hash
    * @returns {PurseIdentifier}
    */
    static fromAccountHash(account_hash) {
        _assertClass(account_hash, AccountHash);
        var ptr0 = account_hash.__destroy_into_raw();
        const ret = wasm.accountidentifier_fromAccountHash(ptr0);
        return PurseIdentifier.__wrap(ret);
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
        return takeObject(ret);
    }
}
module.exports.PurseIdentifier = PurseIdentifier;

const PutDeployResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_putdeployresult_free(ptr >>> 0));
/**
*/
class PutDeployResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_putdeployresult_free(ptr);
    }
    /**
    * Gets the API version as a JavaScript value.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.putdeployresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
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
        return takeObject(ret);
    }
}
module.exports.PutDeployResult = PutDeployResult;

const QueryBalanceResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceresult_free(ptr >>> 0));
/**
*/
class QueryBalanceResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_querybalanceresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.querybalanceresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the balance as a JsValue.
    * @returns {any}
    */
    get balance() {
        const ret = wasm.querybalanceresult_balance(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Converts the QueryBalanceResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.querybalanceresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.QueryBalanceResult = QueryBalanceResult;

const QueryGlobalStateResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateresult_free(ptr >>> 0));
/**
*/
class QueryGlobalStateResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_queryglobalstateresult_free(ptr);
    }
    /**
    * Gets the API version as a JsValue.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.queryglobalstateresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the block header as a JsValue.
    * @returns {any}
    */
    get block_header() {
        const ret = wasm.queryglobalstateresult_block_header(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the stored value as a JsValue.
    * @returns {any}
    */
    get stored_value() {
        const ret = wasm.queryglobalstateresult_stored_value(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Gets the Merkle proof as a string.
    * @returns {string}
    */
    get merkle_proof() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.queryglobalstateresult_merkle_proof(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Converts the QueryGlobalStateResult to a JsValue.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.queryglobalstateresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.QueryGlobalStateResult = QueryGlobalStateResult;

const SDKFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sdk_free(ptr >>> 0));
/**
*/
class SDK {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SDKFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sdk_free(ptr);
    }
    /**
    * @param {any} options
    * @returns {getAccountOptions}
    */
    get_account_options(options) {
        const ret = wasm.sdk_get_account_options(this.__wbg_ptr, addHeapObject(options));
        return getAccountOptions.__wrap(ret);
    }
    /**
    * @param {getAccountOptions | undefined} [options]
    * @returns {Promise<GetAccountResult>}
    */
    get_account(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAccountOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_account(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {getAccountOptions | undefined} [options]
    * @returns {Promise<GetAccountResult>}
    */
    state_get_account_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAccountOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_account_info(this.__wbg_ptr, ptr0);
        return takeObject(ret);
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
        const ret = wasm.sdk_get_deploy_options(this.__wbg_ptr, addHeapObject(options));
        return getDeployOptions.__wrap(ret);
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
    * @param {getDeployOptions | undefined} [options]
    * @returns {Promise<GetDeployResult>}
    */
    get_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_deploy(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Retrieves deploy information using the provided options, alias for `get_deploy_js_alias`.
    * @param {getDeployOptions | undefined} [options]
    * @returns {Promise<GetDeployResult>}
    */
    info_get_deploy(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDeployOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_info_get_deploy(this.__wbg_ptr, ptr0);
        return takeObject(ret);
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
        const ret = wasm.sdk_get_state_root_hash_options(this.__wbg_ptr, addHeapObject(options));
        return getStateRootHashOptions.__wrap(ret);
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
    * @param {getStateRootHashOptions | undefined} [options]
    * @returns {Promise<GetStateRootHashResult>}
    */
    get_state_root_hash(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getStateRootHashOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_state_root_hash(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
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
    chain_get_state_root_hash(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getStateRootHashOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_state_root_hash(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Get options for speculative execution from a JavaScript value.
    * @param {any} options
    * @returns {getSpeculativeExecOptions}
    */
    speculative_exec_options(options) {
        const ret = wasm.sdk_speculative_exec_options(this.__wbg_ptr, addHeapObject(options));
        return getSpeculativeExecOptions.__wrap(ret);
    }
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
    speculative_exec(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getSpeculativeExecOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_speculative_exec(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} [node_address]
    * @param {Verbosity | undefined} [verbosity]
    */
    constructor(node_address, verbosity) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_new(ptr0, len0, isLikeNone(verbosity) ? 3 : verbosity);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {string | undefined} [node_address]
    * @returns {string}
    */
    getNodeAddress(node_address) {
        let deferred2_0;
        let deferred2_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.sdk_getNodeAddress(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred2_0 = r0;
            deferred2_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
    * @param {string | undefined} [node_address]
    */
    setNodeAddress(node_address) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.sdk_setNodeAddress(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    * @returns {Verbosity}
    */
    getVerbosity(verbosity) {
        const ret = wasm.sdk_getVerbosity(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
        return ret;
    }
    /**
    * @param {Verbosity | undefined} [verbosity]
    */
    setVerbosity(verbosity) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sdk_setVerbosity(retptr, this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
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
    transfer(amount, target_account, transfer_id, deploy_params, payment_params, verbosity, node_address) {
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
        var ptr5 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return takeObject(ret);
    }
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
    speculative_deploy(deploy_params, session_params, payment_params, maybe_block_id_as_string, maybe_block_identifier, verbosity, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        var ptr3 = isLikeNone(maybe_block_id_as_string) ? 0 : passStringToWasm0(maybe_block_id_as_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        let ptr4 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr4 = maybe_block_identifier.__destroy_into_raw();
        }
        var ptr5 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, ptr3, len3, ptr4, isLikeNone(verbosity) ? 3 : verbosity, ptr5, len5);
        return takeObject(ret);
    }
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
    make_deploy(deploy_params, session_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(deploy_params, DeployStrParams);
            var ptr0 = deploy_params.__destroy_into_raw();
            _assertClass(session_params, SessionStrParams);
            var ptr1 = session_params.__destroy_into_raw();
            _assertClass(payment_params, PaymentStrParams);
            var ptr2 = payment_params.__destroy_into_raw();
            wasm.sdk_make_deploy(retptr, this.__wbg_ptr, ptr0, ptr1, ptr2);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
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
    make_transfer(amount, target_account, transfer_id, deploy_params, payment_params) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
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
            wasm.sdk_make_transfer(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Deploy.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * Parsed auction info options as a `GetAuctionInfoOptions` struct.
    * @param {any} options
    * @returns {getAuctionInfoOptions}
    */
    get_auction_info_options(options) {
        const ret = wasm.sdk_get_auction_info_options(this.__wbg_ptr, addHeapObject(options));
        return getAuctionInfoOptions.__wrap(ret);
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
    * @param {getAuctionInfoOptions | undefined} [options]
    * @returns {Promise<GetAuctionInfoResult>}
    */
    get_auction_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getAuctionInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_auction_info(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
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
    get_node_status(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_node_status(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
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
    get_peers(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_peers(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
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
    get_validator_changes(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_validator_changes(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
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
    list_rpcs(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_list_rpcs(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
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
    put_deploy(deploy, verbosity, node_address) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * JS Alias for `put_deploy_js_alias`.
    *
    * This function provides an alternative name for `put_deploy_js_alias`.
    * @param {Deploy} deploy
    * @param {Verbosity | undefined} [verbosity]
    * @param {string | undefined} [node_address]
    * @returns {Promise<PutDeployResult>}
    */
    account_put_deploy(deploy, verbosity, node_address) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        var ptr1 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_account_put_deploy(this.__wbg_ptr, ptr0, isLikeNone(verbosity) ? 3 : verbosity, ptr1, len1);
        return takeObject(ret);
    }
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
    sign_deploy(deploy, secret_key) {
        _assertClass(deploy, Deploy);
        var ptr0 = deploy.__destroy_into_raw();
        const ptr1 = passStringToWasm0(secret_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_sign_deploy(this.__wbg_ptr, ptr0, ptr1, len1);
        return Deploy.__wrap(ret);
    }
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
    install(deploy_params, session_params, payment_amount, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_install(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return takeObject(ret);
    }
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
    deploy(deploy_params, session_params, payment_params, verbosity, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        _assertClass(payment_params, PaymentStrParams);
        var ptr2 = payment_params.__destroy_into_raw();
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_deploy(this.__wbg_ptr, ptr0, ptr1, ptr2, isLikeNone(verbosity) ? 3 : verbosity, ptr3, len3);
        return takeObject(ret);
    }
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
    get_chainspec(verbosity, node_address) {
        var ptr0 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_get_chainspec(this.__wbg_ptr, isLikeNone(verbosity) ? 3 : verbosity, ptr0, len0);
        return takeObject(ret);
    }
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
    speculative_transfer(amount, target_account, transfer_id, deploy_params, payment_params, maybe_block_id_as_string, maybe_block_identifier, verbosity, node_address) {
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
        var ptr5 = isLikeNone(maybe_block_id_as_string) ? 0 : passStringToWasm0(maybe_block_id_as_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        let ptr6 = 0;
        if (!isLikeNone(maybe_block_identifier)) {
            _assertClass(maybe_block_identifier, BlockIdentifier);
            ptr6 = maybe_block_identifier.__destroy_into_raw();
        }
        var ptr7 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_speculative_transfer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, ptr4, ptr5, len5, ptr6, isLikeNone(verbosity) ? 3 : verbosity, ptr7, len7);
        return takeObject(ret);
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
        const ret = wasm.sdk_get_balance_options(this.__wbg_ptr, addHeapObject(options));
        return getBalanceOptions.__wrap(ret);
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
    * @param {getBalanceOptions | undefined} [options]
    * @returns {Promise<GetBalanceResult>}
    */
    get_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_balance(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
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
    state_get_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_balance(this.__wbg_ptr, ptr0);
        return takeObject(ret);
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
        const ret = wasm.sdk_get_block_options(this.__wbg_ptr, addHeapObject(options));
        return getBlockOptions.__wrap(ret);
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
    * @param {getBlockOptions | undefined} [options]
    * @returns {Promise<GetBlockResult>}
    */
    get_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
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
    chain_get_block(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_chain_get_block(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * @param {any} options
    * @returns {getEraInfoOptions}
    */
    get_era_info_options(options) {
        const ret = wasm.sdk_get_era_info_options(this.__wbg_ptr, addHeapObject(options));
        return getEraInfoOptions.__wrap(ret);
    }
    /**
    * @param {getEraInfoOptions | undefined} [options]
    * @returns {Promise<GetEraInfoResult>}
    */
    get_era_info(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraInfoOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_info(this.__wbg_ptr, ptr0);
        return takeObject(ret);
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
        const ret = wasm.sdk_get_era_summary_options(this.__wbg_ptr, addHeapObject(options));
        return getEraSummaryOptions.__wrap(ret);
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
    * @param {getEraSummaryOptions | undefined} [options]
    * @returns {Promise<GetEraSummaryResult>}
    */
    get_era_summary(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getEraSummaryOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_era_summary(this.__wbg_ptr, ptr0);
        return takeObject(ret);
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
        const ret = wasm.sdk_query_global_state_options(this.__wbg_ptr, addHeapObject(options));
        return queryGlobalStateOptions.__wrap(ret);
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
    * @param {queryGlobalStateOptions | undefined} [options]
    * @returns {Promise<QueryGlobalStateResult>}
    */
    query_global_state(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryGlobalStateOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_global_state(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Creates a new DeployWatcher instance to watch deploys.
    *
    * # Arguments
    *
    * * `events_url` - The URL to monitor for deploy events.
    * * `timeout_duration` - An optional timeout duration in seconds.
    *
    * # Returns
    *
    * A `DeployWatcher` instance.
    * @param {string} events_url
    * @param {bigint | undefined} [timeout_duration]
    * @returns {DeployWatcher}
    */
    watch_deploy(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_watch_deploy(this.__wbg_ptr, ptr0, len0, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? BigInt(0) : timeout_duration);
        return DeployWatcher.__wrap(ret);
    }
    /**
    * Creates a new DeployWatcher instance to watch deploys (JavaScript-friendly).
    *
    * # Arguments
    *
    * * `events_url` - The URL to monitor for deploy events.
    * * `timeout_duration` - An optional timeout duration in seconds.
    *
    * # Returns
    *
    * A `DeployWatcher` instance.
    * @param {string} events_url
    * @param {number | undefined} [timeout_duration]
    * @returns {DeployWatcher}
    */
    watchDeploy(events_url, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_watchDeploy(this.__wbg_ptr, ptr0, len0, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? 0 : timeout_duration);
        return DeployWatcher.__wrap(ret);
    }
    /**
    * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
    *
    * # Arguments
    *
    * * `events_url` - The URL to monitor for deploy events.
    * * `deploy_hash` - The deploy hash to wait for.
    * * `timeout_duration` - An optional timeout duration in seconds.
    *
    * # Returns
    *
    * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
    * @param {string} events_url
    * @param {string} deploy_hash
    * @param {number | undefined} [timeout_duration]
    * @returns {Promise<Promise<any>>}
    */
    waitDeploy(events_url, deploy_hash, timeout_duration) {
        const ptr0 = passStringToWasm0(events_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(deploy_hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_waitDeploy(this.__wbg_ptr, ptr0, len0, ptr1, len1, !isLikeNone(timeout_duration), isLikeNone(timeout_duration) ? 0 : timeout_duration);
        return takeObject(ret);
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
        const ret = wasm.sdk_get_block_transfers_options(this.__wbg_ptr, addHeapObject(options));
        return getBlockTransfersOptions.__wrap(ret);
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
    * @param {getBlockTransfersOptions | undefined} [options]
    * @returns {Promise<GetBlockTransfersResult>}
    */
    get_block_transfers(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getBlockTransfersOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_block_transfers(this.__wbg_ptr, ptr0);
        return takeObject(ret);
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
        const ret = wasm.sdk_get_dictionary_item_options(this.__wbg_ptr, addHeapObject(options));
        return getDictionaryItemOptions.__wrap(ret);
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
    * @param {getDictionaryItemOptions | undefined} [options]
    * @returns {Promise<GetDictionaryItemResult>}
    */
    get_dictionary_item(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDictionaryItemOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_get_dictionary_item(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * JS Alias for `get_dictionary_item_js_alias`
    * @param {getDictionaryItemOptions | undefined} [options]
    * @returns {Promise<GetDictionaryItemResult>}
    */
    state_get_dictionary_item(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, getDictionaryItemOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_state_get_dictionary_item(this.__wbg_ptr, ptr0);
        return takeObject(ret);
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
        const ret = wasm.sdk_query_balance_options(this.__wbg_ptr, addHeapObject(options));
        return queryBalanceOptions.__wrap(ret);
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
    * @param {queryBalanceOptions | undefined} [options]
    * @returns {Promise<QueryBalanceResult>}
    */
    query_balance(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryBalanceOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_balance(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
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
    call_entrypoint(deploy_params, session_params, payment_amount, node_address) {
        _assertClass(deploy_params, DeployStrParams);
        var ptr0 = deploy_params.__destroy_into_raw();
        _assertClass(session_params, SessionStrParams);
        var ptr1 = session_params.__destroy_into_raw();
        const ptr2 = passStringToWasm0(payment_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(node_address) ? 0 : passStringToWasm0(node_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.sdk_call_entrypoint(this.__wbg_ptr, ptr0, ptr1, ptr2, len2, ptr3, len3);
        return takeObject(ret);
    }
    /**
    * Deserialize query_contract_dict_options from a JavaScript object.
    * @param {any} options
    * @returns {queryContractDictOptions}
    */
    query_contract_dict_options(options) {
        const ret = wasm.sdk_query_contract_dict_options(this.__wbg_ptr, addHeapObject(options));
        return queryContractDictOptions.__wrap(ret);
    }
    /**
    * JavaScript alias for query_contract_dict with deserialized options.
    * @param {queryContractDictOptions | undefined} [options]
    * @returns {Promise<GetDictionaryItemResult>}
    */
    query_contract_dict(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryContractDictOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_contract_dict(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
    /**
    * Deserialize query_contract_key_options from a JavaScript object.
    * @param {any} options
    * @returns {queryContractKeyOptions}
    */
    query_contract_key_options(options) {
        const ret = wasm.sdk_query_contract_key_options(this.__wbg_ptr, addHeapObject(options));
        return queryContractKeyOptions.__wrap(ret);
    }
    /**
    * JavaScript alias for query_contract_key with deserialized options.
    * @param {queryContractKeyOptions | undefined} [options]
    * @returns {Promise<QueryGlobalStateResult>}
    */
    query_contract_key(options) {
        let ptr0 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, queryContractKeyOptions);
            ptr0 = options.__destroy_into_raw();
        }
        const ret = wasm.sdk_query_contract_key(this.__wbg_ptr, ptr0);
        return takeObject(ret);
    }
}
module.exports.SDK = SDK;

const SessionStrParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sessionstrparams_free(ptr >>> 0));
/**
*/
class SessionStrParams {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SessionStrParamsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sessionstrparams_free(ptr);
    }
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
    constructor(session_hash, session_name, session_package_hash, session_package_name, session_path, session_bytes, session_args_simple, session_args_json, session_args_complex, session_version, session_entry_point, is_session_transfer) {
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
        var ptr7 = isLikeNone(session_args_complex) ? 0 : passStringToWasm0(session_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len7 = WASM_VECTOR_LEN;
        var ptr8 = isLikeNone(session_version) ? 0 : passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len8 = WASM_VECTOR_LEN;
        var ptr9 = isLikeNone(session_entry_point) ? 0 : passStringToWasm0(session_entry_point, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len9 = WASM_VECTOR_LEN;
        const ret = wasm.sessionstrparams_new(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, isLikeNone(session_args_simple) ? 0 : addHeapObject(session_args_simple), ptr6, len6, ptr7, len7, ptr8, len8, ptr9, len9, isLikeNone(is_session_transfer) ? 0xFFFFFF : is_session_transfer ? 1 : 0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {string | undefined}
    */
    get session_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get session_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get session_package_hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_package_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get session_package_name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_package_name(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get session_path() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_path(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {Bytes | undefined}
    */
    get session_bytes() {
        const ret = wasm.sessionstrparams_session_bytes(this.__wbg_ptr);
        return ret === 0 ? undefined : Bytes.__wrap(ret);
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
    * @returns {ArgsSimple | undefined}
    */
    get session_args_simple() {
        const ret = wasm.sessionstrparams_session_args_simple(this.__wbg_ptr);
        return ret === 0 ? undefined : ArgsSimple.__wrap(ret);
    }
    /**
    * @param {Array<any>} session_args_simple
    */
    set session_args_simple(session_args_simple) {
        wasm.sessionstrparams_set_session_args_simple(this.__wbg_ptr, addHeapObject(session_args_simple));
    }
    /**
    * @returns {string | undefined}
    */
    get session_args_json() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_args_json(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string | undefined}
    */
    get session_args_complex() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_args_complex(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_args_complex
    */
    set session_args_complex(session_args_complex) {
        const ptr0 = passStringToWasm0(session_args_complex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_args_complex(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_version() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_version(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} session_version
    */
    set session_version(session_version) {
        const ptr0 = passStringToWasm0(session_version, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionstrparams_set_session_version(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get session_entry_point() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sessionstrparams_session_entry_point(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {boolean | undefined}
    */
    get is_session_transfer() {
        const ret = wasm.sessionstrparams_is_session_transfer(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean} is_session_transfer
    */
    set is_session_transfer(is_session_transfer) {
        wasm.sessionstrparams_set_is_session_transfer(this.__wbg_ptr, is_session_transfer);
    }
}
module.exports.SessionStrParams = SessionStrParams;

const SpeculativeExecResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_speculativeexecresult_free(ptr >>> 0));
/**
*/
class SpeculativeExecResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_speculativeexecresult_free(ptr);
    }
    /**
    * Get the API version of the result.
    * @returns {any}
    */
    get api_version() {
        const ret = wasm.speculativeexecresult_api_version(this.__wbg_ptr);
        return takeObject(ret);
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
        return takeObject(ret);
    }
    /**
    * Convert the result to JSON format.
    * @returns {any}
    */
    toJson() {
        const ret = wasm.speculativeexecresult_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.SpeculativeExecResult = SpeculativeExecResult;

const SuccessFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_success_free(ptr >>> 0));
/**
* Represents a success response containing a cost value.
*/
class Success {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Success.prototype);
        obj.__wbg_ptr = ptr;
        SuccessFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SuccessFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_success_free(ptr);
    }
    /**
    * @returns {string}
    */
    get cost() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_deployprocessed_deploy_hash(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} arg0
    */
    set cost(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_deployprocessed_deploy_hash(this.__wbg_ptr, ptr0, len0);
    }
}
module.exports.Success = Success;

const TransferAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferaddr_free(ptr >>> 0));
/**
*/
class TransferAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_transferaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.transferaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    to_bytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transferaddr_to_bytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TransferAddr = TransferAddr;

const URefFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_uref_free(ptr >>> 0));
/**
*/
class URef {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_uref_free(ptr);
    }
    /**
    * @param {string} uref_hex_str
    * @param {number} access_rights
    */
    constructor(uref_hex_str, access_rights) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(uref_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.uref_new(retptr, ptr0, len0, access_rights);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
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
    * @returns {string}
    */
    toFormattedString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.uref_toFormattedString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {any}
    */
    toJson() {
        const ret = wasm.uref_toJson(this.__wbg_ptr);
        return takeObject(ret);
    }
}
module.exports.URef = URef;

const URefAddrFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_urefaddr_free(ptr >>> 0));
/**
*/
class URefAddr {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_urefaddr_free(ptr);
    }
    /**
    * @param {Uint8Array} bytes
    */
    constructor(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.urefaddr_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.URefAddr = URefAddr;

const getAccountOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getaccountoptions_free(ptr >>> 0));
/**
*/
class getAccountOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getaccountoptions_free(ptr);
    }
    /**
    * @returns {AccountIdentifier | undefined}
    */
    get account_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_account_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : AccountIdentifier.__wrap(ret);
    }
    /**
    * @param {AccountIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get account_identifier_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_account_identifier_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set account_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_account_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getaccountoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getaccountoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getaccountoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getaccountoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getAccountOptions = getAccountOptions;

const getAuctionInfoOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getauctioninfooptions_free(ptr >>> 0));
/**
* Options for the `get_auction_info` method.
*/
class getAuctionInfoOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getauctioninfooptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getauctioninfooptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getauctioninfooptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getauctioninfooptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getauctioninfooptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getauctioninfooptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getauctioninfooptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getauctioninfooptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getAuctionInfoOptions = getAuctionInfoOptions;

const getBalanceOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getbalanceoptions_free(ptr >>> 0));
/**
* Options for the `get_balance` method.
*/
class getBalanceOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getbalanceoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_eventparseresult_err(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_eventparseresult_err(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getbalanceoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get purse_uref_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getbalanceoptions_purse_uref_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set purse_uref_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_purse_uref_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {URef | undefined}
    */
    get purse_uref() {
        const ret = wasm.__wbg_get_getbalanceoptions_purse_uref(this.__wbg_ptr);
        return ret === 0 ? undefined : URef.__wrap(ret);
    }
    /**
    * @param {URef | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getbalanceoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getbalanceoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getbalanceoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getbalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getBalanceOptions = getBalanceOptions;

const getBlockOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblockoptions_free(ptr >>> 0));
/**
* Options for the `get_block` method.
*/
class getBlockOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getblockoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblockoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getblockoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getblockoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getBlockOptions = getBlockOptions;

const getBlockTransfersOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getblocktransfersoptions_free(ptr >>> 0));
/**
* Options for the `get_block_transfers` method.
*/
class getBlockTransfersOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getblocktransfersoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblocktransfersoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblocktransfersoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblocktransfersoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
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
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getblocktransfersoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getblocktransfersoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblocktransfersoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblocktransfersoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
}
module.exports.getBlockTransfersOptions = getBlockTransfersOptions;

const getDeployOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdeployoptions_free(ptr >>> 0));
/**
* Options for the `get_deploy` method.
*/
class getDeployOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getdeployoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get deploy_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdeployoptions_deploy_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set deploy_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_deploy_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {DeployHash | undefined}
    */
    get deploy_hash() {
        const ret = wasm.__wbg_get_getdeployoptions_deploy_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : DeployHash.__wrap(ret);
    }
    /**
    * @param {DeployHash | undefined} [arg0]
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
    * @returns {boolean | undefined}
    */
    get finalized_approvals() {
        const ret = wasm.__wbg_get_getdeployoptions_finalized_approvals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean | undefined} [arg0]
    */
    set finalized_approvals(arg0) {
        wasm.__wbg_set_getdeployoptions_finalized_approvals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdeployoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdeployoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getdeployoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getdeployoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getDeployOptions = getDeployOptions;

const getDictionaryItemOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getdictionaryitemoptions_free(ptr >>> 0));
/**
* Options for the `get_dictionary_item` method.
*/
class getDictionaryItemOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getdictionaryitemoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
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
    * @returns {DictionaryItemStrParams | undefined}
    */
    get dictionary_item_params() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
    }
    /**
    * @param {DictionaryItemStrParams | undefined} [arg0]
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
    * @returns {DictionaryItemIdentifier | undefined}
    */
    get dictionary_item_identifier() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
    }
    /**
    * @param {DictionaryItemIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getdictionaryitemoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getDictionaryItemOptions = getDictionaryItemOptions;

const getEraInfoOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterainfooptions_free(ptr >>> 0));
/**
*/
class getEraInfoOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_geterainfooptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblockoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getblockoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getblockoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getEraInfoOptions = getEraInfoOptions;

const getEraSummaryOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geterasummaryoptions_free(ptr >>> 0));
/**
* Options for the `get_era_summary` method.
*/
class getEraSummaryOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_geterasummaryoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getblockoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getblockoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getblockoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getblockoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getblockoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getEraSummaryOptions = getEraSummaryOptions;

const getSpeculativeExecOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getspeculativeexecoptions_free(ptr >>> 0));
/**
* Options for speculative execution.
*/
class getSpeculativeExecOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(getSpeculativeExecOptions.prototype);
        obj.__wbg_ptr = ptr;
        getSpeculativeExecOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        getSpeculativeExecOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_getspeculativeexecoptions_free(ptr);
    }
    /**
    * The deploy as a JSON string.
    * @returns {string | undefined}
    */
    get deploy_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexecoptions_deploy_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The deploy as a JSON string.
    * @param {string | undefined} [arg0]
    */
    set deploy_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecoptions_deploy_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The deploy to execute.
    * @returns {Deploy | undefined}
    */
    get deploy() {
        const ret = wasm.__wbg_get_getspeculativeexecoptions_deploy(this.__wbg_ptr);
        return ret === 0 ? undefined : Deploy.__wrap(ret);
    }
    /**
    * The deploy to execute.
    * @param {Deploy | undefined} [arg0]
    */
    set deploy(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Deploy);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexecoptions_deploy(this.__wbg_ptr, ptr0);
    }
    /**
    * The block identifier as a string.
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexecoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The block identifier as a string.
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The block identifier.
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getspeculativeexecoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * The block identifier.
    * @param {BlockIdentifier | undefined} [arg0]
    */
    set maybe_block_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BlockIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_getspeculativeexecoptions_maybe_block_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * The node address.
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getspeculativeexecoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * The node address.
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getspeculativeexecoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * The verbosity level for logging.
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getspeculativeexecoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * The verbosity level for logging.
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getspeculativeexecoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getSpeculativeExecOptions = getSpeculativeExecOptions;

const getStateRootHashOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_getstateroothashoptions_free(ptr >>> 0));
/**
* Options for the `get_state_root_hash` method.
*/
class getStateRootHashOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_getstateroothashoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getstateroothashoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getstateroothashoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {BlockIdentifier | undefined}
    */
    get maybe_block_identifier() {
        const ret = wasm.__wbg_get_getaccountoptions_maybe_block_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : BlockIdentifier.__wrap(ret);
    }
    /**
    * @param {BlockIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getstateroothashoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getstateroothashoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getstateroothashoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getstateroothashoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.getStateRootHashOptions = getStateRootHashOptions;

const queryBalanceOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querybalanceoptions_free(ptr >>> 0));
/**
* Options for the `query_balance` method.
*/
class queryBalanceOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_querybalanceoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get purse_identifier_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_purse_identifier_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set purse_identifier_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_purse_identifier_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {PurseIdentifier | undefined}
    */
    get purse_identifier() {
        const ret = wasm.__wbg_get_querybalanceoptions_purse_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : PurseIdentifier.__wrap(ret);
    }
    /**
    * @param {PurseIdentifier | undefined} [arg0]
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
    * @returns {GlobalStateIdentifier | undefined}
    */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_querybalanceoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {GlobalStateIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querybalanceoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querybalanceoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querybalanceoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_querybalanceoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_querybalanceoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.queryBalanceOptions = queryBalanceOptions;

const queryContractDictOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querycontractdictoptions_free(ptr >>> 0));
/**
*/
class queryContractDictOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_querycontractdictoptions_free(ptr);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
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
    * @returns {DictionaryItemStrParams | undefined}
    */
    get dictionary_item_params() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_params(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemStrParams.__wrap(ret);
    }
    /**
    * @param {DictionaryItemStrParams | undefined} [arg0]
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
    * @returns {DictionaryItemIdentifier | undefined}
    */
    get dictionary_item_identifier() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_dictionary_item_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : DictionaryItemIdentifier.__wrap(ret);
    }
    /**
    * @param {DictionaryItemIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_getdictionaryitemoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_getdictionaryitemoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_getdictionaryitemoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_getdictionaryitemoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.queryContractDictOptions = queryContractDictOptions;

const queryContractKeyOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_querycontractkeyoptions_free(ptr >>> 0));
/**
*/
class queryContractKeyOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_querycontractkeyoptions_free(ptr);
    }
    /**
    * @returns {GlobalStateIdentifier | undefined}
    */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {GlobalStateIdentifier | undefined} [arg0]
    */
    set global_state_identifier(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, GlobalStateIdentifier);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_global_state_identifier(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
    */
    set state_root_hash(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Digest);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_state_root_hash(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get contract_key_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_contract_key_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set contract_key_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_contract_key_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Key | undefined}
    */
    get contract_key() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_contract_key(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
    /**
    * @param {Key | undefined} [arg0]
    */
    set contract_key(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Key);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_querycontractkeyoptions_contract_key(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {string | undefined}
    */
    get path_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_path_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set path_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Path | undefined}
    */
    get path() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_path(this.__wbg_ptr);
        return ret === 0 ? undefined : Path.__wrap(ret);
    }
    /**
    * @param {Path | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_querycontractkeyoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_querycontractkeyoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_querycontractkeyoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_querycontractkeyoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.queryContractKeyOptions = queryContractKeyOptions;

const queryGlobalStateOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_queryglobalstateoptions_free(ptr >>> 0));
/**
* Options for the `query_global_state` method.
*/
class queryGlobalStateOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
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
        wasm.__wbg_queryglobalstateoptions_free(ptr);
    }
    /**
    * @returns {GlobalStateIdentifier | undefined}
    */
    get global_state_identifier() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_global_state_identifier(this.__wbg_ptr);
        return ret === 0 ? undefined : GlobalStateIdentifier.__wrap(ret);
    }
    /**
    * @param {GlobalStateIdentifier | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get state_root_hash_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_state_root_hash_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set state_root_hash_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_state_root_hash_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Digest | undefined}
    */
    get state_root_hash() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_state_root_hash(this.__wbg_ptr);
        return ret === 0 ? undefined : Digest.__wrap(ret);
    }
    /**
    * @param {Digest | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get maybe_block_id_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_maybe_block_id_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set maybe_block_id_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_maybe_block_id_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {string | undefined}
    */
    get key_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_key_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set key_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_key_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Key | undefined}
    */
    get key() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_key(this.__wbg_ptr);
        return ret === 0 ? undefined : Key.__wrap(ret);
    }
    /**
    * @param {Key | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get path_as_string() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_path_as_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set path_as_string(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_path_as_string(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Path | undefined}
    */
    get path() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_path(this.__wbg_ptr);
        return ret === 0 ? undefined : Path.__wrap(ret);
    }
    /**
    * @param {Path | undefined} [arg0]
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
    * @returns {string | undefined}
    */
    get node_address() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_queryglobalstateoptions_node_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1).slice();
                wasm.__wbindgen_free(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string | undefined} [arg0]
    */
    set node_address(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_queryglobalstateoptions_node_address(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {Verbosity | undefined}
    */
    get verbosity() {
        const ret = wasm.__wbg_get_queryglobalstateoptions_verbosity(this.__wbg_ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @param {Verbosity | undefined} [arg0]
    */
    set verbosity(arg0) {
        wasm.__wbg_set_queryglobalstateoptions_verbosity(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
    }
}
module.exports.queryGlobalStateOptions = queryGlobalStateOptions;

module.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

module.exports.__wbg_getpeersresult_new = function(arg0) {
    const ret = GetPeersResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_querybalanceresult_new = function(arg0) {
    const ret = QueryBalanceResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getchainspecresult_new = function(arg0) {
    const ret = GetChainspecResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getstateroothashresult_new = function(arg0) {
    const ret = GetStateRootHashResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_putdeployresult_new = function(arg0) {
    const ret = PutDeployResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getblocktransfersresult_new = function(arg0) {
    const ret = GetBlockTransfersResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getvalidatorchangesresult_new = function(arg0) {
    const ret = GetValidatorChangesResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getauctioninforesult_new = function(arg0) {
    const ret = GetAuctionInfoResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getaccountresult_new = function(arg0) {
    const ret = GetAccountResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_error_82cd4adbafcf90ca = function(arg0, arg1) {
    console.error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_listrpcsresult_new = function(arg0) {
    const ret = ListRpcsResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbg_speculativeexecresult_new = function(arg0) {
    const ret = SpeculativeExecResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getbalanceresult_new = function(arg0) {
    const ret = GetBalanceResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getnodestatusresult_new = function(arg0) {
    const ret = GetNodeStatusResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getblockresult_new = function(arg0) {
    const ret = GetBlockResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_queryglobalstateresult_new = function(arg0) {
    const ret = QueryGlobalStateResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getdeployresult_new = function(arg0) {
    const ret = GetDeployResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_getdictionaryitemresult_new = function(arg0) {
    const ret = GetDictionaryItemResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_geterainforesult_new = function(arg0) {
    const ret = GetEraInfoResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_geterasummaryresult_new = function(arg0) {
    const ret = GetEraSummaryResult.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

module.exports.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
};

module.exports.__wbg_deploysubscription_unwrap = function(arg0) {
    const ret = DeploySubscription.__unwrap(takeObject(arg0));
    return ret;
};

module.exports.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbindgen_is_null = function(arg0) {
    const ret = getObject(arg0) === null;
    return ret;
};

module.exports.__wbg_fetch_27eb4c0a08a9ca04 = function(arg0) {
    const ret = fetch(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_getReader_ab94afcb5cb7689a = function() { return handleError(function (arg0) {
    const ret = getObject(arg0).getReader();
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_done_2ffa852272310e47 = function(arg0) {
    const ret = getObject(arg0).done;
    return ret;
};

module.exports.__wbg_value_9f6eeb1e2aab8d96 = function(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
};

module.exports.__wbg_queueMicrotask_f61ee94ee663068b = function(arg0) {
    queueMicrotask(getObject(arg0));
};

module.exports.__wbg_queueMicrotask_f82fc5d1e8f816ae = function(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_function = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

module.exports.__wbg_fetch_10edd7d7da150227 = function(arg0, arg1) {
    const ret = getObject(arg0).fetch(getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_close_23aa806471e38253 = function() { return handleError(function (arg0) {
    getObject(arg0).close();
}, arguments) };

module.exports.__wbg_enqueue_fe9e340e2bc8714b = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).enqueue(getObject(arg1));
}, arguments) };

module.exports.__wbg_signal_8fbb4942ce477464 = function(arg0) {
    const ret = getObject(arg0).signal;
    return addHeapObject(ret);
};

module.exports.__wbg_new_92cc7d259297256c = function() { return handleError(function () {
    const ret = new AbortController();
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_abort_510372063dd66b29 = function(arg0) {
    getObject(arg0).abort();
};

module.exports.__wbg_view_38a0bacb59ad00ee = function(arg0) {
    const ret = getObject(arg0).view;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

module.exports.__wbg_respond_fee44bba73c2fc8a = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).respond(arg1 >>> 0);
}, arguments) };

module.exports.__wbg_read_722b60348ee60ba4 = function(arg0) {
    const ret = getObject(arg0).read();
    return addHeapObject(ret);
};

module.exports.__wbg_releaseLock_9abbb19bbd28d135 = function(arg0) {
    getObject(arg0).releaseLock();
};

module.exports.__wbg_cancel_d613d42f6648dd41 = function(arg0) {
    const ret = getObject(arg0).cancel();
    return addHeapObject(ret);
};

module.exports.__wbg_instanceof_Response_b5451a06784a2404 = function(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Response;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_url_e319aee56d26ddf1 = function(arg0, arg1) {
    const ret = getObject(arg1).url;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_status_bea567d1049f0b6a = function(arg0) {
    const ret = getObject(arg0).status;
    return ret;
};

module.exports.__wbg_headers_96d9457941f08a33 = function(arg0) {
    const ret = getObject(arg0).headers;
    return addHeapObject(ret);
};

module.exports.__wbg_body_ae90eac1f3537ef5 = function(arg0) {
    const ret = getObject(arg0).body;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

module.exports.__wbg_arrayBuffer_eb2005809be09726 = function() { return handleError(function (arg0) {
    const ret = getObject(arg0).arrayBuffer();
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_new_4db22fd5d40c5665 = function() { return handleError(function () {
    const ret = new Headers();
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_append_b2e8ed692fc5eb6e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

module.exports.__wbg_newwithstrandinit_11fbc38beb4c26b0 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_byobRequest_643426f0037311f0 = function(arg0) {
    const ret = getObject(arg0).byobRequest;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

module.exports.__wbg_close_0b618a762cdb578b = function() { return handleError(function (arg0) {
    getObject(arg0).close();
}, arguments) };

module.exports.__wbg_crypto_d05b68a3572bb8ca = function(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

module.exports.__wbg_process_b02b3570280d0366 = function(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

module.exports.__wbg_versions_c1cb42213cedf0f5 = function(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

module.exports.__wbg_node_43b1089f407e4ec2 = function(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_string = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

module.exports.__wbg_msCrypto_10fc94afee92bd76 = function(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

module.exports.__wbg_require_9a7e0f667ead4995 = function() { return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_randomFillSync_b70ccbdf4926a99d = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
}, arguments) };

module.exports.__wbg_getRandomValues_7e42b4fb8779dc6d = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

module.exports.__wbg_get_0ee8ea3c7c984c45 = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};

module.exports.__wbg_length_161c0d89c6535c1d = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_new_75208e29bddfd88c = function() {
    const ret = new Array();
    return addHeapObject(ret);
};

module.exports.__wbg_newnoargs_cfecb3965268594c = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_next_586204376d2ed373 = function(arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
};

module.exports.__wbg_next_b2d3366343a208b3 = function() { return handleError(function (arg0) {
    const ret = getObject(arg0).next();
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_done_90b14d6f6eacc42f = function(arg0) {
    const ret = getObject(arg0).done;
    return ret;
};

module.exports.__wbg_value_3158be908c80a75e = function(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
};

module.exports.__wbg_iterator_40027cdd598da26b = function() {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
};

module.exports.__wbg_get_3fddfed2c83f434c = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_call_3f093dd26d5569f8 = function() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_new_632630b5cec17f21 = function() {
    const ret = new Object();
    return addHeapObject(ret);
};

module.exports.__wbg_self_05040bd9523805b9 = function() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_window_adc720039f2cb14f = function() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_globalThis_622105db80c1457d = function() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_global_f56b013ed9bcf359 = function() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_push_0239ee92f127e807 = function(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

module.exports.__wbg_new_73a5987615ec8862 = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_apply_2ed8aac218b83e42 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).apply(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_call_67f2111acd2dfdb6 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_getTime_0e03c3f524be31ef = function(arg0) {
    const ret = getObject(arg0).getTime();
    return ret;
};

module.exports.__wbg_new0_7a6141101f2206da = function() {
    const ret = new Date();
    return addHeapObject(ret);
};

module.exports.__wbg_instanceof_Object_4abbcd5d20d5f7df = function(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Object;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_new_70828a4353259d4b = function(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_796(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

module.exports.__wbg_resolve_5da6faf2c96fd1d5 = function(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_catch_cd2ed55c8688225d = function(arg0, arg1) {
    const ret = getObject(arg0).catch(getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_then_f9e58f5a50f43eae = function(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_then_20a5920e447d1cb1 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

module.exports.__wbg_buffer_b914fb8b50ebbc3e = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_new_b1f2d6842d615181 = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_set_7d988c98e6ced92d = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_length_21c4b0ae73cba59d = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_newwithlength_0d03cef43b68a530 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_buffer_67e624f5a0ab2319 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_subarray_adc418253d76e2f1 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_byteLength_4f4b58172d990c0a = function(arg0) {
    const ret = getObject(arg0).byteLength;
    return ret;
};

module.exports.__wbg_byteOffset_adbd2a554609eb4e = function(arg0) {
    const ret = getObject(arg0).byteOffset;
    return ret;
};

module.exports.__wbg_getindex_25dd2331a4ab0671 = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return ret;
};

module.exports.__wbg_parse_1ed8bea2409da238 = function() { return handleError(function (arg0, arg1) {
    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_stringify_865daa6fb8c83d5a = function() { return handleError(function (arg0) {
    const ret = JSON.stringify(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_has_ad45eb020184f624 = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.has(getObject(arg0), getObject(arg1));
    return ret;
}, arguments) };

module.exports.__wbg_set_961700853a212a39 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
}, arguments) };

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

module.exports.__wbindgen_closure_wrapper4061 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 834, __wbg_adapter_32);
    return addHeapObject(ret);
};

module.exports.__wbindgen_closure_wrapper4170 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 875, __wbg_adapter_35);
    return addHeapObject(ret);
};

const path = require('path').join(__dirname, 'casper_rust_wasm_sdk_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

