const Web3 = require('web3')
const axios = require('axios')

class CustomError extends Error {  
	constructor (message) {
		super(message)
		this.name = this.constructor.name
		this.status = 404
		this.sendError(message)
	}

		sendError(message) {
		console.log(message)
		process.exit(1)
	}
}

class RaribleAggregator {
	networkURL = {
		'mainnetURL': 'https://ethereum-api.rarible.org/v0.1',
		'rinkebyURL': 'https://ethereum-api-staging.rarible.org/v0.1',
		'ropstenURL': 'https://ethereum-api-dev.rarible.org/v0.1',
		'externalURL': 'https://ethereum-api-e2e.rarible.org/v0.1'
	}

	supportingNetworks = ['mainnet', 'ropsten', 'rinkeby']

	constructor (networkName='mainnet') {
		this.network = this.supportingNetworks.includes(networkName.toLowerCase()) ? this.networkURL[networkName.toLowerCase() + 'URL'] : console.log(new CustomError('Enter Valid Network!').sendError)
	}

	getNftItemById = async (itemId) => {
		try {
			return await axios.get( this.network + '/nft/items/' + itemId).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct item ID")
		}
	}

	getNftItemByOwner = async (ownerAddress) => {
		try {
			return await axios.get( this.network + '/nft/items/byOwner', { params : { owner : ownerAddress } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Owner Address")
		}
	}

	getNftItemByCreator = async (creatorAddress) => {
		try {
			return await axios.get( this.network + '/nft/items/byCreator', { params : { creator : creatorAddress } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Creator Address")
		}
	}

	getNftItemByCollection = async (collectionId) => {
		try {
			return await axios.get( this.network + '/nft/items/byCollection', { params : { collection : collectionId } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Collection ID")
		}
	}

	getNftCollectionById = async (collectionAddress) => {
		try {
			return await axios.get( this.network + '/nft/collections/' + collectionAddress).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Collection ID")
		}
	}

	getNftCollectionsByOwner = async (ownerAddress) => {
		try {
			return await axios.get( this.network + '/nft/collections/byOwner', { params : { owner : ownerAddress } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Owner address")
		}
	}

	getAllCollections = async (blockchain='ETHEREUM') => {
		try {
			let payload = {}
			blockchain == null || blockchain.length === 0 ?  null : payload.blockchains = blockchain

			return await axios.get( 'https://api.rarible.org/v0.1/collections/all', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Collection ID")
		}
	}


	getSellOrderByMakerAndByStatus = async (makerAddress) => {
		try {
			return await axios.get( this.network + '/order/orders/sell/byMakerAndByStatus', { params : { maker : makerAddress } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Maker address")
		}
	}

	getSellOrderByItemAndByStatus = async (contractId, itemId) => {
		try {
			return await axios.get( this.network + '/order/orders/sell/byItemAndByStatus', { params : { contract : contractId, tokenId : itemId } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

	getSellOrderByCollectionAndByStatus = async (collectionAddress) => {
		try {
			return await axios.get( this.network + '/order/orders/sell/byCollectionAndByStatus', { params : { collection : collectionAddress } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Collection ID")
		}
	}

	getOrderBidsByMakerAndByStatus = async (makerAddress, bidStatus="HISTORICAL") => {
		try {
			return await axios.get( this.network + '/order/orders/bids/byMakerAndByStatus', { params : { maker : makerAddress, status: bidStatus } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Maker address")
		}
	}

	getOrderBidsByItemAndByStatus = async (contractId, itemId, bidStatus="HISTORICAL") => {
		try {
			return await axios.get( this.network + '/order/orders/bids/byItemAndByStatus', { params : { contract : contractId, tokenId : itemId, status: bidStatus } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

    getAuctionsByItem = async (contractId, itemId) => {
		try {
			return await axios.get( this.network + '/order/auctions/byItem', { params : { contract : contractId, tokenId : itemId } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

    getAuctionsByCollection = async (collectionId) => {
		try {
			return await axios.get( this.network + '/order/auctions/byCollection', { params : { contract : collectionId } }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Rarible APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}
}


module.exports = RaribleAggregator;