//browserify index.js -o ../web2py/applications/StashBlox/static/js/StashBlox.js

const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');

const infuraKey = "7a1a08e92a414279ac6d4d02146245a3";

function getMetamaskProvider() {
    if (window) {
        if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
            return window['ethereum'] || window.web3.currentProvider
        } else {
            throw "Need Metamask";
        }
    } else {
        throw "Executable only in a browser";
    }
}

function StashBloxWallet(contractAddress, accountIndex, provider) {
    this.contractAddress = contractAddress;
    this.accountIndex = accountIndex || 0;
    this.web3Provider = provider || getMetamaskProvider();
    console.log(this.web3Provider)
    this.web3 = new Web3(this.web3Provider);
    console.log(this.web3)
    var StashBloxJson = require('./build/contracts/StashBlox.json');
    this.StashBloxContract = new this.web3.eth.Contract(StashBloxJson.abi, this.contractAddress);

    this._initialized = false;
    this._initialize = async function() {
        if (this._initialized) return;
        this.accounts = await this.web3Provider.enable();
        this.sender = this.accounts[this.accountIndex];
        this._initialized = true;
    }

    this.getAccounts = async function() {
        await this._initialize();
        return this.accounts;
    }

    this.createTokens = async function(ids, recipients, values, metadataHashes) {
        await this._initialize();
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.StashBloxContract.methods.createTokens(ids, recipients, values, metadataHashes)
                .send({from: _this.accounts[0]})
                .on('receipt', function(receipt) {
                    resolve(receipt);
                })
                .on('error', function(error) {
                    reject(error);
                });
        });
    }

}

if (window) {
    window.StashBloxWallet = StashBloxWallet; //new StashBloxWallet("0x60B5150101A6681121DEFfF672A19D666d120F2c");
}
