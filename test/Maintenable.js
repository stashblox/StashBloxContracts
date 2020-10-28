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
      let transactionFees = [3, 0, 1];
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
    });

    it("should not be able to update token", async () => {

      expectRevert(
        STASHBLOX.updateToken(DATA["token1"].id, random(), [3, 0, 1], [accounts[5]], [10000], 5000, true, accounts[5], {from: accounts[5]}),
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
    });
  });


});
