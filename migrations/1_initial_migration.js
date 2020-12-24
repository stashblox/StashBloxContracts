const crypto = require("crypto");

const StashBlox = artifacts.require("StashBlox");
const ERC20Proxy = artifacts.require("ERC20Proxy");

var SALT = crypto.randomBytes(32);
console.log("SALT", SALT);

module.exports = function(deployer) {
    console.log("deploying...");
    deployer.deploy(ERC20Proxy).then(function() {
      console.log("ERC20Proxy", ERC20Proxy.address);
      return deployer.deploy(StashBlox, SALT, ERC20Proxy.address);
    });
};
