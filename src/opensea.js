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
		'mainnetURL': '',
		'rinkebyURL': '',
		'ropstenURL': '',
		'externalURL': ''
	}

	supportingNetworks = ['mainnet', 'ropsten', 'rinkeby']

	constructor (networkName='mainnet') {
		this.network = this.supportingNetworks.includes(networkName.toLowerCase()) ? this.networkURL[networkName.toLowerCase() + 'URL'] : console.log(new CustomError('Enter Valid Network!').sendError)
	}
}

module.exports = OpenseaAggregator