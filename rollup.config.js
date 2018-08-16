// rollup.config.js
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
	input: 'src/cli.js',
	output: {
		banner: '#!/usr/bin/env node',
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
		'fs-extra',
		'moment',
		'requestretry',
		'fs',
		'request'
	]
};
