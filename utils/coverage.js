#!/usr/bin/env node

const events = require("events");
const child_process = require("child_process");
const path = require("path");
const fs = require("fs");
const fs_extra = require("fs-extra");
const exit_hook = require("exit-hook");

/* eslint-disable @typescript-eslint/no-var-requires */
async function runCoverage(skipFiles, compileCommand, testCommand) {

    const client = require('ganache-cli');
    const CoverageAPI = require('solidity-coverage/api');
    const utils = require('solidity-coverage/utils');
    const TruffleConfig = require('@truffle/config');

    console.log(TruffleConfig.contracts_directory.get());
    
    const api = new CoverageAPI({
      client,
      providerOptions: {
        allowUnlimitedContractSize: true,
        gasLimit: '0xffffffffffffffff'
      },
      istanbulReporter: ['text']
    });

    const config = {
        workingDir: process.cwd(),
        contractsDir: path.join(process.cwd(), 'contracts'),
        logger: {
            log: (msg) => console.log(msg),
        },
    };

    try {
        const { tempContractsDir, tempArtifactsDir } = utils.getTempLocations(config);

        function cleanUp() {
            if (fs.existsSync('./contracts-backup/')) {
                fs_extra.moveSync('./contracts-backup', './contracts', { overwrite: true });
            }
            fs_extra.removeSync('./build/contracts/');
            fs_extra.removeSync(tempArtifactsDir);
            fs_extra.removeSync(tempContractsDir);
        }

        exit_hook(cleanUp);

        utils.setupTempFolders(config, tempContractsDir, tempArtifactsDir);
        const { targets, skipped } = utils.assembleFiles(config, skipFiles);
        const instrumented = api.instrument(targets);
        utils.save(instrumented, config.contractsDir, tempContractsDir);
        utils.save(skipped, config.contractsDir, tempContractsDir);

        // backup original contracts
        fs_extra.moveSync('./contracts/', './contracts-backup');
        fs_extra.moveSync(tempContractsDir, './contracts/');

        // compile instrumented contracts
        console.log('truffle compile');
        child_process.execSync('truffle compile');

        // run tests
        const forked = child_process.fork(testCommand[0], testCommand.slice(1), {
            env: Object.assign(Object.assign({}, process.env), { cwd: __dirname, OZ_TEST_ENV_COVERAGE: 'TRUE' }),
        });
        const [accounts] = await events.once(forked, 'message');
        api.providerOptions = { accounts: accounts };
        // run Ganache
        const address = await api.ganache();
        // start test-env tests
        forked.send(address);
        // wait for the tests to finish
        await events.once(forked, 'close');
        // write a report
        await api.report();
    }
    catch (e) {
        console.error(e);
        process.exitCode = 1;
    }
    finally {
        await utils.finish(config, api);
    }
}

async function main () {
  await runCoverage(
    [],
    'truffle compile',
    './node_modules/.bin/mocha --exit --recursive --no-timeout --require ./test/lib/hooks.js'.split(' ').concat(process.argv.slice(2)),
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
