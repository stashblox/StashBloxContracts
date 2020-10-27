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
      await STASHBLOX.updateToken(DATA["token1"].id,
                                  DATA["token1"].metadataHash,
                                  DATA["token1"].transactionFees,
                                  DATA["token1"].feesRecipients,
                                  DATA["token1"].feesRecipientsPercentage,
                                  DATA["token1"].minHoldingForCallback,
                                  true,
                                  DATA["token1"].legalAuthority);
  }

  describe("#approveAccount", async () => {

    it("should approve account", async () => {
      await makePrivate()

      let approved = await STASHBLOX.isApprovedAccount(DATA["token1"].id, accounts[2]);
      assert.equal(approved, false, "invalid approval");

      await STASHBLOX.setAccountApproval(DATA["token1"].id, accounts[2], true);

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

      await STASHBLOX.setAccountApproval(DATA["token1"].id, accounts[2], true);

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

      await STASHBLOX.setAccountApproval(DATA["token1"].id, accounts[2], true);
      await STASHBLOX.setAccountApproval(DATA["token1"].id, accounts[2], false);

      approved = await STASHBLOX.isApprovedAccount(DATA["token1"].id, accounts[2]);
      assert.equal(approved, false, "invalid approval");
    });

    it("should raise error on transfer", async () => {
      await makePrivate()

      await STASHBLOX.setAccountApproval(DATA["token1"].id, accounts[2], true);

      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 10 * 10**8
      });


      await STASHBLOX.setAccountApproval(DATA["token1"].id, accounts[2], false);

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: storageFees
      }), "Account not approved");
    });

  });


});
