var assert = require("assert")
const crypto = require("crypto");
const { ecsign } = require('ethereumjs-util');

const { accounts, contract, defaultSender, web3 } = require('@openzeppelin/test-environment');
const { BN, constants, expectEvent, expectRevert, time, balance, send } = require('@openzeppelin/test-helpers');

const random = () => { return new BN(crypto.randomBytes(20)); }
const bigN = (value) => { return new BN(value); }
const StashBloxClass = contract.fromArtifact('StashBlox');
const ZERO_ADDRESS = constants.ZERO_ADDRESS;
const ZERO_BYTES32 = constants.ZERO_BYTES32;

var GAS_LOGS = [];
var STASHBLOX;
var SALT = crypto.randomBytes(32);

/*
[0]: metadataHash
[1]: isPrivate
[2]: minHoldingForCallback
[3]: legalAuthority
[4]: standardFees
[5]: lumpSumFees
[6]: demurrageFees
[7]: feesUnitType
[8]: feesUnitAddress
[9]: feesUnitId
[10]: feesRecipient
[11]: decimals
[12]: maintener
[13]: locked
*/

var DATA = {
  "token1": {
      recipient: accounts[1],
      id: random(),
      supply: 1000 * 10**8,
      metadataHash: random(),
      isPrivate: 0,
      standardFees: 0,
      lumpSumFees: 4,
      demurrageFees: 1,
      feesCurrencyId: 0,
      feesRecipient: accounts[6],
      decimals: 8,
      locked: 0
  },
  "token2": {
      recipient: accounts[2],
      id: random(),
      supply: 1000 * 10**8,
      metadataHash: random(),
      isPrivate: 0,
      standardFees: 0,
      lumpSumFees: 4,
      demurrageFees: 2,
      feesCurrencyId: 0,
      feesRecipient: accounts[7],
      decimals: 8,
      locked: 0
  }
}

const initContract =  async() => {
    STASHBLOX = await StashBloxClass.new(SALT);

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

    DATA["token1"].receipt = await STASHBLOX.createTokens.send(DATA["token1"].recipient,
                                                         [DATA["token1"].id],
                                                         DATA["token1"].supply,
                                                         [
                                                           "metadataHash",
                                                           "isPrivate",
                                                           "standardFees",
                                                           "lumpSumFees",
                                                           "demurrageFees",
                                                           "feesCurrencyId",
                                                           "feesRecipient",
                                                           "decimals",
                                                           "locked"
                                                         ],
                                                         [
                                                           DATA["token1"].metadataHash,
                                                           DATA["token1"].isPrivate,
                                                           DATA["token1"].standardFees,
                                                           DATA["token1"].lumpSumFees,
                                                           DATA["token1"].demurrageFees,
                                                           DATA["token1"].feesCurrencyId,
                                                           DATA["token1"].feesRecipient,
                                                           DATA["token1"].decimals,
                                                           DATA["token1"].locked
                                                         ]);
    DATA["token1"].createdAt = await time.latest();

    DATA["token2"].receipt = await STASHBLOX.createTokens.send(DATA["token2"].recipient,
                                                         [DATA["token2"].id],
                                                         DATA["token2"].supply,
                                                         [
                                                           "metadataHash",
                                                           "isPrivate",
                                                           "standardFees",
                                                           "lumpSumFees",
                                                           "demurrageFees",
                                                           "feesCurrencyId",
                                                           "feesRecipient",
                                                           "decimals",
                                                           "locked"
                                                         ],
                                                         [
                                                           DATA["token2"].metadataHash,
                                                           DATA["token2"].isPrivate,
                                                           DATA["token2"].standardFees,
                                                           DATA["token2"].lumpSumFees,
                                                           DATA["token2"].demurrageFees,
                                                           DATA["token2"].feesCurrencyId,
                                                           DATA["token2"].feesRecipient,
                                                           DATA["token2"].decimals,
                                                           DATA["token1"].locked
                                                         ]);
    DATA["token2"].createdAt = await time.latest();

    return DATA;
}


const transferTokens = async (params) => {
    params.operator = params.operator || params.from;

    const balanceFromBefore = await STASHBLOX.balanceOf.call(params.from, params.tokenID);
    const balanceToBefore = await STASHBLOX.balanceOf.call(params.to, params.tokenID);
    const demurrageFees = await STASHBLOX.transactionFees.call(params.from, params.tokenID, params.amount);

    // try to send 50 tokens to account[2]..
    const receipt = await STASHBLOX.safeTransferFrom.send(params.from, params.to, params.tokenID, params.amount, constants.ZERO_BYTES32, {
      from: params.operator,
      value: demurrageFees
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

    let demurrageFees = 0;

    for (var i = 0; i < params.ids.length; i++) {
      demurrageFees += await STASHBLOX.transactionFees.call(params.from, params.ids[i], params.amounts[i]);
    }

    const receipt = await STASHBLOX.safeBatchTransferFrom.send(params.from, params.to, params.ids, params.amounts, constants.ZERO_BYTES32, {
      from: params.operator,
      value: demurrageFees
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

const Actions = {
    "SET_AUTHORIZATION": 0,
    "UPDATE_CONFIG": 1,
    "CREATE_TOKEN": 2,
    "UPDATE_TOKEN": 3,
    "TRANSFER_OWNERSHIP": 4,
    "REGISTER_CURRENCY": 5,
    "CALL_TOKENS": 6,
    "LOCK_ACCOUNT": 7,
    "GSN_FORWARDER": 8,
    "TRANSFER_TOKEN_FOR": 9,
    "HOLD_PRIVATE_TOKEN": 10
}

const setTokenizerAuthorization = async (account, auhtorized) => {
  await STASHBLOX.setAuthorization(account, Actions["CREATE_TOKEN"], 0, auhtorized);
}



const setMaintenerAuthorization = async (tokenId, account, auhtorized) => {
    return await STASHBLOX.setAuthorization(account, Actions["UPDATE_TOKEN"], tokenId, auhtorized);
}

const setTokenLock = async (tokenId, lock, docHash) => {

    return await STASHBLOX.updateToken.send(tokenId,
                                            [
                                              "locked"
                                            ],
                                            [
                                              lock ? 1 : 0
                                            ]);

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
  setMaintenerAuthorization,
  setTokenizerAuthorization,
  setTokenLock,
  bigN,
  expectRevert,
  expectEvent,
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
  GAS_LOGS,
  ecsign,
  SALT,
  BN,
  Actions
}
