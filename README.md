# Casper Deployer

Angular + NestJS + Nx app for querying and submitting work to the **Casper 2.x** network, powered by [casper-rust-wasm-sdk](https://github.com/casper-ecosystem/casper-rust-wasm-sdk) **2.2.2**.

Live (beta): [https://casper.onrender.com/](https://casper.onrender.com/)

## What it does

- Connect with [Casper Wallet](https://casperwallet.io)
- Pick a network peer (localhost / testnet / mainnet / custom)
- Query state root hash, global state, dictionary items, balances
- Build, sign, and send **transactions** (Casper 2.x) via the NestJS RPC proxy

Browser calls never talk to public nodes directly for RPC — the Nest API (`/api/deployer/*`) runs the Node WASM SDK server-side to avoid CORS.

## Stack

| Layer       | Tech                                                  |
| ----------- | ----------------------------------------------------- |
| Frontend    | Angular 21, Nx, Tailwind                              |
| API         | NestJS 11 (JSON-RPC facade + SSE proxy)               |
| Casper      | `casper-rust-wasm-sdk` 2.2.2 (browser + nodejs packs) |
| Helper WASM | `wasm/` crate (`deployer`) for small encoding helpers |
| Tests       | Jest, Cypress                                         |
| Hosting     | Docker / Render (`PORT`, default `4242`)              |

## Repository layout

- `casper-rust-wasm-sdk/` — vendored browser (`pkg`) and Node (`pkg-nodejs`) SDK builds
- `docker/` — Dockerfile + compose (build from **repo root**)
- `wasm/` — small custom Rust/WASM helpers
- `www/` — Nx monorepo (frontend + api)

## Networks

Configured in [`www/libs/util/config/src/config.ts`](www/libs/util/config/src/config.ts):

| Network            | Default RPC                           | Chain name      | SSE                                             |
| ------------------ | ------------------------------------- | --------------- | ----------------------------------------------- |
| Localhost (NCTL 2) | `http://localhost:11101`              | `casper-net-1`  | `http://localhost:18101/events` (1110N → 1810N) |
| Testnet            | `https://node.testnet.casper.network` | `casper-test`   | `…/events`                                      |
| Mainnet            | `https://node.mainnet.casper.network` | `casper`        | `…/events`                                      |
| Custom             | user-supplied URL                     | editable (kept) | same host `/events`                             |

Legacy launcher ports **7777/9999** and integration presets are removed. Local target: [casper-nctl-2-docker](https://github.com/gRoussac/casper-nctl-2-docker).

## Prerequisites

- Node.js ≥ 20 (22 recommended)
- npm ≥ 10
- Optional: Rust + `wasm-pack` to rebuild `wasm/` or refresh SDK packs from [casper-rust-wasm-sdk](https://github.com/casper-ecosystem/casper-rust-wasm-sdk)

## Local development

```shell
cd www
npm install
npm start
```

- Frontend (dev): http://localhost:4242 (proxies `/api` to Nest on `:3333`)
- API: Nest listens on port `3333`

```shell
npm run build          # production build → www/dist
npm run serve          # Express static + Nest API (uses PORT, default 4242)
npm test               # Jest
npm run e2e            # Cypress (requires API)
```

### Config knobs

[`www/libs/util/config/src/config.ts`](www/libs/util/config/src/config.ts) — gas/TTL defaults, node URLs, path separator for named-key browsing.

## Docker

Build from the **repository root** (context must include `casper-rust-wasm-sdk`, `wasm`, and `www`):

```shell
docker compose -f docker/docker-compose.yml up --build
# or
docker build -f docker/Dockerfile -t casper-deployer .
docker run --rm -p 4242:4242 -e PORT=4242 casper-deployer
```

Open http://localhost:4242/

## SDK upgrade note

The app vendors SDK packs under `casper-rust-wasm-sdk/`. To refresh from a local checkout of the WASM SDK (e.g. `/opt2/casper/rustSDK` at tag `v2.2.2`):

```shell
rm -rf casper-rust-wasm-sdk/pkg casper-rust-wasm-sdk/pkg-nodejs
cp -a /path/to/casper-rust-wasm-sdk/pkg casper-rust-wasm-sdk/pkg
cp -a /path/to/casper-rust-wasm-sdk/pkg-nodejs casper-rust-wasm-sdk/pkg-nodejs
# ensure pkg-nodejs package.json name is casper-rust-wasm-sdk-nodejs
```

Then `cd www && npm install`.

## Migration status (1.6 → 2.2.2)

- [x] Vendor `casper-rust-wasm-sdk` **2.2.2**
- [x] Housecleaning (dead escrow stubs, coverage artifacts, Docker context, README)
- [x] Deploy → Transaction make / sign / send / watch (Phase 1)
- [x] Entity / AddressableEntity named-key + dictionary queries (Phase 2)
- [x] Network / peers / SSE hardening (Phase 3 — NCTL `11101`/`18101`, no launcher `7777`)
- [x] Re-enable CI + expand tests (Phase 4)

## License / security

See [LICENSE.md](LICENSE.md) and [SECURITY.md](SECURITY.md).
