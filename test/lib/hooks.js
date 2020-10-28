const {
  GAS_LOGS
} = require("./helpers.js");

exports.mochaHooks = {
  afterAll(done) {
    console.log(GAS_LOGS);
    done();
  }
};
