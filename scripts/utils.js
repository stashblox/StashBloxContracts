const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require("path");

const globby = require('globby');
const sharp = require('sharp');
const yaml = require('js-yaml');

const Web3 = require('web3');
const {Storage} = require('@google-cloud/storage');


const CONTRACT_ADDRESS = "0x56C1FA53f4a2820ac6EA1bF722bEcA9e6A87f056";
const CONTRACT_JSON = require('./build/contracts/StashBlox.json');
const CONTRACT_OWNER = "0x53bE362c082b0Af63729948E43ea5d6540B2ACa8";
const GAS_PRICE = ""
const GAS = ""

const STORAGE = new Storage({
    projectId: "tokenstore-273515",
    keyFilename: "../secrets/TokenStore-57088da51441.json"
});
const BUCKET = "tokensdata";
const STORAGE_URL = "https://storage.googleapis.com/" + BUCKET + "/";


const IMAGE_SIZE = {
    "big": [1000, 1000],
    "medium": [500, 500],
    "small": [200, 200]
};

function sha256(data) {
    let shasum = crypto.createHash('sha256');
    shasum.update(data);
    return shasum.digest('hex');
}

function fileDoubleHash(filePath) {
    return new Promise((resolve, reject) => {
        let shasum = crypto.createHash('sha256');
        try {
            let stream = fs.ReadStream(filePath);
            stream.on('data', function (data) {
                shasum.update(data)
            });
            stream.on('end', function () {
                const hash = sha256(shasum.digest('hex'));
                resolve(hash);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function toYAML(object, sortKeys) {
    var y = yaml.safeDump(object, {
        lineWidth: 250,
        sortKeys: sortKeys || false
    });
    const re = /(url|image)\:\s'([^']*)'/g; // fix yaml-js bug: urls doesn't need quote
    return  y.replace(re, '$1: $2');
}

function fromYAML(filepath) {
    var doc = yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
    return doc
}

function resizeImage(inputFilePath, outputFilePath, width, height) {
    return new Promise((resolve, reject) => {
        try {
            sharp(inputFilePath)
                .resize(width, height, {
                    fit: sharp.fit.contain,
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .toFile(outputFilePath)
                .then(() => {
                    resolve()
                 });
         } catch (error) {
             reject(error);
         }
    });
}

function uploadFile(fromFilePath, toFilePath) {
    return new Promise((resolve, reject) => {
        STORAGE
            .bucket(BUCKET)
            .upload(fromFilePath, {
                destination: toFilePath,
            })
            .then(() => {
                console.log(fromFilePath + " uploaded");
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function uploadeFolder(fromFolderPath, toFolderPath) {
    return new Promise((resolve, reject) => {
        var counter = 0;
        globby([fromFolderPath + '/**/*']).then(paths => {
            paths.map(fromFilePath => {
                let toFilePath = toFolderPath + fromFilePath.substr(fromFolderPath.length);
                uploadFile(fromFilePath, toFilePath).then(() => {
                    counter++;
                    if (counter == paths.length) resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
}

async function prepareTokenImages(tokenID, imagesPaths, tmpFolder) {
    var images = []
    for (var i in imagesPaths) {
        const imageName = "image-" + String(Number(i) + 1).padStart(2, '0');
        for (var sizeName in IMAGE_SIZE) {
            const size = IMAGE_SIZE[sizeName];
            const filename = imageName + "-" + sizeName + ".png";
            const filepath = path.join(tmpFolder, filename);
            await resizeImage(imagesPaths[i], filepath, size[0], size[1]);
            const imageHash = await fileDoubleHash(filepath);
            const imageURL = STORAGE_URL + tokenID + "/" + filename;
            images.push({
                "url": imageURL,
                "hash": imageHash
            })
        }
    }
    return images;
}



async function prepareTokenFolder(owner, name, description, supply, decimals, imagesPaths, attributes) {

    const tokenID = crypto.randomBytes(32).toString('hex');

    const tmpFolder = path.join(os.tmpdir(), "token-" + tokenID);
    fs.mkdirSync(tmpFolder, { recursive: true });

    const images = await prepareTokenImages(tokenID, imagesPaths, tmpFolder);

    const metadata = {
        "id": tokenID,
        "name": name,
        "owner": owner,
        "description": description,
        "supply": supply,
        "decimals": decimals,
        "image": images[0]["url"],
        "properties": {
            "attributes": attributes,
            "images": images
        }
    };

    const metatdataHash = sha256(sha256(toYAML(metadata, true)));
    metadata["hash"] = metatdataHash;

    var yamlMeta = toYAML(metadata);
    fs.writeFileSync(path.join(tmpFolder, "metadata.yaml"), yamlMeta);

    return tmpFolder;
}

async function uploadTokenFolder(tmpFolder) {
    var y = yaml.safeLoad(fs.readFileSync(path.join(tmpFolder, "metadata.yaml")));
    await uploadeFolder(tmpFolder, y.id);
}

async function prepareTransaction(metadata) {
    web3 = new Web3();

    const nonce = await web3.eth.getTransactionCount(CONTRACT_OWNER);

    StashBloxContract = new web3.eth.Contract(STASHBLOX_JSON.abi, CONTRACT_ADDRESS);

    const data = StashBloxContract.methods.createTokens(
                    [metadata.id],
                    [metadata.owner],
                    [metadata.supply],
                    [metadata.hash]).encodeABI();

    return {
        "from": CONTRACT_OWNER,
        "to": CONTRACT_ADDRESS,
        "value": 0,
        "data": data,
        "nonce": nonce,
        // "gas": GAS,
        // "gasPrice": GAS_PRICE
    }
}


exports.fileDoubleHash = fileDoubleHash;
exports.sha256 = sha256;
exports.resizeImage = resizeImage;

// //uploadFile("tokenid", "test/abc.txt");
(async () => {
    // var m = await prepareTokenFolder("name", "description", 8, [
    //     "test/image.jpg",
    //     "test/image2.jpeg"
    // ], {"a": "value", "b": 3});

    await uploadTokenFolder("/tmp/token-f462e77adb0d7b741ce827d4c42d2315cf5591290d4e935fa120838f4bbe7c5a");


    //=> ['unicorn', 'rainbow']
})();

// var y = yaml.dump({
//     "name": "tokenname",
//     "description": "desc",
//     "properties": {
//         "p1": "v1",
//         "p2": "v2"
//     }
// });
//
// console.log(y);
