const {
  initContract,
  initFixtures,
  transferTokens,
  bigN,
  expectEvent,
  ZERO_ADDRESS,
  assert,
  now,
  accounts,
  random,
  expectRevert
} = require("./lib/helpers.js");

var STASHBLOX, DATA;

describe("Maintenable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("#authorizeMaintener", () => {

    it("should authorize maintener", async () => {
      let authorized = await STASHBLOX.isMaintener.call(DATA["token1"].id, accounts[5]);
      assert.equal(authorized, false, "invalid authorization");

      await STASHBLOX.setMaintenerAuthorization.send(DATA["token1"].id, accounts[5], true);

      authorized = await STASHBLOX.isMaintener(DATA["token1"].id, accounts[5]);
      assert.equal(authorized, true, "invalid authorization");
    });

  });


  describe("#revokeMaintener", () => {

    it("should revoke maintener", async () => {
      let authorized = await STASHBLOX.isMaintener.call(DATA["token1"].id, accounts[5]);
      assert.equal(authorized, false, "invalid authorization");

      await STASHBLOX.setMaintenerAuthorization.send(DATA["token1"].id, accounts[5], true);
      await STASHBLOX.setMaintenerAuthorization.send(DATA["token1"].id, accounts[5], false);

      authorized = await STASHBLOX.isMaintener(DATA["token1"].id, accounts[5]);
      assert.equal(authorized, false, "invalid authorization");
    });

  });

  describe("#updateToken", () => {

    it("should be able to update token", async () => {
      await STASHBLOX.setMaintenerAuthorization.send(DATA["token1"].id, accounts[5], true);

      let metadataHash = random();
      let transactionFees = [3, 0, 1, 2, STASHBLOX.address, DATA["token2"].id];
      let feesRecipients = [accounts[5]];
      let feesRecipientsPercentage = [10000];
      let minHoldingForCallback = 5000;
      let isPrivate = true;
      let legalAuthority = accounts[5];

      let receipt = await STASHBLOX.updateToken.send(DATA["token1"].id,
                                                     metadataHash,
                                                     transactionFees,
                                                     feesRecipients,
                                                     feesRecipientsPercentage,
                                                     minHoldingForCallback,
                                                     isPrivate,
                                                     legalAuthority, {from: accounts[5]});

      expectEvent(receipt, "TokenUpdated", {
        _id: DATA["token1"].id,
        _documentHash: metadataHash
      });

      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      //console.log(token);
      assert.equal(token.metadataHash.toString(), metadataHash.toString(), "invalid value");
      assert.equal(token.minHoldingForCallback.toString(), minHoldingForCallback.toString(), "invalid value");
      assert.equal(token.isPrivate.toString(), isPrivate.toString(), "invalid value");
      assert.equal(token.legalAuthority.toString(), legalAuthority.toString(), "invalid value");
      assert.equal(token.lumpSumFees.toString(), transactionFees[0].toString(), "invalid value");
      assert.equal(token.standardFees.toString(), transactionFees[1].toString(), "invalid value");

      assert.equal(token.feesUnitType.valueOf(), 2, "invalid value");
      assert.equal(token.feesUnitAddress.toString(16), STASHBLOX.address, "invalid value");
      assert.equal(token.feesUnitId.toString(), DATA["token2"].id.toString(), "invalid value");
    });

    it("should not be able to update token", async () => {

      expectRevert(
        STASHBLOX.updateToken(DATA["token1"].id, random(), [3, 0, 1, 0, 0, ZERO_ADDRESS], [accounts[5]], [10000], 5000, true, accounts[5], {from: accounts[5]}),
        "Insufficient permission"
      );

      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      //console.log(token);
      assert.equal(token.metadataHash.toString(), DATA["token1"].metadataHash.toString(), "invalid value");
      assert.equal(token.minHoldingForCallback.toString(), DATA["token1"].minHoldingForCallback.toString(), "invalid value");
      assert.equal(token.isPrivate.toString(), DATA["token1"].isPrivate.toString(), "invalid value");
      assert.equal(token.legalAuthority.toString(), DATA["token1"].legalAuthority.toString(), "invalid value");
      assert.equal(token.lumpSumFees.toString(), DATA["token1"].transactionFees[0].toString(), "invalid value");
      assert.equal(token.standardFees.toString(), DATA["token1"].transactionFees[1].toString(), "invalid value");

      assert.equal(token.feesUnitType.valueOf(), DATA["token1"].transactionFees[3], "invalid value");
      assert.equal(token.feesUnitAddress.toString(16), DATA["token1"].transactionFees[4].toString(), "invalid value");
      assert.equal(token.feesUnitId.valueOf(), DATA["token1"].transactionFees[5], "invalid value");
    });
  });


});
