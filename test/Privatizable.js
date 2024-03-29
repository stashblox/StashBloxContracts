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
  ZERO_ADDRESS,
  ZERO_BYTES32,
  Actions
} = require("./lib/helpers.js");

describe("Privatizable.sol", () => {

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

  const makePrivate = async () => {
      await STASHBLOX.updateToken.send(DATA["token1"].id, ["isPrivate"], [1]);
  }

  describe("#approveAccount", async () => {

    it("should approve account", async () => {
      await makePrivate()

      let approved = await STASHBLOX.isAuthorized(accounts[2],  Actions["HOLD_PRIVATE_TOKEN"], DATA["token1"].id);
      assert.equal(approved, false, "invalid approval");

      await STASHBLOX.setAccountApproval.send(DATA["token1"].id, accounts[2], true);

      approved = await STASHBLOX.isAuthorized(accounts[2],  Actions["HOLD_PRIVATE_TOKEN"], DATA["token1"].id);
      assert.equal(approved, true, "invalid approval");
    });

    it("should raise error on transfer", async () => {
      await makePrivate()

      const demurrageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: demurrageFees
      }), "Account not approved");
    });


    it("should make transfer if approved", async () => {
      await makePrivate()

      await STASHBLOX.setAccountApproval.send(DATA["token1"].id, accounts[2], true);

      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 50 * 10**8
      });
    });

  });

  describe("#revokeAccount", async () => {
    it("should revoke account", async () => {
      await makePrivate()

      let approved = await STASHBLOX.isAuthorized(accounts[2],  Actions["HOLD_PRIVATE_TOKEN"], DATA["token1"].id);
      assert.equal(approved, false, "invalid approval");

      await STASHBLOX.setAccountApproval.send(DATA["token1"].id, accounts[2], true);
      await STASHBLOX.setAccountApproval.send(DATA["token1"].id, accounts[2], false);

      approved = await STASHBLOX.isAuthorized(accounts[2],  Actions["HOLD_PRIVATE_TOKEN"], DATA["token1"].id);
      assert.equal(approved, false, "invalid approval");
    });

    it("should raise error on transfer", async () => {
      await makePrivate()

      await STASHBLOX.setAccountApproval.send(DATA["token1"].id, accounts[2], true);

      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 10 * 10**8
      });


      await STASHBLOX.setAccountApproval.send(DATA["token1"].id, accounts[2], false);

      const demurrageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: demurrageFees
      }), "Account not approved");
    });

  });


});
