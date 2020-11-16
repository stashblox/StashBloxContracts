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
  ZERO_ADDRESS
} = require("./lib/helpers.js");

describe("Ownable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("#owner", async () => {

    it("should return correct owner", async () => {
      const owner = await STASHBLOX.owner();
      assert.equal(owner, defaultSender, "Invalid owner");

      const config = await STASHBLOX.getConfig.call();
      assert.equal(config.owner, defaultSender, "Invalid owner");

    });

  });


  describe("#transferOwnership", async () => {

    it("should change the owner", async () => {
      let owner = await STASHBLOX.owner();
      assert.equal(owner, defaultSender, "Invalid owner");

      const receipt = await STASHBLOX.transferOwnership.send(accounts[3]);

      expectEvent(receipt, "OwnershipTransferred", {
        previousOwner: defaultSender,
        newOwner: accounts[3]
      })

      owner = await STASHBLOX.owner();
      assert.equal(owner, accounts[3], "Invalid owner");
    });

  });


});
