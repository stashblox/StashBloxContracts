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
      const token = await STASHBLOX._tokens(DATA["token1"].id);
      assert.equal(token.supply.valueOf(), DATA["token1"].supply, "invalid token");
    });

    it("_accounts should have free getter", async () => {
      await STASHBLOX.setTokenizerAuthorization.send(DATA["token1"].recipient, true);
      const account = await STASHBLOX._accounts(DATA["token1"].recipient);
      assert.equal(account.isTokenizer, true, "invalid account");
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

  describe("#tokenDetails", async () => {

    it("should return correct token details", async () => {

      await transferTokens({
        operator: accounts[1],
        from: accounts[1],
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 50
      });

      const tokenDetails = await STASHBLOX.tokenDetails(DATA["token1"].id);

      assert.equal(tokenDetails[0][0], DATA["token1"].recipient.toString(16), "invalid holder list");
      assert.equal(tokenDetails[0][1], accounts[2], "invalid holder list");

      assert.equal(tokenDetails[1][0], DATA["token1"].feesRecipients[0], "invalid fees recipients");
      assert.equal(tokenDetails[1][1], DATA["token1"].feesRecipients[1], "invalid fees recipients");

      assert.equal(tokenDetails[2][0].valueOf(), DATA["token1"].feesRecipientsPercentage[0], "invalid fees recipient percentage");
      assert.equal(tokenDetails[2][1].valueOf(), DATA["token1"].feesRecipientsPercentage[1], "invalid fees recipient percentage");

      assert.equal(tokenDetails[3][0][0].toString(), DATA["token1"].createdAt.toString(), "invalid timestamp");

    });

  });

  describe("#tokenList", async () => {

    it("should return correct token details", async () => {
      await transferTokens({
        operator: accounts[2],
        from: accounts[2],
        to: accounts[1],
        tokenID: DATA["token2"].id,
        amount: 50
      });

      const tokenList = await STASHBLOX.tokenList(accounts[1]);

      assert.equal(tokenList[0].toString(16), DATA["token1"].id.toString(16), "invalid token list");
      assert.equal(tokenList[1].toString(16), DATA["token2"].id.toString(16), "invalid token list");
    });

  });

});
