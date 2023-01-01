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

class MintableAggregator {
	networkURL = {
		'mainnetURL': 'https://api.mintable.app',
		'rinkebyURL': 'https://api.mintable.app', // 'https://api.mintable.app',
		'ropstenURL': 'https://api.mintable.app',
		'mockURL': 'https://private-anon-68b814f638-mintable.apiary-mock.com'
	}

	supportingNetworks = ['mainnet', 'ropsten', 'rinkeby', 'mock']

	constructor (networkName='mainnet', APIKey=null) {
		this.network = this.supportingNetworks.includes(networkName.toLowerCase()) ? this.networkURL[networkName.toLowerCase() + 'URL'] : console.log(new CustomError('Enter Valid Network!').sendError)
		this.APIKey = APIKey
	}

	getGaslessNftItemByOwner = async (ownerAddress=null) => {
		try {
			let payload = {}

			ownerAddress == null || ownerAddress.length === 0 ?  console.log(new CustomError('Please enter valid asset owner address').sendError) : payload.address = ownerAddress
			
			return await axios.get( this.network + '/gasless-by-address', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the owner address")
		}
	}

    getSellingNftItem = async (category='_all', ownerAddress=null, auction=null, orderByDate=null, size=null, network=null) => {
		try {
			let payload = {}

			category == null ?  console.log(new CustomError('Please enter valid category of NFT').sendError) : payload.address = category
            ownerAddress == null ?  console.log(new CustomError('Please enter valid asset owner address').sendError) : payload.address = ownerAddress
            auction == null ?  console.log(new CustomError('Please enter valid boolean for auction').sendError) : payload.address = auction
            orderByDate == null ?  console.log(new CustomError('Please enter valid boolean for order by date').sendError) : payload.address = orderByDate
            size == null ?  console.log(new CustomError('Please enter valid size').sendError) : payload.address = size
            network == null ?  console.log(new CustomError('Please enter valid network in terms of number').sendError) : payload.address = network
			
			return await axios.get( this.network + '/assets', { params : (Object.entries(payload).length === 0 ? console.log(new CustomError('Please enter atleast 1 valid parameter').sendError) : payload) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct category, owner address, network, size, auction or  order by dateparamater")
		}
	}

	getNftItemById = async (tokenId=null) => {
		try {
			let payload = {}
			let headerAPI = {}

			tokenId == null || tokenId.length === 0  ?  console.log(new CustomError('Please enter valid token ID').sendError) : payload.token_ids = tokenId

			this.APIKey == null || this.APIKey.length === 0 ? null : headerAPI['x-api-key'] = this.APIKey

			return await axios.get( this.network + '/assets/' + tokenId, { headers : (Object.entries(headerAPI).length === 0 && !this.network.includes('') ? console.log(new CustomError('Please enter valid API Key').sendError) : headerAPI) }).then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct Item ID")
		}
	}

	getNftAuctionEndingSoon = async () => {
		try {
			return await axios.get( this.network + '/auctions-ending-soon').then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response.")
		}
	}

	getHotNftAuctions = async () => {
		try {
			return await axios.get( this.network + '/hot-auctions').then(res => res.data).catch(err => console.log("Something went wrong while fetching data from Opensea APIs. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response.")
		}
	}
}


module.exports = MintableAggregator