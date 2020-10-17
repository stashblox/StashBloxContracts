var assert = require("assert")
const crypto = require("crypto");

const { accounts, contract, defaultSender } = require('@openzeppelin/test-environment');
const { BN, constants, expectEvent, expectRevert, time, balance } = require('@openzeppelin/test-helpers');

const random = () => { return new BN(crypto.randomBytes(20).toString('hex')); }
const bigN = (value) => { return new BN(value); }
const StashBloxClass = contract.fromArtifact('StashBlox');
const ZERO_ADDRESS = constants.ZERO_ADDRESS;
const ZERO_BYTES32 = constants.ZERO_BYTES32;


var STASHBLOX;

var DATA = {
  "token1": {
      recipient: accounts[1],
      id: random(),
      supply: 1000 * 10**8,
      decimals: 8,
      metadataHash: random(),
      transactionFees: [4, 0, 1],
      feesRecipients: [accounts[6], accounts[7]],
      feesRecipientsPercentage: [7500, 2500], //75%, 25%
      minHoldingForCallback: 8000, //80%
      privateToken: false
  },
  "token2": {
      recipient: accounts[2],
      id: random(),
      supply: 1000 * 10**8,
      decimals: 8,
      metadataHash: random(),
      transactionFees: [4, 0, 2],
      feesRecipients: [accounts[6], accounts[7]],
      feesRecipientsPercentage: [7500, 2500], //75%, 25%
      minHoldingForCallback: 8000, //80%
      privateToken: false
  }
}

const initContract =  async() => {
    STASHBLOX = await StashBloxClass.new();
    return STASHBLOX
}

const initFixtures = async() => {
    DATA["token1"].receipt = await STASHBLOX.createToken(DATA["token1"].recipient,
                                                         DATA["token1"].id,
                                                         DATA["token1"].supply,
                                                         DATA["token1"].decimals,
                                                         DATA["token1"].metadataHash,
                                                         DATA["token1"].transactionFees,
                                                         DATA["token1"].feesRecipients,
                                                         DATA["token1"].feesRecipientsPercentage,
                                                         DATA["token1"].minHoldingForCallback,
                                                         DATA["token1"].privateToken);
    DATA["token1"].createdAt = await time.latest();

    DATA["token2"].receipt = await STASHBLOX.createToken(DATA["token2"].recipient,
                                                         DATA["token2"].id,
                                                         DATA["token2"].supply,
                                                         DATA["token2"].decimals,
                                                         DATA["token2"].metadataHash,
                                                         DATA["token2"].transactionFees,
                                                         DATA["token2"].feesRecipients,
                                                         DATA["token2"].feesRecipientsPercentage,
                                                         DATA["token2"].minHoldingForCallback,
                                                         DATA["token1"].privateToken);
    DATA["token2"].createdAt = await time.latest();

    return DATA;
}


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

const travelOneYear = async() => {
  await time.increase(time.duration.years(1));
}

const now = async() => {
  return await time.latest();
}

module.exports = exports = {
  initContract,
  initFixtures,
  transferTokens,
  bigN,
  expectEvent,
  expectRevert,
  ZERO_ADDRESS,
  ZERO_BYTES32,
  travelOneYear,
  accounts,
  now,
  balance,
  random,
  assert
}
