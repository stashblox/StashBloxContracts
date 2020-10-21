const {
  initContract,
  initFixtures,
  transferTokens,
  bigN,
  expectEvent,
  ZERO_ADDRESS,
  assert,
  now
} = require("./lib/helpers.js");

var STASHBLOX, DATA;

describe("Mintable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("#createToken", () => {

    it("should emit TransferSingle on token creation", async () => {
      expectEvent(DATA["token1"].receipt, "TransferSingle", {
        _operator: await STASHBLOX.owner.call(),
        _from: ZERO_ADDRESS,
        _to: DATA["token1"].recipient,
        _id: DATA["token1"].id,
        _value: bigN(DATA["token1"].supply)
      });

      expectEvent(DATA["token2"].receipt, "TransferSingle", {
        _operator: await STASHBLOX.owner.call(),
        _from: ZERO_ADDRESS,
        _to: DATA["token2"].recipient,
        _id: DATA["token2"].id,
        _value: bigN(DATA["token2"].supply)
      });
    });


    it("should update birthday on token creation", async () => {
      let averageAge = await STASHBLOX.averageAge(DATA["token1"].recipient, DATA["token1"].id);
      let expectedAge = (await now()).sub(DATA["token1"].createdAt);

      assert.equal(averageAge.toString(), expectedAge.toString(), "Birthday is not correct")
      //
      // let birthday2 = await STASHBLOX._birthdays(DATA["token2"].id, DATA["token2"].recipient);
      // assert.equal(birthday2.toString(), DATA["token2"].createdAt.toString(), "Birthday is not correct")
    });


    it("should be tokens in initial owners accounts", async () => {
      const balance1 = await STASHBLOX.balanceOf.call(DATA["token1"].recipient, DATA["token1"].id);
      assert.equal(balance1.valueOf(), DATA["token1"].supply, "token wasn't in the first account");

      const balance2 = await STASHBLOX.balanceOf.call(DATA["token2"].recipient, DATA["token2"].id);
      assert.equal(balance2.valueOf(), DATA["token2"].supply, "token wasn't in the first account");
    });

  });

});
