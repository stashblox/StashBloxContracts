var assert = require("assert")

const {
  initContract,
  initFixtures,
  transferTokens,
  bigN,
  random,
  accounts,
  expectEvent
} = require("./StashBloxHelpers.js");

var STASHBLOX, DATA;

describe("Token Callbacks", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  const distributeTokens = async () => {
    let totalDistributed = 0;

    for (var i = 1; i <= 3; i++) {
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

  const getETHBalances = async () => {
    let ethBalance = {};
    for (var i = 0; i <= 5; i++) {
      ethBalance[i + 1] = await STASHBLOX._ETHBalances(accounts[i + 1]);
    }
    return ethBalance;
  }

  it("should propose callback", async () => {
    let totalDistributed = await distributeTokens();

    const price = 100;
    const callees = [];
    const documentHash = random();
    let receipt = await STASHBLOX.proposeCallback(DATA["token1"].id, price, callees, documentHash, {
      from: accounts[1],
      value: price * totalDistributed
    });

    expectEvent(receipt, "CallbackProposed", {
      _callbackPropositionId: bigN(1)
    });
  })




});
