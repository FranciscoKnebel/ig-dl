// rollup.config.js
const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');

module.exports = {
	input: 'src/cli.js',
	output: {
		file: 'bin/cli.js',
		format: 'cjs'
	},
	plugins: [
		replace({
			delimiters: ['', ''],
			'#!/usr/bin/env node': ''
		}),
		json({
			// for tree-shaking, properties will be declared as
			// variables, using either `var` or `const`
			preferConst: false, // Default: false

			// specify indentation for the generated default export —
			// defaults to '\t'
			indent: '  '
		}),
		commonjs({
			extensions: ['.js', '.json'],
			'node_modules/babel-runtime/helpers/asyncToGenerator.js': ['default']
		}),
		resolve({
			main: true,
			jsnext: true,
			preferBuiltins: true
		}),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: true
		})
	],
	external: [
		'commander',
		'puppeteer',
		'path',
		'fs',
		'fs-extra',
		'moment',
		'requestretry',
		'request'
	]
};
