# Vendored casper-rust-wasm-sdk packs

| Field | Value |
| --- | --- |
| SDK version | 2.2.2 |
| SDK git SHA | `1efdb58319651253783c3393d140e4dcfcb15a2c` (`1efdb583`) |
| Built with | deployer `refresh-slim-sdk-packs` / local `wasm-pack` slim flags |

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

Refresh locally from a sibling SDK checkout (or run Actions → `refresh-slim-sdk-packs`):

```shell
cd /path/to/casper-rust-wasm-sdk
wasm-pack build --target web --release --out-dir pkg . \
  --no-default-features --features transaction,helpers,watcher
wasm-pack build --target nodejs --release --out-dir pkg-nodejs . \
  --no-default-features --features transaction,deploy,helpers
jq '.name = "casper-rust-wasm-sdk-nodejs"' pkg-nodejs/package.json > pkg-nodejs/package.json.tmp \
  && mv pkg-nodejs/package.json.tmp pkg-nodejs/package.json
rm -rf /path/to/casper-deployer/casper-rust-wasm-sdk/pkg \
       /path/to/casper-deployer/casper-rust-wasm-sdk/pkg-nodejs
cp -a pkg /path/to/casper-deployer/casper-rust-wasm-sdk/pkg
cp -a pkg-nodejs /path/to/casper-deployer/casper-rust-wasm-sdk/pkg-nodejs
cd /path/to/casper-deployer/www && npm install
```
