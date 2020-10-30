#!/usr/bin/env node

const { execSync } = require('child_process');
const { runCoverage } = require('@openzeppelin/test-environment');

async function main () {
  await runCoverage(
    [],
    'truffle compile',
    './node_modules/.bin/mocha --exit --recursive --no-timeout'.split(' '),
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
