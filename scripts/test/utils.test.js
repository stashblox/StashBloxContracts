const fs = require('fs');
var assert = require('assert');
var utils = require('../utils.js');

describe('utils', function() {
    describe('#sha256()', function() {
        it('should return sha256', function() {
            assert.equal(utils.sha256("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
        });
    });

    describe('#fileDoubleHash()', function() {
        it('should return double sha256 of file', async function() {
            let h1 = await utils.fileDoubleHash('test/abc.txt');
            let h2 = utils.sha256(utils.sha256("abc\n"));
            assert.equal(h1, h2);
        });
    });

    describe('#resizeImage()', function() {
        it('should resize image', async function() {
            await utils.resizeImage('test/image.jpg','test/thumb.tmp.png', 300, 300);
            let thumbHash = await utils.fileDoubleHash('test/thumb.tmp.png');
            assert.equal(thumbHash, "887df586183714ec2a68ce02812180d248b127aa8e0ed8202cb90c9d23626176");
            fs.unlinkSync('test/thumb.tmp.png');
        });
    });
});
