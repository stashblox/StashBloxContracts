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
  expectRevert,
  setTokenizerAuthorization,
  Actions
} = require("./lib/helpers.js");

var STASHBLOX, DATA, tokenParams, propertiesNames;


describe("Mintable.sol", () => {

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
    tokenParams = [
      DATA["token1"].metadataHash,
      DATA["token1"].isPrivate,
      DATA["token1"].standardFees,
      DATA["token1"].lumpSumFees,
      DATA["token1"].demurrageFees,
      DATA["token1"].feesCurrencyId,
      DATA["token1"].feesRecipient,
      DATA["token1"].decimals,
      DATA["token1"].locked
    ];
  });

  describe("#authorizeTokenizer", () => {

    it("should authorize tokenizser", async () => {
      let authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["CREATE_TOKEN"], 0);
      assert.equal(authorized, false, "invalid authorization");

      await setTokenizerAuthorization(accounts[5], true);

      authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["CREATE_TOKEN"], 0);
      assert.equal(authorized, true, "invalid authorization");
    });

    it("should be able to tokenize", async () => {
      await setTokenizerAuthorization(accounts[5], true);

      const tokenId = random();

      /*
      [0]: metadataHash
      [1]: isPrivate
      [2]: minHoldingForCallback
      [3]: legalAuthority
      [4]: standardFees
      [5]: lumpSumFees
      [6]: demurrageFees
      [7]: feesUnitType
      [8]: feesUnitAddress
      [9]: feesUnitId
     [10]: feesRecipient
     [11]: decimals
     [12]: maintener
     [13]: locked
      */

      await STASHBLOX.createTokens.send(accounts[5],
                                       [tokenId],
                                       DATA["token1"].supply,
                                       propertiesNames,
                                       tokenParams, {from: accounts[5]});

      const balance = await STASHBLOX.balanceOf.call(accounts[5], tokenId);
      assert.equal(balance.valueOf(), DATA["token1"].supply, "token wasn't in the first account");
    });

    it("should not be able to tokenize", async () => {
      const tokenId = random();

      await expectRevert(STASHBLOX.createTokens(accounts[5],
                                  [tokenId],
                                  DATA["token1"].supply,
                                  propertiesNames,
                                  tokenParams, {from: accounts[5]}), "not authorized");

    });
  });


  describe("#revokeTokenizer", () => {

    it("should revoke tokenizer", async () => {
      let authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["CREATE_TOKEN"], 0);
      assert.equal(authorized, false, "invalid authorization");

      await setTokenizerAuthorization(accounts[5], true);
      await setTokenizerAuthorization(accounts[5], false);

      authorized = await STASHBLOX.isAuthorized(accounts[5],  Actions["CREATE_TOKEN"], 0);
      assert.equal(authorized, false, "invalid authorization");
    });

    it("should not be able to tokenize", async () => {
      await setTokenizerAuthorization(accounts[5], true);
      await setTokenizerAuthorization(accounts[5], false);

      const tokenId = random();

      await expectRevert(STASHBLOX.createTokens(accounts[5],
                                  [tokenId],
                                  DATA["token1"].supply,
                                  propertiesNames, tokenParams, {from: accounts[5]}), "not authorized");

    });

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

      assert.equal(averageAge.toString(), expectedAge.toString(), "Birthday is not correct");

      averageAge = await STASHBLOX.averageAge(DATA["token2"].recipient, DATA["token2"].id);
      expectedAge = (await now()).sub(DATA["token2"].createdAt);

      assert.equal(averageAge.toString(), expectedAge.toString(), "Birthday is not correct");
    });


    it("should be tokens in initial owners accounts", async () => {
      const balance1 = await STASHBLOX.balanceOf.call(DATA["token1"].recipient, DATA["token1"].id);
      assert.equal(balance1.valueOf(), DATA["token1"].supply, "token wasn't in the first account");

      const balance2 = await STASHBLOX.balanceOf.call(DATA["token2"].recipient, DATA["token2"].id);
      assert.equal(balance2.valueOf(), DATA["token2"].supply, "token wasn't in the first account");
    });

  });

  describe("#cloneToken", () => {
    it("should create 10 tokens in batch", async () => {

      var ids = [];
      var metadataHashes = [];
      for (var i = 0; i < 10; i++) {
        ids.push(random());
        metadataHashes.push(random());
      }

      const receipt = await STASHBLOX.createTokens.send(
          accounts[5],
          ids,
          DATA["token1"].supply,
          propertiesNames,
          tokenParams
      );

      for (var i = 0; i < 10; i++) {
        expectEvent(receipt, "TransferSingle", {
          _operator: await STASHBLOX.owner.call(),
          _from: ZERO_ADDRESS,
          _to: accounts[5],
          _id: ids[i],
          _value: bigN(DATA["token1"].supply)
        });

        const token = await STASHBLOX._tokens.call(ids[i]);
        assert.equal(token.metadataHash.toString(), tokenParams[0].toString(), "invalid metadataHash");

        const balance = await STASHBLOX.balanceOf.call(accounts[5], ids[i]);
        assert.equal(balance.valueOf(), DATA["token1"].supply, "token wasn't in the first account");
      }

    });


  });

});
