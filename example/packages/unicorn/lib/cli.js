'use strict';

const yargs = require('yargs/yargs');
const unicorn = require('./unicorn');

module.exports = cli;

function cli(cwd) {
  const parser = factory(null, cwd);

  parser.alias('h', 'help');
  parser.alias('v', 'version');

  parser.usage(
    "$0",
    "TODO: description",
    yargs => {
      yargs.options({
        // TODO: options
      });
    },
    argv => unicorn(argv)
  );

  return parser;
}
