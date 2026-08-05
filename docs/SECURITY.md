# Security Policy

## Product scope

**casper-deployer** is a browser SPA + NestJS API for Casper **2.x** queries and transactions ([live](https://casper-deployer.interchouette.net/)).

Signing is **Casper Wallet only**. This repository is not a custodian, key vault, or seed/mnemonic wallet.

## Keys and signing

| Concern | Behavior |
| --- | --- |
| Private keys / PEM / mnemonics / seeds | **Never** collected, stored, or logged by the UI or Nest API |
| Active account | Public key from the Casper Wallet extension (`CasperWalletProvider`) |
| Transaction build | Unsigned payload built in the browser (Wasm SDK) |
| Transaction sign | Extension signs in-process; the app only receives the signed result |
| Transaction submit | Nest `PUT`/proxy path forwards an **already-signed** transaction to the chosen peer RPC via the Node Wasm SDK; the server does not sign |
| Pre-signed JSON | Users may load a signed transaction file and send it; still no private key material in the app |

Optional SDK `private_key` parameters exist on low-level make helpers for library completeness; the deployer UI **does not** pass them. Call sites use public initiator address + chain metadata only.

## What the app may persist

Browser `localStorage` (prefix `casper-deployer`) holds **UI preferences and public chain state** only — for example RPC URL, chain name, fee/TTL defaults, named-key browse paths, and last transaction hash. It does **not** store secret keys.

In-memory hub state may hold the wallet’s **active public key**. Escrow/demo account lists are empty; the wallet is the source of the active key.

## Network trust boundary

- The SPA does not call public Casper RPC directly for CORS-sensitive work.
- The Nest API (`/api/deployer/*`) runs the Node Wasm SDK against the peer URL the client supplies.
- SSE is proxied through Nest with an allowlisted target-URL check; missing or disallowed URLs are rejected.
- Treat any RPC/SSE URL you configure as trusted infrastructure: a malicious peer can lie about chain state. Signing consent still happens in the wallet.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security-sensitive findings.

Prefer a private report via GitHub Security Advisories:

https://github.com/Interchouette-ITC/casper-deployer/security/advisories/new

Include enough detail to reproduce (affected surface, Casper network, browser/wallet version, and whether private key material was ever at risk). We will acknowledge legitimate reports and coordinate a fix before any public disclosure.
