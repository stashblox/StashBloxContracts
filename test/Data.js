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

describe("Data.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("Public variables", async () => {

    it("_tokens should have free getter", async () => {
      const token = await STASHBLOX._tokens.call(DATA["token1"].id);
      assert.equal(token.supply.valueOf(), DATA["token1"].supply, "invalid token");
    });

    it("_accounts should have free getter", async () => {
      await STASHBLOX.setAccountLock.send(DATA["token1"].recipient, true, random());
      const account = await STASHBLOX._accounts(DATA["token1"].recipient);
      assert.equal(account.isLocked, true, "invalid account");
    });

    it("_callbacks should have free getter", async () => {
      await STASHBLOX.proposeCallback.send(1, DATA["token1"].id, 100, [], random(), {
        from: accounts[1],
        value: 100 * DATA["token1"].supply
      });
      const callback = await STASHBLOX._callbacks(bigN(1));
      assert.equal(callback.price.valueOf(), 100, "invalid callback");
    });

    it("_config should have free getter", async () => {
      const config = await STASHBLOX._config();
      assert.equal(config.callbackAutoExecuteMaxAccounts, 50, "Invalid config value");
    });
  });



});
