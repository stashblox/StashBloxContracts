const {
  initContract,
  initFixtures,
  transferTokens,
  bigN,
  random,
  accounts,
  expectEvent,
  expectRevert,
  assert,
  defaultSender,
  ZERO_ADDRESS
} = require("./lib/helpers.js");

describe("Configurable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("#updateConfig", async () => {

    it("should have correct initial config", async () => {
      const newConfig = await STASHBLOX._config();

      assert.equal(newConfig.callbackAutoExecuteMaxAccounts, 50, "Invalid config value");
      assert.equal(newConfig.baseURI, "http://stashblox.com/tokens/", "Invalid config value");
      assert.equal(newConfig.versionRecipient, "1.0.0+opengsn.stashblox", "Invalid config value");
      assert.equal(newConfig.owner, defaultSender, "Invalid config value");
      assert.equal(newConfig.GSNTrustedForwarder,  ZERO_ADDRESS, "Invalid config value");
      assert.equal(newConfig.proxyRegistryAccount, ZERO_ADDRESS, "Invalid config value");

    });


    it("should update configuration and emit event", async () => {
      const callbackAutoExecuteMaxAccounts = 18;
      const baseURI = "baseURI";
      const versionRecipient = "versionRecipient";
      const owner = accounts[4];
      const GSNTrustedForwarder = accounts[5];
      const proxyRegistryAccount = accounts[6];

      const receipt = await STASHBLOX.updateConfig.send(
        callbackAutoExecuteMaxAccounts,
        baseURI,
        versionRecipient,
        owner,
        GSNTrustedForwarder,
        proxyRegistryAccount
      );

      //console.log(receipt);

      expectEvent(receipt, "ConfigUpdated");

      const newConfig = await STASHBLOX._config();

      assert.equal(newConfig.callbackAutoExecuteMaxAccounts, callbackAutoExecuteMaxAccounts, "Invalid config value");
      assert.equal(newConfig.baseURI, baseURI, "Invalid config value");
      assert.equal(newConfig.versionRecipient, versionRecipient, "Invalid config value");
      assert.equal(newConfig.owner, owner, "Invalid config value");
      assert.equal(newConfig.GSNTrustedForwarder, GSNTrustedForwarder, "Invalid config value");
      assert.equal(newConfig.proxyRegistryAccount, proxyRegistryAccount, "Invalid config value");

    });

  });


});
