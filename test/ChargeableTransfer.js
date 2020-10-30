const {
  balance,
  initContract,
  initFixtures,
  transferTokens,
  bigN,
  expectEvent,
  expectRevert,
  travelOneYear,
  accounts,
  now,
  ZERO_BYTES32,
  assert
} = require("./lib/helpers.js");

var STASHBLOX, DATA;

describe("ChargeableTransfer.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("#transactionFees", () => {

    it("should return correct storage fees", async () => {
        await travelOneYear(); // travel 365 days ahead

        const storageCost1 = DATA["token1"].storageFees;
        const lumpSumCost1 = DATA["token1"].lumpSumFees;
        const expectedFees1 = (365 * storageCost1) + lumpSumCost1;
        const fees1 = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 10**8);

        assert.equal(fees1.valueOf(), expectedFees1, "Incorrect fees");

        DATA["token1"].storageFees += 5;

        await STASHBLOX.updateToken.send(DATA["token1"].id,
                                        [
                                          DATA["token1"].metadataHash,
                                          DATA["token1"].isPrivate,
                                          DATA["token1"].minHoldingForCallback,
                                          DATA["token1"].legalAuthority,
                                          DATA["token1"].standardFees,
                                          DATA["token1"].lumpSumFees,
                                          DATA["token1"].storageFees,
                                          DATA["token1"].feesUnitType,
                                          DATA["token1"].feesUnitAddress,
                                          DATA["token1"].feesUnitId,
                                          DATA["token1"].feesRecipient,
                                          DATA["token1"].decimals
                                        ]);

        await travelOneYear(); // travel 365 days ahead

        const storageCost2 = DATA["token1"].storageFees;
        const expectedFees2 = expectedFees1 + (365 * storageCost2);
        const fees2 = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 10**8);

        assert.equal(fees2.toString(), expectedFees2.toString(), "Incorrect fees");
    });

  });

  describe("#_transfer", () => {

    it("should update birthday when tokens arrive", async () => {
      await travelOneYear(); // travel 365 days ahead

      // send 500 (on 1000) tokens to account[2]..
      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 500 * 10**8
      });

      // ...and get 250 back one year later
      await travelOneYear(); // travel 365 days ahead

      await transferTokens({
        from: accounts[2],
        to: DATA["token1"].recipient,
        tokenID: DATA["token1"].id,
        amount: 250 * 10**8
      });

      // 500 tokens since 2 years and 250 since now =>
      // average age = ((500*730) + (250*0))/750 = 486,666 days
      let expectedAge = (500 * 365 * 2 * 86400)  / 750;
      let averageAge = await STASHBLOX.averageAge(accounts[1], DATA["token1"].id);

      assert.equal(averageAge.valueOf(), expectedAge, "Incorrect token age");
    });


    it("should throw an error when not enough ETH to pay fees", async () => {
      // travel 365 days ahead
      await travelOneYear();

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);

      // try to send 50 tokens to account[2]..
      await expectRevert(STASHBLOX.safeTransferFrom(DATA["token1"].recipient, accounts[2], DATA["token1"].id, 50 * 10**8, ZERO_BYTES32, {
        from: DATA["token1"].recipient,
        value: storageFees - 1
      }), "Insufficient ETH");
    });


    it("should increase contract balance with transfer fees", async () => {
      let contractBalance1 = await balance.current(STASHBLOX.address);

      // travel 365 days ahead
      await travelOneYear();

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, 50 * 10**8);

      // try to send 50 tokens to account[2]..
      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: 50 * 10**8
      });

      let contractBalance2 = await balance.current(STASHBLOX.address);
      let balanceIncrease =  contractBalance2 - contractBalance1;

      assert.equal(balanceIncrease, storageFees, "Incorrect balance increase");
    });


    it("it should split fees between feesRecipients", async () => {
      let ethBalance = (await STASHBLOX._accounts(DATA["token1"].feesRecipient)).ethBalance
      assert.equal(ethBalance.valueOf(), 0, "Incorrect ETH balance");

      let transferAmount = 38 * 10**8;
      let balance1 = await balance.current(DATA["token1"].feesRecipient);

      // travel 365 days ahead
      await travelOneYear();

      const storageFees = await STASHBLOX.transactionFees.call(DATA["token1"].recipient, DATA["token1"].id, transferAmount);

      // try to send 50 tokens to account[2]..
      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: transferAmount
      });

      ethBalance = (await STASHBLOX._accounts(DATA["token1"].feesRecipient)).ethBalance;
      assert.equal(ethBalance.toString(), storageFees.toString(), "Incorrect balance increase");
    });

  });


  describe("#_transferBatch", () => {
    it("should transfer in batch", async () => {
      let transferAmount = 25 * 10**8;

      // travel 365 days ahead
      await travelOneYear();

      // try to send 25 tokens to account[2]
      await transferTokens({
        from: DATA["token1"].recipient,
        to: accounts[2],
        tokenID: DATA["token1"].id,
        amount: transferAmount
      });

      // travel 365 days ahead
      await travelOneYear();

      const storageFees1 = await STASHBLOX.transactionFees.call(accounts[2], DATA["token1"].id, transferAmount);
      const storageFees2 = await STASHBLOX.transactionFees.call(accounts[2], DATA["token2"].id, transferAmount);

      let providedFees = storageFees1.add(storageFees2);
      await expectRevert(STASHBLOX.safeBatchTransferFrom(accounts[2],
                                                         accounts[3],
                                                         [DATA["token1"].id, DATA["token2"].id],
                                                         [transferAmount, transferAmount],
                                                         ZERO_BYTES32,
                                                         {from: accounts[2], value: providedFees.sub(bigN(1))}),
                                                         "Insufficient ETH");

      await STASHBLOX.safeBatchTransferFrom.send(accounts[2],
                                                 accounts[3],
                                                 [DATA["token1"].id, DATA["token2"].id],
                                                 [transferAmount, transferAmount],
                                                 ZERO_BYTES32,
                                                 {from: accounts[2], value: storageFees1 + storageFees2});

      const balance1 = await STASHBLOX.balanceOf.call(accounts[3], DATA["token1"].id);
      assert.equal(balance1.valueOf(), transferAmount, "Token not received");

      const balance2 = await STASHBLOX.balanceOf.call(accounts[3], DATA["token2"].id);
      assert.equal(balance2.valueOf(), transferAmount, "Token not received");
    });
  });

});
