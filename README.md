# nft-aggregator

![](https://img.shields.io/npm/dt/nft-aggregator.svg?style=for-the-badge&labelColor=000000) ![](https://img.shields.io/github/languages/code-size/RankJay/nft-aggregator?style=for-the-badge&labelColor=000000) ![](https://img.shields.io/npm/l/nft-aggregator?style=for-the-badge&labelColor=000000) ![](https://img.shields.io/github/package-json/v/RankJay/nft-aggregator?style=for-the-badge&labelColor=000000) <a aria-label="NPM version" href="https://www.npmjs.com/package/nft-aggregator"> <img alt="" src="https://img.shields.io/npm/v/next.svg?style=for-the-badge&labelColor=000000"> </a>

Developed by: [**Jay Rank**](https://github.com/RankJay)

## Introduction
`nft-aggregator` is a SDK built to fetch NFT metadata from world-renowed NFT marketplaces over EVM-compatible blockchains.

For installation, refer [here](https://www.npmjs.com/package/nft-aggregator) or run the following command in your node project.

```
npm install nft-aggregator
```

## How to use


**1. Using [Rarible](https://rarible.com/) Aggregator for fetching MetaData**

This class returns the value of NFT MetaData from Rarible NFT Marketplace with respective endpoint requests.
- Use this class when you simply want to fetch any suitable aggregation data from `Rarible`.

```js
const Aggregator = require('nft-aggregator');

let networkName = 'mainnet'; // Works on 'mainnet', 'rinkeby', 'ropsten' network over EVM.
let APIKey = null; // Enter your API Key here only if you wish to use Opensea Class, not required in case of Rarible Class.

async function getNftMetadata(networkName, APIKey) {
	nftMetadata = await new Aggregator(networkName, APIKey).Rarible.getNftItemById('0x6ede7f3c26975aad32a475e1021d8f6f39c89d82:102269783871445009689193659504668254296443359178228669659681116260700662094166');
	console.log(nftMetadata);
}


getNftMetadata();
```

<br>

**2. Using [Opensea](https://opensea.io/) Aggregator for fetching MetaData**

This class returns the value of NFT MetaData from Opensea NFT Marketplace with respective endpoint requests.
- Use this class when you simply want to fetch any suitable aggregation data from `Opensea`.

```js
const Aggregator = require('nft-aggregator');

let networkName = 'mainnet'; // Works on 'mainnet', 'rinkeby', 'ropsten' network over EVM.
let APIKey = null; // Enter your API Key here only if you wish to use Opensea Class, required in case of Opensea Class.

async function getNftMetadata(networkName, APIKey) {
	nftMetadata = await new Aggregator(networkName, APIKey).Opensea.getNftItemById('0', '0xa411c4df63bb82d520ea5caca21be754a8290c83');
	console.log(nftMetadata);
}


getNftMetadata();
```

<br>
