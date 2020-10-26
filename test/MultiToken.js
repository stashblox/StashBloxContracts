const {
  initContract,
  initFixtures,
  transferTokens,
  transferTokensBatch,
  bigN,
  random,
  accounts,
  expectEvent,
  expectRevert,
  assert,
  defaultSender,
  ZERO_ADDRESS,
  ZERO_BYTES32,
  contract
} = require("./lib/helpers.js");

const INTERFACE_SIGNATURE_ERC165 = '0x01ffc9a7';
const INTERFACE_SIGNATURE_ERC1155 = '0xd9b67a26';
const INTERFACE_SIGNATURE_UNKNOWN = '0xd9b67a27';

const ERC1155ReceiverMock = contract.fromArtifact('ERC1155ReceiverMock');
const RECEIVER_SINGLE_MAGIC_VALUE = '0xf23a6e61';
const RECEIVER_BATCH_MAGIC_VALUE = '0xbc197c81';

const DummyMock = contract.fromArtifact('DummyMock');

describe("MultiToken.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();
  });

  describe("ERC165", async () => {
    describe("#supportsInterface", async () => {
      it("should support ER1155 interface", async () => {
        let supported = await STASHBLOX.supportsInterface(INTERFACE_SIGNATURE_ERC1155);
        assert.equal(supported, true, "interface not supported")
      });

      it("should support ER165 interface", async () => {
        let supported = await STASHBLOX.supportsInterface(INTERFACE_SIGNATURE_ERC165);
        assert.equal(supported, true, "interface not supported")
      });

      it("should not support unknown interface", async () => {
        let supported = await STASHBLOX.supportsInterface(INTERFACE_SIGNATURE_UNKNOWN);
        assert.equal(supported, false, "interface supported")
      });

    });
  });

  describe("ERC1155", async () => {

    describe("#balanceOf", async () => {

      it("should return correct balance", async () => {
        let balance = await STASHBLOX.balanceOf.call(accounts[1], DATA["token1"].id);
        assert.equal(balance.valueOf(), DATA["token1"].supply, "invalid balance");

        balance = await STASHBLOX.balanceOf.call(accounts[4], DATA["token1"].id);
        assert.equal(balance.valueOf(), 0, "invalid balance");
      });

      it("should revert when asking balance for zero address", async () => {
        expectRevert(STASHBLOX.balanceOf.call(ZERO_ADDRESS, DATA["token1"].id), "ERC1155: balance query for the zero address");
      });

    });

    describe("#balanceOfBatch", async () => {

      it("should return correct balances", async () => {
        const balances = await STASHBLOX.balanceOfBatch.call([accounts[1], accounts[2]], [DATA["token1"].id, DATA["token2"].id]);
        assert.equal(balances[0].valueOf(), DATA["token1"].supply, "invalid balance");
        assert.equal(balances[1].valueOf(), DATA["token2"].supply, "invalid balance");
      });

      it("should revert when asking balance for zero address", async () => {
        expectRevert(STASHBLOX.balanceOfBatch.call([accounts[1], ZERO_ADDRESS], [DATA["token1"].id, DATA["token2"].id]),
                     "ERC1155: some address in batch balance query is zero");
      });

      it("should revert when accounts and IDs don't have same lengths", async () => {
        expectRevert(STASHBLOX.balanceOfBatch.call([accounts[1], accounts[2]], [DATA["token1"].id, DATA["token2"].id, DATA["token2"].id]),
                     "ERC1155: accounts and IDs must have same lengths");
      });

    });

    describe("#setApprovalForAll", async () => {

      it("should revert when someone approve for self", async () => {
        expectRevert(STASHBLOX.setApprovalForAll(accounts[3], true, {from: accounts[3]}),
                     "ERC1155: cannot set approval status for self");
      });

      it("should emit event", async () => {
        let receipt = await STASHBLOX.setApprovalForAll(accounts[1], true, {from: accounts[3]});
        expectEvent(receipt, "ApprovalForAll", {
          _owner: accounts[3],
          _operator: accounts[1],
          _approved: true
        });

        receipt = await STASHBLOX.setApprovalForAll(accounts[1], false, {from: accounts[3]});
        expectEvent(receipt, "ApprovalForAll", {
          _owner: accounts[3],
          _operator: accounts[1],
          _approved: false
        });
      });

    });

    describe("#isApprovedForAll", async () => {
      it("should return the correct permission", async () => {
        await STASHBLOX.setApprovalForAll(accounts[1], true, {from: accounts[3]});
        let permission = await STASHBLOX.isApprovedForAll(accounts[3], accounts[1]);
        assert.equal(permission, true, "invalid permission");

        await STASHBLOX.setApprovalForAll(accounts[1], false, {from: accounts[3]});
        permission = await STASHBLOX.isApprovedForAll(accounts[3], accounts[1]);
        assert.equal(permission, false, "invalid permission");
      });
    });


    describe("#safeTransferFrom", async () => {
      it("should revert when recipient is zero address", async () => {
        expectRevert(STASHBLOX.safeTransferFrom(
          accounts[1], ZERO_ADDRESS, DATA["token1"].id, 50, ZERO_BYTES32,
          {from: accounts[1]}
        ), "ERC1155: target address must be non-zero");
      });

      it("should revert when operator is not approved", async () => {

        expectRevert(STASHBLOX.safeTransferFrom(
          accounts[1], accounts[2], DATA["token1"].id, 50, ZERO_BYTES32,
          {from: accounts[3]}
        ), "ERC1155: need operator approval for 3rd party transfers");

      });

      it("should successfully transfer tokens", async () => {
        await transferTokens({
          operator: accounts[1],
          from: accounts[1],
          to: accounts[2],
          tokenID: DATA["token1"].id,
          amount: 50
        });
      });

      it("should successfully transfer tokens by approved operator", async () => {
        await STASHBLOX.setApprovalForAll(accounts[3], true, {from: accounts[1]});
        await transferTokens({
          operator: accounts[3],
          from: accounts[1],
          to: accounts[2],
          tokenID: DATA["token1"].id,
          amount: 50
        });
      });

      it("valid contract receiver should emit Received event", async () => {
        const receiver = await ERC1155ReceiverMock.new(
          RECEIVER_SINGLE_MAGIC_VALUE, false,
          RECEIVER_BATCH_MAGIC_VALUE, false,
        );

        const receipt = await transferTokens({
          operator: accounts[1],
          from: accounts[1],
          to: receiver.address,
          tokenID: DATA["token1"].id,
          amount: 50
        });

        await expectEvent.inTransaction(receipt.tx, ERC1155ReceiverMock, 'Received', {
          operator: accounts[1],
          from: accounts[1],
          id: DATA["token1"].id,
          value: bigN(50),
          data: ZERO_BYTES32
        });
      });

      it("should revert if receiver is not a valid contract", async () => {
        const receiver = await DummyMock.new();
        const storageFees = await STASHBLOX.transactionFees.call(accounts[1], DATA["token1"].id, 50);

        expectRevert.unspecified(STASHBLOX.safeTransferFrom(
          accounts[1], receiver.address, DATA["token1"].id, 50, ZERO_BYTES32,
          {from: accounts[1], value: storageFees}
        ));
      });

      it("should revert if receiver is a valid contract but refuse tokens", async () => {
        const receiver = await ERC1155ReceiverMock.new(
          RECEIVER_SINGLE_MAGIC_VALUE, true,
          RECEIVER_BATCH_MAGIC_VALUE, true,
        );
        const storageFees = await STASHBLOX.transactionFees.call(accounts[1], DATA["token1"].id, 50);

        expectRevert(STASHBLOX.safeTransferFrom(
          accounts[1], receiver.address, DATA["token1"].id, 50, ZERO_BYTES32,
          {from: accounts[1], value: storageFees}
        ), "ERC1155ReceiverMock: reverting on receive");
      });

    });


    describe("#safeBatchTransferFrom", async () => {

      it("should revert when recipient is zero address", async () => {
        expectRevert(STASHBLOX.safeBatchTransferFrom(
          accounts[1], ZERO_ADDRESS, [DATA["token1"].id, DATA["token1"].id], [50, 50], ZERO_BYTES32,
          {from: accounts[1]}
        ), "ERC1155: target address must be non-zero");
      });

      it("should revert if ids and values don't have the same lengths", async () => {
        expectRevert(STASHBLOX.safeBatchTransferFrom(
          accounts[1], accounts[2], [DATA["token1"].id, DATA["token1"].id], [50, 50, 50], ZERO_BYTES32,
          {from: accounts[3]}
        ), "ERC1155: IDs and values must have same lengths");
      });

      it("should revert when operator is not approved", async () => {
        expectRevert(STASHBLOX.safeBatchTransferFrom(
          accounts[1], accounts[2], [DATA["token1"].id, DATA["token1"].id], [50, 50], ZERO_BYTES32,
          {from: accounts[3]}
        ), "ERC1155: need operator approval for 3rd party transfers");
      });

      it("should successfully transfer tokens", async () => {
        await transferTokens({
          operator: accounts[2],
          from: accounts[2],
          to: accounts[1],
          tokenID: DATA["token2"].id,
          amount: 50
        });

        await transferTokensBatch({
          operator: accounts[1],
          from: accounts[1],
          to: accounts[2],
          ids: [DATA["token1"].id, DATA["token2"].id],
          amounts: [50, 50]
        });
      });

      it("should successfully transfer tokens by approved operator", async () => {
        await transferTokens({
          operator: accounts[2],
          from: accounts[2],
          to: accounts[1],
          tokenID: DATA["token2"].id,
          amount: 50
        });

        await STASHBLOX.setApprovalForAll(accounts[3], true, {from: accounts[1]});
        await transferTokensBatch({
          operator: accounts[3],
          from: accounts[1],
          to: accounts[2],
          ids: [DATA["token1"].id, DATA["token2"].id],
          amounts: [50, 50]
        });
      });

      it("valid contract receiver should emit Received event", async () => {
        const receiver = await ERC1155ReceiverMock.new(
          RECEIVER_SINGLE_MAGIC_VALUE, false,
          RECEIVER_BATCH_MAGIC_VALUE, false,
        );

        await transferTokens({
          operator: accounts[2],
          from: accounts[2],
          to: accounts[1],
          tokenID: DATA["token2"].id,
          amount: 50
        });

        const receipt = await transferTokensBatch({
          operator: accounts[1],
          from: accounts[1],
          to: receiver.address,
          ids: [DATA["token1"].id, DATA["token2"].id],
          amounts: [50, 50]
        });

        await expectEvent.inTransaction(receipt.tx, ERC1155ReceiverMock, 'BatchReceived', {
          operator: accounts[1],
          from: accounts[1],
          ids: [DATA["token1"].id.toString(), DATA["token2"].id.toString()],
          values: ['50', '50'],
          data: ZERO_BYTES32
        });
      });

      it("should revert if receiver is not a valid contract", async () => {
        await transferTokens({
          operator: accounts[2],
          from: accounts[2],
          to: accounts[1],
          tokenID: DATA["token2"].id,
          amount: 50
        });

        const receiver = await DummyMock.new();
        const storageFees = await STASHBLOX.transactionFees.call(accounts[1], DATA["token1"].id, 50);

        expectRevert(STASHBLOX.safeBatchTransferFrom(
          accounts[1], receiver.address, [DATA["token1"].id, DATA["token1"].id], [50, 50], ZERO_BYTES32,
          {from: accounts[1], value: storageFees * 2}
        ), "error");
      });


      it("should revert if receiver is a valid contract but refuse tokens", async () => {
        const receiver = await ERC1155ReceiverMock.new(
          RECEIVER_SINGLE_MAGIC_VALUE, true,
          RECEIVER_BATCH_MAGIC_VALUE, true,
        );

        await transferTokens({
          operator: accounts[2],
          from: accounts[2],
          to: accounts[1],
          tokenID: DATA["token2"].id,
          amount: 50
        });

        const storageFees = await STASHBLOX.transactionFees.call(accounts[1], DATA["token1"].id, 50);

        expectRevert(STASHBLOX.safeBatchTransferFrom(
          accounts[1], receiver.address, [DATA["token1"].id, DATA["token1"].id], [50, 50], ZERO_BYTES32,
          {from: accounts[1], value: storageFees * 2}
        ), "ERC1155ReceiverMock: reverting on batch receive");
      });

    });

  });

  describe("ERC1155Metadata", async () => {
    describe("#uri", async () => {

      it("should return metadata uri", async () => {
        let uri = await STASHBLOX.uri(DATA["token1"].id);
        assert.equal(uri, "http://stashblox.com/tokens/" + DATA["token1"].id.toString(16), "incorrect url");
      });

    });
  });

});
