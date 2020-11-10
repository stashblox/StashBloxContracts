const {
  initContract,
  initFixtures,
  transferTokens,
  setMaintenerAuthorization,
  bigN,
  expectEvent,
  ZERO_ADDRESS,
  assert,
  now,
  accounts,
  random,
  expectRevert
} = require("./lib/helpers.js");

var STASHBLOX, DATA, propertiesNames;

describe("Maintenable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
    propertiesNames = [
      "metadataHash",
      "isPrivate",
      "minHoldingForCallback",
      "legalAuthority",
      "standardFees",
      "lumpSumFees",
      "demurrageFees",
      "feesUnitType",
      "feesUnitAddress",
      "feesUnitId",
      "feesRecipient",
      "decimals",
      "maintener",
      "locked"
    ];
  });

  describe("#authorizeMaintener", () => {

    it("should authorize maintener", async () => {
      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      let authorized = token.maintener == accounts[5];
      assert.equal(authorized, false, "invalid authorization");

      await setMaintenerAuthorization(DATA["token1"].id, accounts[5], true);

      token = await STASHBLOX._tokens.call(DATA["token1"].id);
      authorized = token.maintener == accounts[5];
      assert.equal(authorized, true, "invalid authorization");
    });

  });


  describe("#revokeMaintener", () => {

    it("should revoke maintener", async () => {
      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      let authorized = token.maintener == accounts[5];
      assert.equal(authorized, false, "invalid authorization");

      await setMaintenerAuthorization(DATA["token1"].id, accounts[5], true);
      await setMaintenerAuthorization(DATA["token1"].id, accounts[5], false);


      token = await STASHBLOX._tokens.call(DATA["token1"].id);
      authorized = token.maintener == accounts[5];
      assert.equal(authorized, false, "invalid authorization");
    });

  });

  describe("#updateToken", () => {

    it("should be able to update token property one by one", async () => {
      // fieldList = [
      //   "decimals", "metadataHash", "minHoldingForCallback",
      //   "lumpSumFees", "standardFees", "feesUnitType",
      //   "feesUnitId", "feesUnitAddress", "feesRecipient",
      //   "legalAuthority", "maintener", "isPrivate",
      //   "locked"
      // ];

      let fieldListUint256 = ["decimals", "metadataHash", "minHoldingForCallback", "lumpSumFees", "standardFees", "feesUnitType", "feesUnitId"];
      let originalToken = await STASHBLOX._tokens.call(DATA["token1"].id);

      for (var i = 0; i < fieldListUint256.length; i++) {
          let property = fieldListUint256[i];
          let receipt = await STASHBLOX.updateToken.send(DATA["token1"].id, [property], [123456]);

          let token = await STASHBLOX._tokens.call(DATA["token1"].id);
          assert.equal(token[property].valueOf(), 123456, "invalid value");
          // preserve other properties
          for (var j = 0; j < fieldListUint256.length; j++) {
            if (i != j) {
              assert.equal(token[fieldListUint256[j]].toString(), originalToken[fieldListUint256[j]].toString(), "invalid value");
            }
          }

          receipt = await STASHBLOX.updateToken.send(DATA["token1"].id, [property], [originalToken[property]]);
          token = await STASHBLOX._tokens.call(DATA["token1"].id);
          assert.equal(token[property].toString(), originalToken[property].toString(), "invalid value");
      }

    });

    it("should be able to update token", async () => {
      await setMaintenerAuthorization(DATA["token1"].id, accounts[5], true);

      let metadataHash = random();
      let isPrivate = 1;
      let minHoldingForCallback = 5000;
      let legalAuthority = accounts[5];
      let standardFees = 0;
      let lumpSumFees = 3;
      let demurrageFees = 1;
      let feesUnitType = 2;
      let feesUnitAddress = STASHBLOX.address;
      let feesUnitId = DATA["token2"].id;
      let feesRecipient = accounts[5];
      let decimals = 8;
      let maintener = accounts[5];
      let locked = 0;

      let receipt = await STASHBLOX.updateToken.send(DATA["token1"].id, propertiesNames,
                                                    [
                                                      metadataHash,
                                                      isPrivate,
                                                      minHoldingForCallback,
                                                      legalAuthority,
                                                      standardFees,
                                                      lumpSumFees,
                                                      demurrageFees,
                                                      feesUnitType,
                                                      feesUnitAddress,
                                                      feesUnitId,
                                                      feesRecipient,
                                                      decimals,
                                                      maintener,
                                                      locked
                                                    ], {from: accounts[5]});

      expectEvent(receipt, "TokenUpdated", {
        _id: DATA["token1"].id,
        _documentHash: metadataHash
      });

      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      //console.log(token);
      assert.equal(token.metadataHash.toString(), metadataHash.toString(), "invalid value");
      assert.equal(token.minHoldingForCallback.toString(), minHoldingForCallback.toString(), "invalid value");
      assert.equal(token.isPrivate, true, "invalid value");
      assert.equal(token.legalAuthority.toString(), legalAuthority.toString(), "invalid value");
      assert.equal(token.lumpSumFees.toString(), lumpSumFees.toString(), "invalid value");
      assert.equal(token.standardFees.toString(), standardFees.toString(), "invalid value");

      assert.equal(token.feesUnitType.valueOf(), 2, "invalid value");
      assert.equal(token.feesUnitAddress.toString(16), STASHBLOX.address, "invalid value");
      assert.equal(token.feesUnitId.toString(), DATA["token2"].id.toString(), "invalid value");
    });

    it("should not be able to update token", async () => {
      let metadataHash = random();
      let isPrivate = 1;
      let minHoldingForCallback = 5000;
      let legalAuthority = accounts[5];
      let standardFees = 0;
      let lumpSumFees = 3;
      let demurrageFees = 1;
      let feesUnitType = 2;
      let feesUnitAddress = STASHBLOX.address;
      let feesUnitId = DATA["token2"].id;
      let feesRecipient = accounts[5];
      let decimals = 8;
      let maintener = accounts[5];
      let locked = 0;

      expectRevert(
        STASHBLOX.updateToken(
          DATA["token1"].id, propertiesNames,
          [
            metadataHash,
            isPrivate,
            minHoldingForCallback,
            legalAuthority,
            standardFees,
            lumpSumFees,
            demurrageFees,
            feesUnitType,
            feesUnitAddress,
            feesUnitId,
            feesRecipient,
            decimals,
            maintener,
            locked
          ], {from: accounts[5]}),
        "Insufficient permission"
      );

      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      //console.log(token);
      assert.equal(token.metadataHash.toString(), DATA["token1"].metadataHash.toString(), "invalid value");
      assert.equal(token.minHoldingForCallback.toString(), DATA["token1"].minHoldingForCallback.toString(), "invalid value");
      assert.equal(token.isPrivate, DATA["token1"].isPrivate > 0, "invalid value");
      assert.equal(token.legalAuthority.toString(), DATA["token1"].legalAuthority.toString(), "invalid value");
      assert.equal(token.lumpSumFees.toString(), DATA["token1"].lumpSumFees.toString(), "invalid value");
      assert.equal(token.standardFees.toString(), DATA["token1"].standardFees.toString(), "invalid value");

      assert.equal(token.feesUnitType.valueOf(), DATA["token1"].feesUnitType, "invalid value");
      assert.equal(token.feesUnitAddress.toString(16), DATA["token1"].feesUnitAddress.toString(), "invalid value");
      assert.equal(token.feesUnitId.valueOf(), DATA["token1"].feesUnitId, "invalid value");
    });
  });


});
