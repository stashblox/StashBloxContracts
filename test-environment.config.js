module.exports = {
  accounts: {
    amount: 10, // Number of unlocked accounts
    ether: 10000, // Initial balance of unlocked accounts (in ether)
  },
  contracts: {
    type: 'truffle', // Contract abstraction to use: 'truffle' for @truffle/contract or 'web3' for web3-eth-contract
    defaultGas: 6e10, // Maximum gas for contract calls (when unspecified)

    // Options available since v0.1.2
    defaultGasPrice: 20e9, // Gas price for contract calls (when unspecified)
    artifactsDir: 'build/contracts', // Directory where contract artifacts are stored
  },
  node: { // Options passed directly to Ganache client
     gasLimit: 6e15,
     allowUnlimitedContractSize: true, // Allows unlimited contract sizes.
  },
};
