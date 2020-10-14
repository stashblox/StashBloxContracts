const {
  initContract,
  initFixtures,
  transferTokens,
  bigN
} = require("./StashBloxHelpers.js");

var STASHBLOX, DATA;

describe("Token Callbacks", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });


  //
  // it("should accept callback", async () => {
  //   let totalTransfered = 0;
  //   let balance;
  //   let ethBalance1 = {};
  //
  //   for (var i = 1; i <= 3; i++) {
  //     let transferAmount = i * 3;
  //     totalTransfered += transferAmount;
  //
  //     await transferTokens({
  //       from: accounts[1],
  //       to: accounts[i + 1],
  //       tokenID: TOKEN_ID_1,
  //       amount: transferAmount
  //     });
  //
  //     ethBalance1[i + 1] = await STASHBLOX._ETHBalances(accounts[i + 1]);
  //   }
  //
  //   const price = 100;
  //   let receipt = await STASHBLOX.proposeCallback(TOKEN_ID_1, price, {
  //     from: accounts[1],
  //     value: price * totalTransfered
  //   });
  //
  //   expectEvent(receipt, "CallbackProposed", {
  //     _id: TOKEN_ID_1,
  //     _proposer: accounts[1],
  //     _price: bigN(price)
  //   });
  //
  //   receipt = await STASHBLOX.acceptCallback(TOKEN_ID_1, accounts[1]);
  //
  //   expectEvent(receipt, "CallbackAccepted", {
  //     _id: TOKEN_ID_1,
  //     _proposer: accounts[1],
  //     _price: bigN(price)
  //   });
  //
  //   balance = await STASHBLOX.balanceOf.call(accounts[1], TOKEN_ID_1);
  //   assert.equal(balance.valueOf(), TOKEN_SUPPLY_1, "Token not received");
  //
  //   for (var i = 1; i <= 3; i++) {
  //     balance = await STASHBLOX.balanceOf.call(accounts[i + 1], TOKEN_ID_1);
  //     assert.equal(balance.valueOf(), 0, "Token not received");
  //
  //     ethBalance = await STASHBLOX._ETHBalances(accounts[i + 1]);
  //     let diff = ethBalance.sub(ethBalance1[i + 1]);
  //     assert.equal(diff, i * 3 * price, "ETH not received");
  //   }
  //
  // });
  //
  // it("should refuse callback", async () => {
  //   let totalTransfered = 0;
  //   let balance;
  //   let ethBalance1 = {};
  //
  //   for (var i = 1; i <= 3; i++) {
  //     let transferAmount = i * 3;
  //     totalTransfered += transferAmount;
  //
  //     await transferTokens({
  //       from: accounts[1],
  //       to: accounts[i + 1],
  //       tokenID: TOKEN_ID_1,
  //       amount: transferAmount
  //     });
  //
  //     ethBalance1[i + 1] = await STASHBLOX._ETHBalances(accounts[i + 1]);
  //   }
  //
  //   const price = 100;
  //   let receipt = await STASHBLOX.proposeCallback(TOKEN_ID_1, price, {
  //     from: accounts[1],
  //     value: price * totalTransfered
  //   });
  //
  //   expectEvent(receipt, "CallbackProposed", {
  //     _id: TOKEN_ID_1,
  //     _proposer: accounts[1],
  //     _price: bigN(price)
  //   });
  //
  //   receipt = await STASHBLOX.refuseCallback(TOKEN_ID_1, accounts[1]);
  //
  //   expectEvent(receipt, "CallbackRefused", {
  //     _id: TOKEN_ID_1,
  //     _proposer: accounts[1],
  //     _price: bigN(price)
  //   });
  //
  //   balance = await STASHBLOX.balanceOf.call(accounts[1], TOKEN_ID_1);
  //   assert.equal(balance.valueOf(), TOKEN_SUPPLY_1 - totalTransfered, "Token not received");
  //
  //   for (var i = 1; i <= 3; i++) {
  //     balance = await STASHBLOX.balanceOf.call(accounts[i + 1], TOKEN_ID_1);
  //     assert.equal(balance.valueOf(), i * 3, "Token received");
  //
  //     ethBalance = await STASHBLOX._ETHBalances(accounts[i + 1]);
  //     let diff = ethBalance.sub(ethBalance1[i + 1]);
  //     assert.equal(diff, 0, "ETH received");
  //   }
  //
  // });

});
