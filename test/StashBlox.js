const crypto = require("crypto");

const { accounts, contract, defaultSender } = require('@openzeppelin/test-environment');
const { BN, constants, expectEvent, expectRevert, time } = require('@openzeppelin/test-helpers');

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

  const STORAGE_PRICE_1 = 10000;
  const STORAGE_PRICE_2 = 20000;
  var STASHBLOX, TOKENS_CREATED_AT, CREATE_TOKEN_RECEIPT;

  beforeEach(async function () {
    STASHBLOX = await StashBloxClass.new();

    CREATE_TOKEN_RECEIPT = await STASHBLOX.createTokens([TOKEN_ID_1, TOKEN_ID_2],
                                                        [accounts[1], accounts[2]],
                                                        [TOKEN_SUPPLY_1, TOKEN_SUPPLY_2], // supplies
                                                        [TOKEN_META_HASH_1, TOKEN_META_HASH_1],
                                                        [STORAGE_PRICE_1, STORAGE_PRICE_2]); // storage price WEI
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
    let b1 = await STASHBLOX.birthdayOf.call(accounts[1], TOKEN_ID_1);
    assert.equal(b1.toString(), TOKENS_CREATED_AT.toString(), "Birthday is not correct")

    let b2 = await STASHBLOX.birthdayOf.call(accounts[2], TOKEN_ID_2);
    assert.equal(b2.toString(), TOKENS_CREATED_AT.toString(), "Birthday is not correct")
  });


  it("should be tokens in initial owners accounts", async () => {
    const balance1 = await STASHBLOX.balanceOf.call(accounts[1], TOKEN_ID_1);
    assert.equal(balance1.valueOf(), TOKEN_SUPPLY_1, "token wasn't in the first account");

    const balance2 = await STASHBLOX.balanceOf.call(accounts[2], TOKEN_ID_2);
    assert.equal(balance2.valueOf(), TOKEN_SUPPLY_2, "token wasn't in the first account");
  });


  it("should return correct storage fees", async () => {
    await time.increase(time.duration.years(1)); // travel 365 days ahead

    const expectedFees1 = 365 * STORAGE_PRICE_1;
    const fees1 = await STASHBLOX.storageFees.call(accounts[1], TOKEN_ID_1, 1);
    assert.equal(fees1.valueOf(), expectedFees1, "Incorrect fees");


  });


});
