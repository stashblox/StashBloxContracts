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
  web3,
  contract
} = require("./lib/helpers.js");

const GSNCapableMock = contract.fromArtifact('GSNCapableMock');

describe("GSNCapable.sol", () => {

  beforeEach(async function () {
    STASHBLOX = await initContract();
    DATA = await initFixtures();

    TRUSTED_FORWARDER = accounts[2];
    UNTRUSTED_FORWARDER = accounts[1];
    FAKE_SENDER = '0x'.padEnd(42, '12');

    const callbackAutoExecuteMaxAccounts = 18;
    const baseURI = "baseURI";
    const versionRecipient = "versionRecipient";
    const owner = defaultSender;
    const proxyRegistryAccount = accounts[1];
    const tokenizer = accounts[5];
    const receipt = await STASHBLOX.updateConfig.send(
      baseURI,
      versionRecipient,
      proxyRegistryAccount
    );

    GSN_RECIPIENT = await GSNCapableMock.new(TRUSTED_FORWARDER);
  });

  describe("#_msgSender", async () => {

    it("should return correct sender", async () => {

      const callMsgSender = async (from, appended) => {
        const encoded = GSN_RECIPIENT.contract.methods.publicMsgSender().encodeABI();
        const data = encoded + appended.replace(/^0x/, '');
        const ret = await web3.eth.call({ from: from, to: GSN_RECIPIENT.address, data: data});
        return web3.eth.abi.decodeParameter('address', ret)
      }

      assert.equal(await callMsgSender(UNTRUSTED_FORWARDER, ''), UNTRUSTED_FORWARDER, 'should leave from address as-is if not from trusted forwarder');
      assert.equal(await callMsgSender(UNTRUSTED_FORWARDER, FAKE_SENDER), UNTRUSTED_FORWARDER, 'should leave from address as-is if not from trusted forwarder');

      assert.equal(await callMsgSender(TRUSTED_FORWARDER, ''), TRUSTED_FORWARDER, 'should leave from address as-is if not enough appended data')
      assert.equal(await callMsgSender(TRUSTED_FORWARDER, '12345678'), TRUSTED_FORWARDER, 'should leave from address as-is if not enough appended data')
      assert.equal(await callMsgSender(TRUSTED_FORWARDER, FAKE_SENDER), FAKE_SENDER, 'should extract from address if called through trusted forwarder')
    });
  });

  describe("#_msgData", async () => {
    it("should return correct data", async () => {
      const encoded = GSN_RECIPIENT.contract.methods.publicMsgData().encodeABI();

      const callMsgData = async (from, appended) => {
        const data = encoded + appended.replace(/^0x/, '');
        const ret = await web3.eth.call({ from: from, to: GSN_RECIPIENT.address, data: data});
        return web3.eth.abi.decodeParameter('bytes', ret)
      }

      const extra = web3.utils.toHex('some extra data to add, which is longer than 20 bytes').slice(2);

      assert.equal(await callMsgData(UNTRUSTED_FORWARDER, ''), encoded, 'should leave msg.data as-is if not from trusted forwarder');
      assert.equal(await callMsgData(UNTRUSTED_FORWARDER, extra), encoded + extra, 'should leave msg.data as-is if not from trusted forwarder');
      assert.equal(await callMsgData(UNTRUSTED_FORWARDER, extra + FAKE_SENDER.slice(2)), encoded + extra + FAKE_SENDER.slice(2), 'should leave msg.data as-is if not from trusted forwarder');

      assert.equal(await callMsgData(TRUSTED_FORWARDER, ''), encoded, 'should leave msg.data as-is if not enough appended data');
      assert.equal(await callMsgData(TRUSTED_FORWARDER, extra + FAKE_SENDER.slice(2)), encoded + extra, 'should extract msg.data if called through trusted forwarder');
    });

  });

});
