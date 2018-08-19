// Builds CJS files for all scripts except the main entry,
// for unit testing and module usage outside the CLI.

const rollup = require('rollup');

const {
	plugins, external
} = require('../rollup.config');

const { log, prependAndSave } = require('../bin/lib');

const banner = require('./banner');

const input = ['src/**/*.js', '!src/cli.js'];
const output = {
	file: 'bin/lib.js',
	format: 'cjs'
};

async function build() {
	log('Creating lib bundle for unit tests...');

	// create a bundle
	const bundle = await rollup.rollup({
		input,
		plugins,
		external
	});

	log(`Generating '${output.file}' bundle...`);
	const { code } = await bundle.generate(output);
	log(`Bundle '${output.file}' generated.`);

	log(`Saving ${output.file} file...'`);
	prependAndSave(output.file, banner, code, (err) => {
		if (err) {
			return console.error(err);
		}
		log(`'${output.file}' file saved.`);
	});
}

build();

