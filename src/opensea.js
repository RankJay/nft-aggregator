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

class OpenseaAggregator {
	networkURL = {
		'mainnetURL': 'https://api.opensea.io/api/v1',
		'rinkebyURL': 'https://testnets-api.opensea.io/api/v1', // 'https://rinkeby-api.opensea.io/api/v1',
		'ropstenURL': 'https://testnets-api.opensea.io/api/v1',
		'externalURL': ''
	}

	supportingNetworks = ['mainnet', 'ropsten', 'rinkeby']

	constructor (networkName='mainnet', APIKey=null) {
		this.network = this.supportingNetworks.includes(networkName.toLowerCase()) ? this.networkURL[networkName.toLowerCase() + 'URL'] : console.log(new CustomError('Enter Valid Network!').sendError)
		this.APIKey = APIKey
	}

	getNftItemById = async (tokenId=null, assetContractAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			assetContractAddress == null || assetContractAddress.length === 0 ?  console.log(new CustomError('Please enter valid asset contract address').sendError) : payload.asset_contract_address = assetContractAddress
			tokenId == null || tokenId.length === 0  ?  console.log(new CustomError('Please enter valid token ID').sendError) : payload.token_ids = tokenId

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey

			return await axios.get( this.network + '/asset/' + assetContractAddress + '/' + tokenId, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

	getNftItemsById = async (ownerAddress=null, tokenId=null, assetContractAddress=null, collectionAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			assetContractAddress == null || assetContractAddress.length === 0 ?  null : payload.asset_contract_address = assetContractAddress
			tokenId == null || tokenId.length === 0 ?  null : payload.token_ids = tokenId
			ownerAddress == null || ownerAddress.length === 0 ?  null : payload.owner = ownerAddress
			collectionAddress == null || collectionAddress.length === 0 ?  null : payload.collection = collectionAddress

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey

			return await axios.get( this.network + '/assets', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

	getNftItemByCollection = async (collectionSlug=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			collectionSlug == null || collectionSlug.length === 0 ?  null : payload.collection_slug = collectionSlug

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey
			
			return await axios.get( this.network + '/collection/' + collectionSlug, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Collection Slug name")
		}
	}

	getNftItemByCollections = async (ownerAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			ownerAddress == null || ownerAddress.length === 0 ?  null : payload.asset_owner = ownerAddress

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey
			
			return await axios.get( this.network + '/collections', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Collection ID")
		}
	}

	getNftStatsByCollection = async (collectionSlug=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			collectionSlug == null || collectionSlug.length === 0 ?  null : payload.collection_slug = collectionSlug

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey
			
			return await axios.get( this.network + '/collection/' + collectionSlug + '/stats', { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Collection Slug name")
		}
	}

	getAllCollections = async () => {
		try {
			return await axios.get( 'https://api.opensea.io/api/v1/collections' ).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

	getNftItemByContract = async (assetContractAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			assetContractAddress == null || assetContractAddress.length === 0 ?  console.log(new CustomError('Please enter valid asset contract address').sendError) : payload.asset_contract_address = assetContractAddress
			tokenId == null || tokenId.length === 0  ?  console.log(new CustomError('Please enter valid token ID').sendError) : payload.token_ids = tokenId

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey

			return await axios.get( this.network + '/asset_contract/' + assetContractAddress, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

	getNftOffersById = async (tokenId=null, assetContractAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			assetContractAddress == null || assetContractAddress.length === 0 ?  console.log(new CustomError('Please enter valid asset contract address').sendError) : payload.asset_contract_address = assetContractAddress
			tokenId == null || tokenId.length === 0  ?  console.log(new CustomError('Please enter valid token ID').sendError) : payload.token_ids = tokenId

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey

			return await axios.get( this.network + '/asset/' + assetContractAddress + '/' + tokenId + '/offers', { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

	getNftOrdersById = async (tokenId=null, assetContractAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			assetContractAddress == null || assetContractAddress.length === 0 ?  null : payload.asset_contract_address = assetContractAddress
			tokenId == null || tokenId.length === 0 ?  null : payload.token_ids = tokenId

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['X-API-KEY'] = this.APIKey

			return await axios.get( 'https://api.opensea.io/wyvern/v1/orders', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}
}


module.exports = OpenseaAggregator