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
  defaultSender
} = require("./lib/helpers.js");

describe("Callable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  const distributeTokens = async () => {
    let totalDistributed = 0;

    for (var i = 1; i <= 8; i++) {
      let transferAmount = i * 3;
      totalDistributed += transferAmount;

      await transferTokens({
        from: accounts[1],
        to: accounts[i + 1],
        tokenID: DATA["token1"].id,
        amount: transferAmount
      });

      const balance = await STASHBLOX.balanceOf.call(accounts[i + 1], DATA["token1"].id);
      assert.equal(balance.valueOf(), transferAmount, "Token not received");
    }

    return totalDistributed;
  }

  const getethBalances = async () => {
    let ethBalance = {};
    for (var i = 0; i <= 9; i++) {
      ethBalance[i] = await STASHBLOX.getExternalBalance(accounts[i], 0);
    }
    return ethBalance;
  }



  describe("#proposeCallback", async () => {

    

  });


});
