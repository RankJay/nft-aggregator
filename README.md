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

- **Reference** for available functions under **Rarible**
	```js
	getNftItemById(itemID)		// itemID = '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82:102269783871445009689193659504668254296443359178228669659681116260700662094166'
	```
	```js
	getNftItemByOwner(ownerAddress)		// ownerAddress = '0xe21aa579a784d7903833c9392679c44d20fd5582'
	```
	```js
	getNftItemByCreator(ownerAddress)		// ownerAddress = '0xe21aa579a784d7903833c9392679c44d20fd5582'
	```
	```js
	getNftItemByCollection(collectionID)		// collectionID = '0xda38e3cf623793fa46277773bbc5def9ad435c06'
	```
	```js
	getNftCollectionById(collectionID)		// collectionID = '0xda38e3cf623793fa46277773bbc5def9ad435c06'
	```
	```js
	getNftCollectionsByOwner(ownerAddress)		//ownerAddress = '0x2e3afad5fc47f686ccf2a46443fafa8ab4730b48'
	```
	```js
	getSellOrderByMakerAndByStatus(ownerAddress)		// ownerAddress = '0xe21aa579a784d7903833c9392679c44d20fd5582'
	```
	```js
	getSellOrderByItemAndByStatus(itemNumber, contractAddress)		// itemNumber = '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82', contractAddress = '102269783871445009689193659504668254296443359178228669659681116260700662094166'
	```
	```js
	getSellOrderByCollectionAndByStatus(collectionID)		// collectionID = '0xda38e3cf623793fa46277773bbc5def9ad435c06'
	```
	```js
	getOrderBidsByMakerAndByStatus(ownerAddress)		// ownerAddress = '0xe21aa579a784d7903833c9392679c44d20fd5582'
	```
	```js
	getOrderBidsByItemAndByStatus(itemNumber, contractAddress)		// itemNumber = '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82', contractAddress = '102269783871445009689193659504668254296443359178228669659681116260700662094166'
	```
	```js
	getAllCollections(blockchainName)		// blockchainName = 'ETHEREUM', 'TEZOS', etc.
	```

- **Reference** for available paramter schema under **Rarible**
	- `itemID: String`
	- `ownerAddress: String`
	- `collectionID: String`
	- `itemNumber: String`
	- `contractAddress: String`
	- `blockchainName: String (ALL CAPITAL LETTERS)`
	- `NOTE HERE:>	itemID == contractAddress + ':' + itemNumber`

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

- **Reference** for available functions under **Opensea**
	```js
	getNftItemById(tokenID, assetContractAddress)		// tokenID = '0', assetContractAddress = '0xa411c4df63bb82d520ea5caca21be754a8290c83'
	```
	```js
	getNftItemsById(ownerAddress, tokenId, assetContractAddress, collectionAddress)		// assetContractAddress = '0x697d6736c4cb5be9a1ae5d9f82609051d97fe853'
	```
	```js
	getNftItemByCollections(ownerAddress)		// ownerAddress = '0x6e5c7b954ccf4d3c070a1c50a6a624cc8cc8a61b'
	```
	```js
	getNftItemByCollection(collectionSlug)		// collectionSlug = 'test-horses-dzuo9jwrhe'
	```
	```js
	getNftStatsByCollection(collectionSlug)		// collectionSlug = 'test-horses-dzuo9jwrhe'
	```
	```js
	getNftOrdersById(tokenID, assetContractAddress)		// tokenID = '0', assetContractAddress = '0xa411c4df63bb82d520ea5caca21be754a8290c83'
	```
	```js
	getAllCollections()
	```
	```js
	getNftItemByContract(assetContractAddress)		// assetContractAddress = '0xa411c4df63bb82d520ea5caca21be754a8290c83'
	```
	```js
	getNftOffersById(tokenID, assetContractAddress)		// tokenID = '0', assetContractAddress = '0xa411c4df63bb82d520ea5caca21be754a8290c83'
	```
	```js
	getNftOrdersById(tokenID, assetContractAddress)		// tokenID = '0', assetContractAddress = '0xa411c4df63bb82d520ea5caca21be754a8290c83'
	```

- **Reference** for available paramter schema under **Opensea**
	- `tokenID: String`
	- `assetContractAddress: String`
	- `ownerAddress: String`
	- `collectionSlug: String`

<br>

**2. Using [Mintable](https://mintable.app/) Aggregator for fetching MetaData**

This class returns the value of NFT MetaData from Mintable NFT Marketplace with respective endpoint requests.
- Use this class when you simply want to fetch any suitable aggregation data from `Mintable`.

```js
const Aggregator = require('nft-aggregator');

let networkName = 'mainnet'; // Works on 'mainnet', 'rinkeby', 'ropsten' network over EVM.
let APIKey = null; // Enter your API Key here only if you wish to use Opensea Class, required in case of Opensea Class.

async function getNftMetadata(networkName, APIKey) {
	nftMetadata = await new Aggregator(networkName, APIKey).Mintable.getGaslessNftItemByOwner('0x02A522D98EC2D2c3bBe91AcC29ee7fD32ab880ab');
	console.log(nftMetadata);
}


getNftMetadata();
```

- **Reference** for available functions under **Mintable**
	```js
	getGaslessNftItemByOwner(ownerAddress)		// ownerAddress = '0x02A522D98EC2D2c3bBe91AcC29ee7fD32ab880ab'
	```
	```js
	getSellingNftItem(category, ownerAddress, auction, orderByDate, size, network)		// category = 'art', ownerAddress = '0x60e5f59C480442c69f6Cc853c39E3D3a702Add9C', auction = '', orderByDate = '', size = '', network = ''
	```
	```js
	getNftItemById(itemID)		// itemID = 'TH3JgTVs0DZLcQl'
	```
	```js
	getNftAuctionEndingSoon()
	```
	```js
	getHotNftAuctions()
	```

- **Reference** for available paramter schema under **Opensea**
	- `itemID: String`
	- `auction: Boolean`
	- `ownerAddress: String`
	- `orderByDate: Boolean`
	- `size: Integer`
	- `network: Integer`

<br>