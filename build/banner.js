const moment = require('moment');

const pkg = require('../package.json');

const { readFile, multilineComment } = require('../bin/lib');

function buildBanner(prepend) {
	const info = [
		`${pkg.name} - ${pkg.version} - ${moment().format('DD/MM/YYYY')}`,
		pkg.homepage,
		pkg.author,
		''
	];
	const lines = readFile('LICENSE.md');

	return `${prepend}\n${multilineComment(info)}\n${multilineComment(lines)}\n`;
}

module.exports = buildBanner('#!/usr/bin/env node');

