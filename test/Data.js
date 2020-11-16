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


  });



});
