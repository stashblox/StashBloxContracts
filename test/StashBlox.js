const crypto = require("crypto");

const { accounts, contract, defaultSender } = require('@openzeppelin/test-environment');
const { BN, constants, expectEvent, expectRevert, time, balance } = require('@openzeppelin/test-helpers');

const random = () => { return new BN(crypto.randomBytes(20).toString('hex')); }
const bigN = (value) => { return new BN(value); }
const StashBloxClass = contract.fromArtifact('StashBlox');

describe("StashBlox", () => {

  const TOKEN_ID_1 = random();
  const TOKEN_ID_2 = random();
  const TOKEN_SUPPLY_1 = 100;
  const TOKEN_SUPPLY_2 = 200;
  const TOKEN_META_HASH_1 = random();
  const TOKEN_META_HASH_2 = random();
  const STORAGE_CREDIT_PRICE = 10;
  const STORAGE_COST_1 = 1; // means 1 credit
  const STORAGE_COST_2 = 2; // means 2 credit
  var STASHBLOX, TOKENS_CREATED_AT, CREATE_TOKEN_RECEIPT;
  const MIN_HOLDING_FOR_CALLBACK = 8000;
  const FEES_RECIPIENT_1 = accounts[6];
  const FEES_RECIPIENT_2 = accounts[7];
  const FEES_RECIPIENT_PERCENTAGE_1 = 7500;
  const FEES_RECIPIENT_PERCENTAGE_2 = 2500;


  const transferTokens = async (params) => {
    const balanceFromBefore = await STASHBLOX.balanceOf.call(params.from, params.tokenID);
    const balanceToBefore = await STASHBLOX.balanceOf.call(params.to, params.tokenID);
    const storageFees = await STASHBLOX.transactionFees.call(params.from, params.tokenID, params.amount);

    // try to send 50 tokens to account[2]..
    await STASHBLOX.safeTransferFrom(params.from, params.to, params.tokenID, params.amount, constants.ZERO_BYTES32, {
      from: params.from,
      value: storageFees
    });

    const balanceFromAfter = await STASHBLOX.balanceOf.call(params.from, params.tokenID);
    const balanceToAfter = await STASHBLOX.balanceOf.call(params.to, params.tokenID);

    assert.equal(balanceFromBefore.sub(balanceFromAfter).toString(), params.amount.toString(), "Incorrect balance");
    assert.equal(balanceToAfter.sub(balanceToBefore).toString(), params.amount.toString(), "Incorrect balance");
  }


  beforeEach(async function () {
    STASHBLOX = await StashBloxClass.new();

    await STASHBLOX.updateStorageCreditPrice(STORAGE_CREDIT_PRICE);

    CREATE_TOKEN_RECEIPT_1 = await STASHBLOX.createToken(accounts[1],
                                                          TOKEN_ID_1,
                                                          TOKEN_SUPPLY_1,
                                                          TOKEN_META_HASH_1,
                                                          [4, 0, STORAGE_COST_1 * 10**8],
                                                          [FEES_RECIPIENT_1, FEES_RECIPIENT_2],
                                                          [FEES_RECIPIENT_PERCENTAGE_1, FEES_RECIPIENT_PERCENTAGE_2],
                                                          MIN_HOLDING_FOR_CALLBACK); // storage price WEI

    CREATE_TOKEN_RECEIPT_2 = await STASHBLOX.createToken(accounts[2],
                                                          TOKEN_ID_2,
                                                          TOKEN_SUPPLY_2,
                                                          TOKEN_META_HASH_2,
                                                          [2, 0, STORAGE_COST_2 * 10**8],
                                                          [FEES_RECIPIENT_1, FEES_RECIPIENT_2],
                                                          [FEES_RECIPIENT_PERCENTAGE_1, FEES_RECIPIENT_PERCENTAGE_2],
                                                          MIN_HOLDING_FOR_CALLBACK); // storage price WEI
    //console.log(CREATE_TOKEN_RECEIPT.logs[0].args);

    TOKENS_CREATED_AT = await time.latest();
  });


  it("should emit TransferSingle on token creation", async () => {
    expectEvent(CREATE_TOKEN_RECEIPT_1, "TransferSingle", {
      _operator: defaultSender,
      _from: constants.ZERO_ADDRESS,
      _to: accounts[1],
      _id: TOKEN_ID_1,
      _value: bigN(100)
    });

    expectEvent(CREATE_TOKEN_RECEIPT_2, "TransferSingle", {
      _operator: defaultSender,
      _from: constants.ZERO_ADDRESS,
      _to: accounts[2],
      _id: TOKEN_ID_2,
      _value: bigN(200)
    });
  });


  it("should update birthday on token creation", async () => {

    let birthday1 = await STASHBLOX._birthdays(TOKEN_ID_1, accounts[1]);
    assert.equal(birthday1.toString(), TOKENS_CREATED_AT.toString(), "Birthday is not correct")

    let birthday2 = await STASHBLOX._birthdays(TOKEN_ID_2, accounts[2]);
    assert.equal(birthday2.toString(), TOKENS_CREATED_AT.toString(), "Birthday is not correct")
  });


  it("should be tokens in initial owners accounts", async () => {
    const balance1 = await STASHBLOX.balanceOf.call(accounts[1], TOKEN_ID_1);
    assert.equal(balance1.valueOf(), TOKEN_SUPPLY_1, "token wasn't in the first account");

    const balance2 = await STASHBLOX.balanceOf.call(accounts[2], TOKEN_ID_2);
    assert.equal(balance2.valueOf(), TOKEN_SUPPLY_2, "token wasn't in the first account");
  });


  it("should return correct storage fees", async () => {
    await time.increase(time.duration.years(1)); // travel 365 days ahead

    const expectedFees1 = (365 * STORAGE_COST_1 * STORAGE_CREDIT_PRICE) + 4;
    const fees1 = await STASHBLOX.transactionFees.call(accounts[1], TOKEN_ID_1, 1);

    //console.log(fees1.toString())
    assert.equal(fees1.valueOf(), expectedFees1, "Incorrect fees");

    await STASHBLOX.updateTransactionFees(TOKEN_ID_1, [4, 0, (STORAGE_COST_1 + 5) * 10**8]);

    await time.increase(time.duration.years(1)); // travel 365 days ahead

    const expectedFees2 = expectedFees1 + (365 * (STORAGE_COST_1 + 5) * STORAGE_CREDIT_PRICE);
    const fees2 = await STASHBLOX.transactionFees.call(accounts[1], TOKEN_ID_1, 1);

    assert.equal(fees2.toString(), expectedFees2.toString(), "Incorrect fees");
  });


  it("should update birthday when tokens arrive", async () => {
    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    // send 50 tokens to account[2]..
    await transferTokens({
      from: accounts[1],
      to: accounts[2],
      tokenID: TOKEN_ID_1,
      amount: 50
    });

    // ...and get 25 back one year later
    await time.increase(time.duration.years(1)); // travel 365 days ahead
    await transferTokens({
      from: accounts[2],
      to: accounts[1],
      tokenID: TOKEN_ID_1,
      amount: 25
    });

    // 50 tokens since 2 years and 25 since now =>
    // average age = ((50*730) + (25*0))/75 = 486,666 days
    let expectedAge = (50 * 730) / 75;
    let birthdayAfter = await STASHBLOX._birthdays(TOKEN_ID_1, accounts[1]);
    let actualAge = ((await time.latest()) - birthdayAfter) / 86400;

    assert.equal(actualAge.valueOf(), expectedAge, "Incorrect token age");
  });


  it("should throw an error when not enough ETH to pay fees", async () => {
    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees = await STASHBLOX.transactionFees.call(accounts[1], TOKEN_ID_1, 50);

    // try to send 50 tokens to account[2]..
    await expectRevert(STASHBLOX.safeTransferFrom(accounts[1], accounts[2], TOKEN_ID_1, 50, constants.ZERO_BYTES32, {
      from: accounts[1],
      value: storageFees - 1
    }), "insufficient ETH for transfer fees");

  });


  it("should increase contract balance with transfer fees", async () => {
    let contractBalance1 = await balance.current(STASHBLOX.address);

    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees = await STASHBLOX.transactionFees.call(accounts[1], TOKEN_ID_1, 50);

    // try to send 50 tokens to account[2]..
    await transferTokens({
      from: accounts[1],
      to: accounts[2],
      tokenID: TOKEN_ID_1,
      amount: 50
    });

    let contractBalance2 = await balance.current(STASHBLOX.address);
    let balanceIncrease =  contractBalance2 - contractBalance1;

    assert.equal(balanceIncrease, storageFees, "Incorrect balance increase");
  });


  it("should withdraw the correct amount", async () => {

    let ethBalance = await STASHBLOX._ETHBalances(FEES_RECIPIENT_1);
    assert.equal(ethBalance.valueOf(), 0, "Incorrect ETH balance");

    let transferAmount = 38;
    let balance1 = await balance.current(FEES_RECIPIENT_1);

    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees = await STASHBLOX.transactionFees.call(accounts[1], TOKEN_ID_1, transferAmount);
    const storageGain1  = storageFees * 0.75;
    const storageGain2  = storageFees * 0.25;
    //console.log("storageGain1", storageGain1.toString())


    // try to send 50 tokens to account[2]..
    await transferTokens({
      from: accounts[1],
      to: accounts[2],
      tokenID: TOKEN_ID_1,
      amount: transferAmount
    });

    ethBalance = await STASHBLOX._ETHBalances(FEES_RECIPIENT_1);
    assert.equal(ethBalance.toString(), storageGain1.toString(), "Incorrect balance increase");
    ethBalance = await STASHBLOX._ETHBalances(FEES_RECIPIENT_2);
    assert.equal(ethBalance.toString(), storageGain2.toString(), "Incorrect balance increase");

    await STASHBLOX.withdraw(FEES_RECIPIENT_1, storageGain1);

    let balance2 = await balance.current(FEES_RECIPIENT_1);
    let balanceIncrease =  balance2.sub(balance1);
    //console.log("balanceIncrease", balanceIncrease.toString())

    assert.equal(balanceIncrease.toString(), storageGain1.toString(), "Incorrect balance increase");
  });


  it("should transfer in batch", async () => {
    let transferAmount = 25;

    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees = await STASHBLOX.transactionFees.call(accounts[1], TOKEN_ID_1, transferAmount);
    // try to send 50 tokens to account[2]
    await STASHBLOX.safeTransferFrom(accounts[1], accounts[2], TOKEN_ID_1, transferAmount, constants.ZERO_BYTES32, {
      from: accounts[1],
      value: storageFees
    });

    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees1 = await STASHBLOX.transactionFees.call(accounts[2], TOKEN_ID_1, transferAmount);
    const storageFees2 = await STASHBLOX.transactionFees.call(accounts[2], TOKEN_ID_2, transferAmount);

    let providedFees = storageFees1.add(storageFees2);
    await expectRevert(STASHBLOX.safeBatchTransferFrom(accounts[2],
                                                       accounts[3],
                                                       [TOKEN_ID_1, TOKEN_ID_2],
                                                       [transferAmount, transferAmount],
                                                       constants.ZERO_BYTES32,
                                                       {from: accounts[2], value: providedFees.sub(bigN(1))}),
                                                       "insufficient ETH for transfer fees");

    await STASHBLOX.safeBatchTransferFrom(accounts[2],
                                          accounts[3],
                                          [TOKEN_ID_1, TOKEN_ID_2],
                                          [transferAmount, transferAmount],
                                          constants.ZERO_BYTES32,
                                          {from: accounts[2], value: storageFees1 + storageFees2});

    const balance1 = await STASHBLOX.balanceOf.call(accounts[3], TOKEN_ID_1);
    assert.equal(balance1.valueOf(), transferAmount, "Token not received");

    const balance2 = await STASHBLOX.balanceOf.call(accounts[3], TOKEN_ID_2);
    assert.equal(balance2.valueOf(), transferAmount, "Token not received");
  });

  it("should accept callback", async () => {
    let totalTransfered = 0;
    let balance;
    let ethBalance1 = {};

    for (var i = 1; i <= 3; i++) {
      let transferAmount = i * 3;
      totalTransfered += transferAmount;

      await transferTokens({
        from: accounts[1],
        to: accounts[i + 1],
        tokenID: TOKEN_ID_1,
        amount: transferAmount
      });

      ethBalance1[i + 1] = await STASHBLOX._ETHBalances(accounts[i + 1]);
    }

    const price = 100;
    let receipt = await STASHBLOX.proposeCallback(TOKEN_ID_1, price, {
      from: accounts[1],
      value: price * totalTransfered
    });

    expectEvent(receipt, "CallbackProposed", {
      _id: TOKEN_ID_1,
      _proposer: accounts[1],
      _price: bigN(price)
    });

    receipt = await STASHBLOX.acceptCallback(TOKEN_ID_1, accounts[1]);

    expectEvent(receipt, "CallbackAccepted", {
      _id: TOKEN_ID_1,
      _proposer: accounts[1],
      _price: bigN(price)
    });

    balance = await STASHBLOX.balanceOf.call(accounts[1], TOKEN_ID_1);
    assert.equal(balance.valueOf(), TOKEN_SUPPLY_1, "Token not received");

    for (var i = 1; i <= 3; i++) {
      balance = await STASHBLOX.balanceOf.call(accounts[i + 1], TOKEN_ID_1);
      assert.equal(balance.valueOf(), 0, "Token not received");

      ethBalance = await STASHBLOX._ETHBalances(accounts[i + 1]);
      let diff = ethBalance.sub(ethBalance1[i + 1]);
      assert.equal(diff, i * 3 * price, "ETH not received");
    }

  });

  it("should refuse callback", async () => {
    let totalTransfered = 0;
    let balance;
    let ethBalance1 = {};

    for (var i = 1; i <= 3; i++) {
      let transferAmount = i * 3;
      totalTransfered += transferAmount;

      await transferTokens({
        from: accounts[1],
        to: accounts[i + 1],
        tokenID: TOKEN_ID_1,
        amount: transferAmount
      });

      ethBalance1[i + 1] = await STASHBLOX._ETHBalances(accounts[i + 1]);
    }

    const price = 100;
    let receipt = await STASHBLOX.proposeCallback(TOKEN_ID_1, price, {
      from: accounts[1],
      value: price * totalTransfered
    });

    expectEvent(receipt, "CallbackProposed", {
      _id: TOKEN_ID_1,
      _proposer: accounts[1],
      _price: bigN(price)
    });

    receipt = await STASHBLOX.refuseCallback(TOKEN_ID_1, accounts[1]);

    expectEvent(receipt, "CallbackRefused", {
      _id: TOKEN_ID_1,
      _proposer: accounts[1],
      _price: bigN(price)
    });

    balance = await STASHBLOX.balanceOf.call(accounts[1], TOKEN_ID_1);
    assert.equal(balance.valueOf(), TOKEN_SUPPLY_1 - totalTransfered, "Token not received");

    for (var i = 1; i <= 3; i++) {
      balance = await STASHBLOX.balanceOf.call(accounts[i + 1], TOKEN_ID_1);
      assert.equal(balance.valueOf(), i * 3, "Token received");

      ethBalance = await STASHBLOX._ETHBalances(accounts[i + 1]);
      let diff = ethBalance.sub(ethBalance1[i + 1]);
      assert.equal(diff, 0, "ETH received");
    }

  });

});
