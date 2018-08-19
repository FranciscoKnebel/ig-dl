const { readFileSync } = require('fs');
const moment = require('moment');

const pkg = require('../package.json');

function multilineComment(lines) {
	return `\n/**${
		lines
			.map(line => `\n*${line.length > 0 ? ` ${line}` : ''}`)
			.join('')
	}/`;
}

function readFile(path) {
	return readFileSync(path, 'utf8')
		.toString()
		.split('\n');
}

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

