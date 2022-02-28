const Rarible = require('./rarible')
const Opensea = require('./opensea')
const Mintable = require('./mintable')

class Aggregator {
    constructor(networkName='mainnet', APIKey=null) {
        this.Rarible = new Rarible(networkName)
        this.Opensea = new Opensea(networkName, APIKey == null ? null : APIKey)
        this.Mintable = new Mintable(networkName, APIKey == null ? null : APIKey)
    }
}

module.exports = Aggregator