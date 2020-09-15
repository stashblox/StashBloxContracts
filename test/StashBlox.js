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
  const STORAGE_CREDIT_PRICE = 10
  const STORAGE_COST_1 = 1; // means 1 credit
  const STORAGE_COST_2 = 2; // means 2 credit
  var STASHBLOX, TOKENS_CREATED_AT, CREATE_TOKEN_RECEIPT;

  beforeEach(async function () {
    STASHBLOX = await StashBloxClass.new();

    await STASHBLOX.updateStorageCreditPrice(STORAGE_CREDIT_PRICE);


    CREATE_TOKEN_RECEIPT = await STASHBLOX.createTokens([TOKEN_ID_1, TOKEN_ID_2],
                                                        [accounts[1], accounts[2]],
                                                        [TOKEN_SUPPLY_1, TOKEN_SUPPLY_2], // supplies
                                                        [TOKEN_META_HASH_1, TOKEN_META_HASH_1],
                                                        [STORAGE_COST_1 * 10**8, STORAGE_COST_2 * 10**8]); // storage price WEI
    //console.log(CREATE_TOKEN_RECEIPT.logs[0].args);

    TOKENS_CREATED_AT = await time.latest();
  });


  it("should emit TransferSingle on token creation", async () => {
    expectEvent(CREATE_TOKEN_RECEIPT, "TransferSingle", {
      _operator: defaultSender,
      _from: constants.ZERO_ADDRESS,
      _to: accounts[1],
      _id: TOKEN_ID_1,
      _value: bigN(100)
    });

    expectEvent(CREATE_TOKEN_RECEIPT, "TransferSingle", {
      _operator: defaultSender,
      _from: constants.ZERO_ADDRESS,
      _to: accounts[2],
      _id: TOKEN_ID_2,
      _value: bigN(200)
    });
  });


  it("should update birthday on token creation", async () => {
    let birthday1 = await STASHBLOX.birthdayOf.call(accounts[1], TOKEN_ID_1);
    assert.equal(birthday1.toString(), TOKENS_CREATED_AT.toString(), "Birthday is not correct")

    let birthday2 = await STASHBLOX.birthdayOf.call(accounts[2], TOKEN_ID_2);
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

    const expectedFees1 = 365 * STORAGE_COST_1 * STORAGE_CREDIT_PRICE;
    const fees1 = await STASHBLOX.storageFees.call(accounts[1], TOKEN_ID_1, 1);

    console.log(fees1.toString())
    assert.equal(fees1.valueOf(), expectedFees1, "Incorrect fees");

    await STASHBLOX.updateStorageCost(TOKEN_ID_1, (STORAGE_COST_1 + 5) * 10**8);

    await time.increase(time.duration.years(1)); // travel 365 days ahead

    const expectedFees2 = expectedFees1 + 365 * (STORAGE_COST_1 + 5) * STORAGE_CREDIT_PRICE;
    const fees2 = await STASHBLOX.storageFees.call(accounts[1], TOKEN_ID_1, 1);

    assert.equal(fees2.valueOf(), expectedFees2, "Incorrect fees");
  });


  it("should update birthday when tokens arrive", async () => {
    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    // send 50 tokens to account[2]..
    await STASHBLOX.safeTransferFrom(accounts[1], accounts[2], TOKEN_ID_1, 50, constants.ZERO_BYTES32, {
      from: accounts[1],
      value:200000
    });

    // ...and get 25 back one year later
    await time.increase(time.duration.years(1)); // travel 365 days ahead
    await STASHBLOX.safeTransferFrom(accounts[2], accounts[1], TOKEN_ID_1, 25, constants.ZERO_BYTES32, {
      from: accounts[2],
      value:200000
    });

    // 50 tokens since 2 years and 25 since now =>
    // average age = ((50*730) + (25*0))/75 = 486,666 days
    let expectedAge = (50 * 730) / 75;
    let birthdayAfter = await STASHBLOX.birthdayOf.call(accounts[1], TOKEN_ID_1);
    let actualAge = ((await time.latest()) - birthdayAfter) / 86400;

    assert.equal(actualAge.valueOf(), expectedAge, "Incorrect token age");
  });


  it("should throw an error when not enough ETH to pay fees", async () => {
    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees = await STASHBLOX.storageFees.call(accounts[1], TOKEN_ID_1, 50);

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

    const storageFees = await STASHBLOX.storageFees.call(accounts[1], TOKEN_ID_1, 50);

    // try to send 50 tokens to account[2]..
    await STASHBLOX.safeTransferFrom(accounts[1], accounts[2], TOKEN_ID_1, 50, constants.ZERO_BYTES32, {
      from: accounts[1],
      value: storageFees
    });

    let contractBalance2 = await balance.current(STASHBLOX.address);
    let balanceIncrease =  contractBalance2 - contractBalance1;

    assert.equal(balanceIncrease, storageFees, "Incorrect balance increase");
  });


  it("should withdraw the correct amount", async () => {
    let transferAmount = 38;
    let balance1 = await balance.current(accounts[3]);

    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees = await STASHBLOX.storageFees.call(accounts[1], TOKEN_ID_1, transferAmount);

    // try to send 50 tokens to account[2]..
    await STASHBLOX.safeTransferFrom(accounts[1], accounts[2], TOKEN_ID_1, transferAmount, constants.ZERO_BYTES32, {
      from: accounts[1],
      value: storageFees
    });

    await STASHBLOX.withdraw(accounts[3], storageFees);

    let balance2 = await balance.current(accounts[3]);
    let balanceIncrease =  balance2.sub(balance1);
    let diff = storageFees.sub(balanceIncrease);

    assert.equal(diff.valueOf(), 0, "Incorrect balance increase");
  });


  it("should transfer in batch", async () => {
    let transferAmount = 25;

    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees = await STASHBLOX.storageFees.call(accounts[1], TOKEN_ID_1, transferAmount);
    // try to send 50 tokens to account[2]
    await STASHBLOX.safeTransferFrom(accounts[1], accounts[2], TOKEN_ID_1, transferAmount, constants.ZERO_BYTES32, {
      from: accounts[1],
      value: storageFees
    });

    // travel 365 days ahead
    await time.increase(time.duration.years(1));

    const storageFees1 = await STASHBLOX.storageFees.call(accounts[2], TOKEN_ID_1, transferAmount);
    const storageFees2 = await STASHBLOX.storageFees.call(accounts[2], TOKEN_ID_2, transferAmount);

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

});
