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
  send,
  balance
} = require("./lib/helpers.js");

describe("Widthdrawable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("#deposit", async () => {
    it("should increase ETH balance escrowed by the contract", async () => {
      let ethBalance = (await STASHBLOX._accounts(accounts[3])).ETHBalance;
      assert.equal(ethBalance.valueOf(), 0, "invalid eth balance");

      await STASHBLOX.deposit(accounts[3], {
        value: 10000
      })

      ethBalance = (await STASHBLOX._accounts(accounts[3])).ETHBalance;
      assert.equal(ethBalance.valueOf(), 10000, "invalid eth balance");
    });
  });

  describe("#receive", async () => {
    it("should increase ETH balance escrowed by the contract", async () => {
      let ethBalance = (await STASHBLOX._accounts(accounts[3])).ETHBalance;
      assert.equal(ethBalance.valueOf(), 0, "invalid eth balance");

      await send.ether(accounts[3], STASHBLOX.address, 10000);

      ethBalance = (await STASHBLOX._accounts(accounts[3])).ETHBalance;
      assert.equal(ethBalance.valueOf(), 10000, "invalid eth balance");
    });
  });

  describe("#withdraw", async () => {
    it("should raise an error when balance is insufficient", async () => {
      expectRevert(STASHBLOX.withdraw(accounts[3], 10000), "Insufficient balance");
    });

    it("should increase ETH balance", async () => {
      let balanceBefore = await balance.current(accounts[3]);

      await STASHBLOX.deposit(accounts[3], { value: 10000 });
      await STASHBLOX.withdraw(accounts[3], 10000);

      let balanceAfter = await balance.current(accounts[3]);
      let expectedBalance = balanceBefore.add(bigN(10000));
      //console.log(balanceAfter, expectedBalance, balanceBefore);
      assert.equal(balanceAfter.toString(), expectedBalance.toString(), "invalid eth balance");
    });

    it("should decrease ETH balance escrowed by the contract", async () => {
      await send.ether(accounts[3], STASHBLOX.address, 10000);
      await STASHBLOX.withdraw(accounts[3], 4000);

      ethBalance = (await STASHBLOX._accounts(accounts[3])).ETHBalance;
      assert.equal(ethBalance.valueOf(), 6000, "invalid eth balance");
    });
  });


});
