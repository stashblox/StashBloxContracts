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

describe("Lockable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("#lockToken", async () => {

    it("should lock token", async () => {
      let locked = await STASHBLOX.isLockedToken(DATA["token1"].id);
      assert.equal(locked, false, "invalid lock");

      const docHash = random();
      const receipt = await STASHBLOX.lockToken(DATA["token1"].id, docHash);

      expectEvent(receipt, "TokenUpdated", {
        _id: DATA["token1"].id,
        _documentHash: docHash
      });

      locked = await STASHBLOX.isLockedToken(DATA["token1"].id);
      assert.equal(locked, true, "invalid lock");
    });

    it("should raise error on transfer", async () => {
      const docHash = random();
      let receipt = await STASHBLOX.lockToken(DATA["token1"].id, docHash);

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: storageFees
      }), "Locked");
    });

  });

  describe("#unlockToken", async () => {

    it("should unlock token", async () => {
      const docHash = random();
      let receipt = await STASHBLOX.lockToken(DATA["token1"].id, docHash);

      locked = await STASHBLOX.isLockedToken(DATA["token1"].id);
      assert.equal(locked, true, "invalid lock");

      receipt = await STASHBLOX.unlockToken(DATA["token1"].id, docHash);
      expectEvent(receipt, "TokenUpdated", {
        _id: DATA["token1"].id,
        _documentHash: docHash
      });

      locked = await STASHBLOX.isLockedToken(DATA["token1"].id);
      assert.equal(locked, false, "invalid lock");

      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 500 * 10**8
      });
    });

  });


  describe("#lockAccount", async () => {

    it("should lock account", async () => {
      let locked = await STASHBLOX.isLockedAccount(accounts[2]);
      assert.equal(locked, false, "invalid lock");

      const docHash = random();
      const receipt = await STASHBLOX.lockAccount(accounts[2], docHash);

      expectEvent(receipt, "AccountUpdated", {
        _account: accounts[2],
        _documentHash: docHash
      });

      locked = await STASHBLOX.isLockedAccount(accounts[2]);
      assert.equal(locked, true, "invalid lock");
    });

    it("should raise error on transfer", async () => {
      const docHash = random();
      let receipt = await STASHBLOX.lockAccount(accounts[2], docHash);

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: storageFees
      }), "Locked");

    });

  });


  describe("#unlockAccount", async () => {

    it("should unlock account", async () => {
      const docHash = random();
      let receipt = await STASHBLOX.lockAccount(accounts[2], docHash);

      locked = await STASHBLOX.isLockedAccount(accounts[2]);
      assert.equal(locked, true, "invalid lock");

      receipt = await STASHBLOX.unlockAccount(accounts[2], docHash);
      expectEvent(receipt, "AccountUpdated", {
        _account: accounts[2],
        _documentHash: docHash
      });

      locked = await STASHBLOX.isLockedAccount(accounts[2]);
      assert.equal(locked, false, "invalid lock");

      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 500 * 10**8
      });
    });

  });
});