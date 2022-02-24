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

	getNftItemById = async (ownerAddress=null, tokenId=null, assetContractAddress=null, collectionAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			assetContractAddress == null ?  null : payload.asset_contract_address = assetContractAddress
			tokenId == null ?  null : payload.token_ids = tokenId
			ownerAddress == null ?  null : payload.owner = ownerAddress
			collectionAddress == null ?  null : payload.collection = collectionAddress

			this.APIKey == null ? null : headerAPI['X-API-KEY'] = this.APIKey

			return await axios.get( this.network + '/assets', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}

	getNftItemByCollection = async (ownerAddress=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			ownerAddress == null ?  null : payload.asset_owner = ownerAddress

			this.APIKey == null ? null : headerAPI['X-API-KEY'] = this.APIKey
			
			return await axios.get( this.network + '/assets', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('testnets') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Contract or Item ID")
		}
	}
}

module.exports = OpenseaAggregator