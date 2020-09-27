const StashBlox = artifacts.require("StashBlox");
const StashBloxCallback = artifacts.require("StashBloxCallback");

module.exports = function(deployer) {
    deployer.deploy(StashBloxCallback).then(function() {
        return deployer.deploy(StashBlox, StashBloxCallback.address);
    });
};
