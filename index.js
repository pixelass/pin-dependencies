const chalk = require('chalk');
const execa = require("execa");
const path = require("path");

const getExact = (items) => Object.entries(items || {})
	.map(([name, version]) => `${name}@${version.replace(/^[\^~]/, "")}`);


module.exports = async function(file, {add, cmd, flags, hasFlags}) {
	const log = {
		cmd: (d) => console.log([chalk.blue(cmd), chalk.blue(add), ...d, chalk.green("--exact")].join(" ")),
		ok: (s) => console.log(`${chalk.yellow("Ok")} No ${s}`),
		success: (d, s) => console.log(`${chalk.green("success")} saved ${d.length} ${d.length > 1 ? s : s.replace(/ies$/, 'y')} with --exact.`)
	}
	const filePath = path.resolve(process.cwd(), file);
	const {dir: cwd} = path.parse(filePath);
	const pkg = require(filePath);
	const dependencies = getExact(pkg.dependencies);
	const devDependencies = getExact(pkg.devDependencies);
	const peerDependencies = getExact(pkg.peerDependencies);

	if ((flags.all || !hasFlags) && Boolean(dependencies.length)) {
		log.cmd(dependencies)
		await execa(cmd, [add, ...dependencies, "--exact"], {cwd, stdio: "inherit" })
		log.success(dependencies, "dependencies");
	} else if (flags.all || !hasFlags) {
		log.ok("dependencies");
	}
	if ((flags.all || flags.dev) && Boolean(devDependencies.length)) {
		log.cmd(devDependencies)
		await execa(cmd, [add, ...devDependencies, "--dev", "--exact"], {cwd, stdio: "inherit" })
		log.success(devDependencies, "dev dependencies");
	} else if (flags.all || flags.dev) {
		log.ok("dev dependencies");
	}
	if ((flags.all || flags.peer) && Boolean(peerDependencies.length)) {
		log.cmd(peerDependencies)
		await execa(cmd, [add, ...peerDependencies, "--peer", "--exact"], {cwd, stdio: "inherit" })
		log.success(peerDependencies, "peer dependencies");
	} else if (flags.all || flags.peer) {
		log.ok("peer dependencies");
	}
};
