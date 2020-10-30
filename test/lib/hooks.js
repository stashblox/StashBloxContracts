const https = require("https");
var Table = require('cli-table3');

const {
  GAS_LOGS, web3, bigN
} = require("./helpers.js");


// fetch prices from https://ethgasstation.info/
function fetchGasPrice() {
  return new Promise(resolve => {
    const url = "https://ethgasstation.info/api/ethgasAPI.json?api-key=7d6c2b7b2761801fb0852591ed972daf352e46032439e32142bbb4e6cf7b";

    https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var response = JSON.parse(body);
          resolve(response);
      });

    }).on('error', function(e){
      console.log("Got an error: ", e);
    });
  });
}

// convert prices from https://ethgasstation.info/ to ETH
const toEth = (stationPrice, round= 5) => {
  let gweiPrice = stationPrice / 10;
  let weiPrice = web3.utils.toWei(bigN(gweiPrice), "gwei");
  let ethPrice = web3.utils.fromWei(weiPrice, "ether");
  ethPrice = Math.round(ethPrice * 10**round) / 10**round;
  return ethPrice.toString()+ " Ξ";
};


exports.mochaHooks = async() => {
  const stationPrices = await fetchGasPrice();

  var table = new Table({
    head: ['Function', 'Calls', 'Av. Gas', 'Fastest', 'Safe Low'],
    colWidths: [28, 10, 10, 12, 12]
  });

  return {
    afterAll(done) {
      //console.log(GAS_LOGS);
      var consumptions = {};
      var cumul = {};
      var average = {};

      for (var i = 0; i < GAS_LOGS.length; i++) {
        const functionName = GAS_LOGS[i].functionName;
        if (!(functionName in consumptions)) {
          consumptions[functionName] = [];
          cumul[functionName] = 0;
        }
        consumptions[functionName].push(GAS_LOGS[i].gasUsed)
        cumul[functionName] += GAS_LOGS[i].gasUsed;
      }

      for (var functionName in consumptions) {
        average[functionName] = cumul[functionName] / consumptions[functionName].length;

        table.push([
          functionName,
          consumptions[functionName].length,
          Math.round(average[functionName]),
          toEth(stationPrices.fastest * average[functionName]),
          toEth(stationPrices.safeLow * average[functionName])
        ]);
      }

      console.log("Gas price from https://ethgasstation.info/");
      console.log("Fastest price: ", stationPrices.fastest / 10, " GWEI");
      console.log("Safe slow price: ", stationPrices.safeLow / 10, " GWEI");
      console.log(table.toString());

      done();
    }
  }

};
