const Rarible = require('./rarible')
const Opensea = require('./opensea')

class Aggregator {
    constructor(networkName='mainnet', OpenseaAPIKey=null) {
        this.Rarible = new Rarible(networkName)
        this.Opensea = new Opensea(networkName, OpenseaAPIKey == null ? null : OpenseaAPIKey )
    }
}

module.exports = Aggregator