var assert = require("assert")
const crypto = require("crypto");

const { accounts, contract, defaultSender, web3 } = require('@openzeppelin/test-environment');
const { BN, constants, expectEvent, expectRevert, time, balance, send } = require('@openzeppelin/test-helpers');

const random = () => { return new BN(crypto.randomBytes(20)); }
const bigN = (value) => { return new BN(value); }
const StashBloxClass = contract.fromArtifact('StashBlox');
const ZERO_ADDRESS = constants.ZERO_ADDRESS;
const ZERO_BYTES32 = constants.ZERO_BYTES32;

var GAS_LOGS = [];
var STASHBLOX;


var DATA = {
  "token1": {
      recipient: accounts[1],
      id: random(),
      supply: 1000 * 10**8,
      decimals: 8,
      metadataHash: random(),
      transactionFees: [4, 0, 1, 0, 0, ZERO_ADDRESS],
      feesRecipients: [accounts[6], accounts[7]],
      feesRecipientsPercentage: [7500, 2500], //75%, 25%
      minHoldingForCallback: 8000, //80%
      isPrivate: false,
      legalAuthority: accounts[9]
  },
  "token2": {
      recipient: accounts[2],
      id: random(),
      supply: 1000 * 10**8,
      decimals: 8,
      metadataHash: random(),
      transactionFees: [4, 0, 2, 0, 0, ZERO_ADDRESS],
      feesRecipients: [accounts[6], accounts[7]],
      feesRecipientsPercentage: [7500, 2500], //75%, 25%
      minHoldingForCallback: 8000, //80%
      isPrivate: false,
      legalAuthority: accounts[9]
  }
}

const initContract =  async() => {
    STASHBLOX = await StashBloxClass.new();

    for (var i = 0; i < STASHBLOX.abi.length; i++) {
      if (["payable", "nonpayable"].indexOf(STASHBLOX.abi[i].stateMutability) != -1 && STASHBLOX.abi[i].type == "function") {
        const functionName = STASHBLOX.abi[i].name;
        STASHBLOX[functionName].send = async (...args) => {
          const receipt = await STASHBLOX[functionName](...args);
          GAS_LOGS.push({
            functionName: functionName,
            args: args,
            gasUsed: receipt.receipt.gasUsed
          })
          return receipt;
        }
      }
    }

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
                                                         DATA["token1"].isPrivate,
                                                         DATA["token1"].legalAuthority);
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
                                                         DATA["token2"].isPrivate,
                                                         DATA["token2"].legalAuthority);
    DATA["token2"].createdAt = await time.latest();

    return DATA;
}


const transferTokens = async (params) => {
    params.operator = params.operator || params.from;

    const balanceFromBefore = await STASHBLOX.balanceOf.call(params.from, params.tokenID);
    const balanceToBefore = await STASHBLOX.balanceOf.call(params.to, params.tokenID);
    const storageFees = await STASHBLOX.transactionFees.call(params.from, params.tokenID, params.amount);

    // try to send 50 tokens to account[2]..
    const receipt = await STASHBLOX.safeTransferFrom.send(params.from, params.to, params.tokenID, params.amount, constants.ZERO_BYTES32, {
      from: params.operator,
      value: storageFees
    });

    expectEvent(receipt, "TransferSingle", {
      _operator: params.operator,
      _from: params.from,
      _to: params.to,
      _id: params.tokenID,
      _value: bigN(params.amount)
    });

    const balanceFromAfter = await STASHBLOX.balanceOf.call(params.from, params.tokenID);
    const balanceToAfter = await STASHBLOX.balanceOf.call(params.to, params.tokenID);

    assert.equal(balanceFromBefore.sub(balanceFromAfter).toString(), params.amount.toString(), "Incorrect balance");
    assert.equal(balanceToAfter.sub(balanceToBefore).toString(), params.amount.toString(), "Incorrect balance");

    return receipt;
}

const transferTokensBatch = async (params) => {
    params.operator = params.operator || params.from;

    let balancesToBefore = [];
    for (var i = 0; i < params.ids.length; i++) {
      balancesToBefore[params.ids[i]] = await STASHBLOX.balanceOf.call(params.to, params.ids[i]);
    }

    let balancesFromBefore = [];
    for (var i = 0; i < params.ids.length; i++) {
      balancesFromBefore[params.ids[i]] = await STASHBLOX.balanceOf.call(params.from, params.ids[i]);
    }

    let storageFees = 0;

    for (var i = 0; i < params.ids.length; i++) {
      storageFees += await STASHBLOX.transactionFees.call(params.from, params.ids[i], params.amounts[i]);
    }

    const receipt = await STASHBLOX.safeBatchTransferFrom.send(params.from, params.to, params.ids, params.amounts, constants.ZERO_BYTES32, {
      from: params.operator,
      value: storageFees
    });

    expectEvent(receipt, "TransferBatch", {
      _operator: params.operator,
      _from: params.from,
      _to: params.to
    });

    for (var i = 0; i < params.ids.length; i++) {
      assert.equal(receipt.logs[0].args._ids[i].toString(), params.ids[i].toString(), "invalid IDs in event");
      assert.equal(receipt.logs[0].args._values[i].toString(), params.amounts[i].toString(), "invalid IDs in event");

      const balanceFromAfter = await STASHBLOX.balanceOf.call(params.from, params.ids[i]);
      const balanceToAfter = await STASHBLOX.balanceOf.call(params.to, params.ids[i]);

      assert.equal(balancesFromBefore[params.ids[i]].sub(balanceFromAfter).toString(), params.amounts[i].toString(), "Incorrect balance");
      assert.equal(balanceToAfter.sub(balancesToBefore[params.ids[i]]).toString(), params.amounts[i].toString(), "Incorrect balance");
    }

    return receipt;
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
  transferTokensBatch,
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
  assert,
  defaultSender,
  send,
  contract,
  web3,
  GAS_LOGS
}
