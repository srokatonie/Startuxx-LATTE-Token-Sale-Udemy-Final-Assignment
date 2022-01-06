const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.PRIVATE_KEY_GANACHE, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
    },
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.PRIVATE_KEY_GOERLI, process.env.INFURA_HTTP_ENDPOINT, AccountIndex)
      },
      network_id: 5, 
      skipDryRun: true,
      gas: 5000000,
      gasPrice: 25000000000
    }
  },
  compilers: {
    solc: {
      version: "0.6.1"
    }
  }
}