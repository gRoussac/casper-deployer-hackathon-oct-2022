# Casper Deployer - Information and How-To Guides

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/gRoussac/casper-deployer-hackathon-oct-2022/dev/www/apps/frontend/src/assets/logo-dark.svg" width="164"></p>

# Welcome to Casper Deployer for CasperLabs Hackaton October 2022 👻

> Web deployer for Casper blockchain

### 🏠 [https://casper.onrender.com/ ](casper.onrender) ( beta )

[![codecov](https://codecov.io/gh/CasperDash/casperdash-client/branch/develop/graph/badge.svg?token=3KWLVN3DPV)](https://codecov.io/gh/CasperDash/casperdash-client)

<img width="354" alt="image" src="https://user-images.githubusercontent.com/6711653/163332067-359844e1-c468-4be9-917e-c86b4b2403a9.png">

![](https://i.imgur.com/N0DGupc.png)

## For Users

This documentation aims to help with onboarding the new end users of the Casper Network by providing guides on basic setup and operations.

- <img src="assets/CasperNetwork/casper-signer-logo.jpg" alt="Casper Signer" width="20" style="vertical-align:middle"/> [Create/Import an Account using Signer](/docs/user-guides/SignerGuide.md)
- 👛 [Connect a Wallet](/docs/user-guides/Connect-a-Wallet.md)
- 💸 [Transfer CSPR](/docs/user-guides/Transfer-CSPR.md)
- 🥩 [Delegating CSPR Stake](/docs/user-guides/Delegating-CSPR-Stake.md)
- 🥙 [Undelegating CSPR Stake](/docs/user-guides/Undelegating-CSPR-Stake.md)

- ❓ [User FAQ](/docs/faq-user.md)

## Architecture

### Web Server

https://github.com/CasperDash/casperdash-api

Web server is implemented in [Express.js](https://expressjs.com/). It allows us to create read-only data pipeline for clients.

### Client

[React.js](https://reactjs.org/) + [Flux structure](https://www.javatpoint.com/react-flux-concept#:~:text=Flux%20is%20an%20application%20architecture,a%20library%20nor%20a%20framework.&text=It%20is%20a%20kind%20of,of%20Unidirectional%20Data%20Flow%20model.)

React web app provides user a simple and convenient dashboard to explore the blocks and manipulate the wallets.

There are 2 parts, web and browser extension which are sharing similar logic and dataflow. The main different is user interfaces.

[Webpack](https://webpack.js.org/) is using for building each platform.

#### I. Web

##### 1. Install

```sh
cd YOUR_WORKING_DIRECTORY/casperdash-client/client
yarn install
```

## Features/Road map

- [x] Integrate with Casper Singer
- [x] Dashboard
  - [x] View CSPR balance
  - [x] Send/Receive CSPR
  - [] CSPR price chart
- [x] Tokens (ERC20)

#### Casper Signer Browser Extension

#### Roadmap

- [ ] Fluter app

## Workflow and contributions

https://github.com/gRoussac/casper-deployer-hackathon-oct-2022/blob/Development-Workflow

### License

[MIT](https://github.com/gRoussac/casper-deployer-hackathon-oct-2022/blob/master/LICENSE)

### Security

https://github.com/gRoussac/casper-deployer-hackathon-oct-2022/blob/master/SECURITY.md

### Have questions?

Go to the `#validators-general` channel [on Discord](https://discord.gg/casperblockchain)

### Errors ?

If you see any typos or errors you can edit the article directly on GitHub
