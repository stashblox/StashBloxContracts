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
  ZERO_BYTES32,
  contract,
  web3
} = require("./lib/helpers.js");

const OwnableDelegateProxyMock = contract.fromArtifact('OwnableDelegateProxyMock');
const ProxyRegistryMock = contract.fromArtifact('ProxyRegistryMock');

describe("Proxyable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  const setProxyRegistryAccount = async (address) => {
    return await STASHBLOX.updateConfig.send(
      50,
      "baseURI",
      "versionRecipient",
      defaultSender,
      address,
      address
    );
  }

  describe("#setProxyRegistryAccount", async () => {

    it("should update proxy registry account", async () => {
      await setProxyRegistryAccount(accounts[5]);

      const config = await STASHBLOX._config();

      assert.equal(config.proxyRegistryAccount, accounts[5], "invalid proxy registry account");
    });

  });

  describe("#_isWhitelistedOperator", async () => {

    it("delegate proxy should be able to transfer token", async () => {
      const delegateProxy = await OwnableDelegateProxyMock.new(STASHBLOX.address);
      const proxyRegistry = await ProxyRegistryMock.new(accounts[1], delegateProxy.address);

      await setProxyRegistryAccount(proxyRegistry.address);

      let balanceBefore = await STASHBLOX.balanceOf.call(accounts[2], DATA["token1"].id);

      let storageFees = await STASHBLOX.transactionFees.call(accounts[1], DATA["token1"].id, 50);
      let receipt = await delegateProxy.safeTransferFrom(accounts[1], accounts[2], DATA["token1"].id, 50, ZERO_BYTES32, {
        value: storageFees,
        from: accounts[1]
      });

      expectEvent.inTransaction(receipt.tx, STASHBLOX, "TransferSingle", {
        _operator: delegateProxy.address,
        _from: accounts[1],
        _to: accounts[2],
        _id: DATA["token1"].id,
        _value: bigN(50)
      });

      let balanceAfter = await STASHBLOX.balanceOf.call(accounts[2], DATA["token1"].id);
      assert.equal(balanceAfter.toString(), balanceBefore.add(bigN(50)).toString(), "invalid balance");

    });

    it("should revert transfer if delegate proxy is not approved", async () => {
      const delegateProxy = await OwnableDelegateProxyMock.new(STASHBLOX.address);
      const proxyRegistry = await ProxyRegistryMock.new(accounts[1], delegateProxy.address);

      await setProxyRegistryAccount(proxyRegistry.address);

      let balanceBefore = await STASHBLOX.balanceOf.call(accounts[2], DATA["token2"].id);

      let storageFees = await STASHBLOX.transactionFees.call(accounts[2], DATA["token2"].id, 50);
      expectRevert(delegateProxy.safeTransferFrom(accounts[2], accounts[1], DATA["token2"].id, 50, ZERO_BYTES32, {
        value: storageFees,
        from: accounts[2]
      }), "operator not approved");

      let balanceAfter = await STASHBLOX.balanceOf.call(accounts[2], DATA["token2"].id);
      assert.equal(balanceBefore.toString(), balanceAfter.toString(), "invalid balance");
    });

    it("delegate proxy should be able to transfer token in batch", async () => {
      await transferTokens({
        operator: accounts[2],
        from: accounts[2],
        to: accounts[1],
        tokenID: DATA["token2"].id,
        amount: 50
      });

      const delegateProxy = await OwnableDelegateProxyMock.new(STASHBLOX.address);
      const proxyRegistry = await ProxyRegistryMock.new(accounts[1], delegateProxy.address);

      await setProxyRegistryAccount(proxyRegistry.address);

      let balanceBefore1 = await STASHBLOX.balanceOf.call(accounts[3], DATA["token1"].id);
      let balanceBefore2 = await STASHBLOX.balanceOf.call(accounts[3], DATA["token2"].id);

      let storageFees = await STASHBLOX.transactionFees.call(accounts[1], DATA["token1"].id, 50);
      storageFees += await STASHBLOX.transactionFees.call(accounts[1], DATA["token2"].id, 50);
      let receipt = await delegateProxy.safeBatchTransferFrom(accounts[1], accounts[3],
                                                             [DATA["token1"].id, DATA["token2"].id],
                                                             [50, 50], ZERO_BYTES32, {
        value: storageFees,
        from: accounts[1]
      });

      expectEvent.inTransaction(receipt.tx, STASHBLOX, "TransferBatch", {
        _operator: delegateProxy.address,
        _from: accounts[1],
        _to: accounts[3],
        _ids: [DATA["token1"].id.toString(), DATA["token2"].id.toString()],
        _values: ['50', '50']
      });


      let balanceAfter1 = await STASHBLOX.balanceOf.call(accounts[3], DATA["token1"].id);
      let balanceAfter2 = await STASHBLOX.balanceOf.call(accounts[3], DATA["token2"].id);
      assert.equal(balanceAfter1.toString(), balanceBefore1.add(bigN(50)).toString(), "invalid balance");
      assert.equal(balanceAfter2.toString(), balanceBefore2.add(bigN(50)).toString(), "invalid balance");
    });


    it("should revert batch transfer if delegate proxy is not approved", async () => {
      await transferTokens({
        operator: accounts[2],
        from: accounts[2],
        to: accounts[1],
        tokenID: DATA["token2"].id,
        amount: 50
      });

      const delegateProxy = await OwnableDelegateProxyMock.new(STASHBLOX.address);
      const proxyRegistry = await ProxyRegistryMock.new(accounts[2], delegateProxy.address);

      await setProxyRegistryAccount(proxyRegistry.address);

      let balanceBefore1 = await STASHBLOX.balanceOf.call(accounts[1], DATA["token1"].id);
      let balanceBefore2 = await STASHBLOX.balanceOf.call(accounts[1], DATA["token2"].id);

      let storageFees = await STASHBLOX.transactionFees.call(accounts[1], DATA["token1"].id, 50);
      storageFees += await STASHBLOX.transactionFees.call(accounts[1], DATA["token2"].id, 50);
      expectRevert(delegateProxy.safeBatchTransferFrom(accounts[1], accounts[3],
                                                             [DATA["token1"].id, DATA["token2"].id],
                                                             [50, 50], ZERO_BYTES32, {
        value: storageFees,
        from: accounts[1]
      }), "operator not approved");


      let balanceAfter1 = await STASHBLOX.balanceOf.call(accounts[1], DATA["token1"].id);
      let balanceAfter2 = await STASHBLOX.balanceOf.call(accounts[1], DATA["token2"].id);
      assert.equal(balanceBefore1.toString(), balanceAfter1.toString(), "invalid balance");
      assert.equal(balanceBefore2.toString(), balanceAfter2.toString(), "invalid balance");
    });

  });

});
