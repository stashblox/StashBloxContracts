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
  ZERO_BYTES32
} = require("./lib/helpers.js");

describe("Privatizable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  const makePrivate = async () => {
      DATA["token1"].isPrivate = true;

      await STASHBLOX.updateToken(DATA["token1"].id,
                                  DATA["token1"].metadataHash,
                                  DATA["token1"].transactionFees,
                                  DATA["token1"].feesRecipients,
                                  DATA["token1"].feesRecipientsPercentage,
                                  DATA["token1"].minHoldingForCallback,
                                  DATA["token1"].isPrivate,
                                  DATA["token1"].legalAuthority);
  }

  describe("#approveAccount", async () => {

    it("should approve account", async () => {
      await makePrivate()

      let approved = await STASHBLOX.isApprovedAccount(DATA["token1"].id, accounts[2]);
      assert.equal(approved, false, "invalid approval");

      await STASHBLOX.approveAccount(DATA["token1"].id, accounts[2]);

      approved = await STASHBLOX.isApprovedAccount(DATA["token1"].id, accounts[2]);
      assert.equal(approved, true, "invalid approval");
    });

    it("should raise error on transfer", async () => {
      await makePrivate()

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: storageFees
      }), "Account not approved");
    });


    it("should make transfer if approved", async () => {
      await makePrivate()

      await STASHBLOX.approveAccount(DATA["token1"].id, accounts[2]);

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

      let approved = await STASHBLOX.isApprovedAccount(DATA["token1"].id, accounts[2]);
      assert.equal(approved, false, "invalid approval");

      await STASHBLOX.approveAccount(DATA["token1"].id, accounts[2]);
      await STASHBLOX.revokeAccount(DATA["token1"].id, accounts[2]);

      approved = await STASHBLOX.isApprovedAccount(DATA["token1"].id, accounts[2]);
      assert.equal(approved, false, "invalid approval");
    });

    it("should raise error on transfer", async () => {
      await makePrivate()

      await STASHBLOX.approveAccount(DATA["token1"].id, accounts[2]);

      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 10 * 10**8
      });


      await STASHBLOX.revokeAccount(DATA["token1"].id, accounts[2]);

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: storageFees
      }), "Account not approved");
    });

  });


});
