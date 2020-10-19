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
} = require("./StashBloxHelpers.js");

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
      ethBalance[i] = await STASHBLOX._ETHBalances(accounts[i]);
    }
    return ethBalance;
  }

  const proposeCallback = async (price, totalDistributed) => {
    const callees = [];
    const documentHash = random();
    let receipt = await STASHBLOX.proposeCallback(DATA["token1"].id, price, callees, documentHash, {
      from: accounts[1],
      value: price * totalDistributed
    });
    return receipt;
  }

  it("should propose callback", async () => {
    let totalDistributed = await distributeTokens();
    let receipt = await proposeCallback(100, totalDistributed);

    expectEvent(receipt, "CallbackProposed", {
      _callbackPropositionId: bigN(1)
    });

    let callback = await STASHBLOX._callbackPropositions(1);
    assert.equal(callback.needLegalApproval, false, "Invalid value for needLegalApproval");
  });

  it("should refuse callback proposition with not enough ETH", async () => {
    let totalDistributed = await distributeTokens();

    const price = 100;
    const callees = [];
    const documentHash = random();

    await expectRevert(STASHBLOX.proposeCallback(DATA["token1"].id, price, callees, documentHash, {
      from: accounts[1],
      value: price * totalDistributed - 1
    }), "StashBlox: insufficient value for the proposed price.");
  });

  it("should require legal approval if price is 0", async () => {
    let totalDistributed = await distributeTokens();
    let receipt = await proposeCallback(0, totalDistributed);

    let callback = await STASHBLOX._callbackPropositions(1);
    assert.equal(callback.needLegalApproval, true, "Invalid value for needLegalApproval");
  });


  it("should refuse callback and refund caller", async () => {
    let ethBalances1 = await getETHBalances();
    assert.equal(ethBalances1[1].valueOf(), 0, "invalid ETH balance");

    let totalDistributed = await distributeTokens();
    await proposeCallback(100, totalDistributed);

    let receipt = await STASHBLOX.refuseCallback(1);

    let callback = await STASHBLOX._callbackPropositions(1);
    assert.equal(callback.refused, true, "Invalid value for refused field");

    expectEvent(receipt, "CallbackRefused", {
      _callbackPropositionId: bigN(1)
    });

    let ethBalances2 = await getETHBalances();
    assert.equal(ethBalances2[1].valueOf(), 100 * totalDistributed, "invalid ETH balance");
  });


  it("callback should be approved by legal authority", async () => {
    let totalDistributed = await distributeTokens();
    let receipt = await proposeCallback(0, totalDistributed);

    let callback = await STASHBLOX._callbackPropositions(1);
    assert.equal(callback.needLegalApproval, true, "Invalid value for needLegalApproval");

    await expectRevert(STASHBLOX.approveCallback(1), "StashBlox: insufficient permission");

    await STASHBLOX.updateLegalAuthority(DATA["token1"].id, defaultSender);

    receipt = await STASHBLOX.approveCallback(1);
  });

});
