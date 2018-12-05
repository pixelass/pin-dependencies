#!/usr/bin/env node
const globby = require("globby");
const meow = require("meow");
const pin = require("./");

const cli = meow();

const {input, flags} = cli;
const hasFlags = Boolean(Object.keys(flags).filter(flag =>
	flag === "dev" || flag === "peer" || flag === "all"
).length)

const hasInput = input.filter(Boolean).length;
const defaults = [hasInput ? null : "package.json", "!**/node_modules/**/package.json"].filter(Boolean)

const add = flags.yarn ? "add" : "i"
const cmd = flags.yarn ? "yarn" : "npm"
globby([...input, ...defaults]).then(files => {
	files.forEach(async file => {
		pin(file, {add, cmd, hasFlags, flags});
	});
});
