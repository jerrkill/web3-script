const Web3 = require('web3');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const knownContracts = Object.assign(require('./known-contracts'));


const GAS_PRICE = '5';

const GAS_LIMIT = 310000;


const DECIMALS = 10 ** 18;

const NETWORK_RPC_URLS = {
    testnet: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    mainnet: 'https://bsc-dataseed1.ninicoin.io/'
}
if ( typeof args['network'] == 'undefined' || typeof NETWORK_RPC_URLS[args['network']] == 'undefined' ) {
    console.log("Error:", "network undefined!!! usage: --network <network>")
    process.exit(1);
}
const network = args['network'];;

const web3 = new Web3(new Web3.providers.HttpProvider(NETWORK_RPC_URLS[network]));

// const deployer_priv_key = fs.readFileSync(".secret").toString().trim();
const deployer = '';//web3.eth.accounts.privateKeyToAccount(deployer_priv_key);

const has = () => {
  if ( typeof knownContracts[''] == 'undefined' || typeof NETWORK_RPC_URLS[args['network']] == 'undefined' ) {
    console.log("Error:", "network undefined!!! usage: --network <network>")
    process.exit(1);
  }
  []
}

module.exports = {
    GAS_LIMIT, DECIMALS,GAS_PRICE,web3,deployer,network,args,
    knownContracts
}