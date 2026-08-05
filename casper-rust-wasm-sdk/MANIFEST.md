# Vendored casper-rust-wasm-sdk packs

| Field | Value |
| --- | --- |
| SDK version | 2.2.2 |
| SDK git SHA | `1efdb58319651253783c3393d140e4dcfcb15a2c` (`1efdb583`) |
| Built with | `make pack-deployer` |

## Feature sets

| Pack | Target | Cargo features |
| --- | --- | --- |
| `pkg/` | browser (web) | `transaction,helpers,watcher` (`--no-default-features`) |
| `pkg-nodejs/` | Node (Nest API) | `transaction,deploy,helpers` (`--no-default-features`) |

Dropped vs full default: `binary-port`, `contract`; browser also drops `deploy`; Node also drops `watcher`.

## Wasm sizes

| File | Bytes |
| --- | --- |
| `pkg/casper_rust_wasm_sdk_bg.wasm` | 2853989 |
| `pkg-nodejs/casper_rust_wasm_sdk_bg.wasm` | 2868926 |

Refresh locally from a sibling SDK checkout:

```shell
cd /path/to/casper-rust-wasm-sdk && make pack-deployer
rm -rf casper-rust-wasm-sdk/pkg casper-rust-wasm-sdk/pkg-nodejs
cp -a /path/to/casper-rust-wasm-sdk/pkg casper-rust-wasm-sdk/pkg
cp -a /path/to/casper-rust-wasm-sdk/pkg-nodejs casper-rust-wasm-sdk/pkg-nodejs
cd www && npm install
```
