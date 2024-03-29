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
  expectRevert,
  Actions
} = require("./lib/helpers.js");

var STASHBLOX, DATA, propertiesNames;

describe("Maintenable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
    propertiesNames = [
      "metadataHash",
      "isPrivate",
      "standardFees",
      "lumpSumFees",
      "demurrageFees",
      "feesCurrencyId",
      "feesRecipient",
      "decimals",
      "locked"
    ];
  });

  describe("#authorizeMaintener", () => {

    it("should authorize maintener", async () => {
      let authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["UPDATE_TOKEN"], DATA["token1"].id);
      assert.equal(authorized, false, "invalid authorization");

      await setMaintenerAuthorization(DATA["token1"].id, accounts[5], true);

      authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["UPDATE_TOKEN"], DATA["token1"].id);
      assert.equal(authorized, true, "invalid authorization");
    });

  });


  describe("#revokeMaintener", () => {

    it("should revoke maintener", async () => {
      let authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["UPDATE_TOKEN"], DATA["token1"].id);
      assert.equal(authorized, false, "invalid authorization");

      await setMaintenerAuthorization(DATA["token1"].id, accounts[5], true);
      await setMaintenerAuthorization(DATA["token1"].id, accounts[5], false);


      authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["UPDATE_TOKEN"], DATA["token1"].id);
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

      let fieldListUint256 = ["decimals", "metadataHash", "lumpSumFees", "standardFees", "feesCurrencyId"];
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
      let standardFees = 0;
      let lumpSumFees = 3;
      let demurrageFees = 1;
      let feesCurrencyId = 0;
      let feesRecipient = accounts[5];
      let decimals = 8;
      let locked = 0;

      let receipt = await STASHBLOX.updateToken.send(DATA["token1"].id, propertiesNames,
                                                    [
                                                      metadataHash,
                                                      isPrivate,
                                                      standardFees,
                                                      lumpSumFees,
                                                      demurrageFees,
                                                      feesCurrencyId,
                                                      feesRecipient,
                                                      decimals,
                                                      locked
                                                    ], {from: accounts[5]});

      expectEvent(receipt, "TokenUpdated", {
        _id: DATA["token1"].id,
        _documentHash: metadataHash
      });

      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      //console.log(token);
      assert.equal(token.metadataHash.toString(), metadataHash.toString(), "invalid value");
      assert.equal(token.isPrivate, true, "invalid value");
      assert.equal(token.lumpSumFees.toString(), lumpSumFees.toString(), "invalid value");
      assert.equal(token.standardFees.toString(), standardFees.toString(), "invalid value");
      assert.equal(token.feesCurrencyId.valueOf(), 0, "invalid value");
    });

    it("should not be able to update token", async () => {
      let metadataHash = random();
      let isPrivate = 1;
      let standardFees = 0;
      let lumpSumFees = 3;
      let demurrageFees = 1;
      let feesCurrencyId = 0;
      let feesRecipient = accounts[5];
      let decimals = 8;
      let locked = 0;

      expectRevert(
        STASHBLOX.updateToken(
          DATA["token1"].id, propertiesNames,
          [
            metadataHash,
            isPrivate,
            standardFees,
            lumpSumFees,
            demurrageFees,
            feesCurrencyId,
            feesRecipient,
            decimals,
            locked
          ], {from: accounts[5]}),
        "not authorized"
      );

      let token = await STASHBLOX._tokens.call(DATA["token1"].id);
      //console.log(token);
      assert.equal(token.metadataHash.toString(), DATA["token1"].metadataHash.toString(), "invalid value");
      assert.equal(token.isPrivate, DATA["token1"].isPrivate > 0, "invalid value");

      assert.equal(token.lumpSumFees.toString(), DATA["token1"].lumpSumFees.toString(), "invalid value");
      assert.equal(token.standardFees.toString(), DATA["token1"].standardFees.toString(), "invalid value");

      assert.equal(token.feesCurrencyId.valueOf(), DATA["token1"].feesCurrencyId, "invalid value");
    });
  });


});
