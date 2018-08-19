// Bundles the CLI into a single commonJS file, for command line usage.

const rollup = require('rollup');
const { minify } = require('uglify-js');

const {
	input, output, plugins, external
} = require('../rollup.config');

const banner = require('./banner')('ig-down CLI');

const { log, prependAndSave } = require('../bin/lib');

async function build() {
	log('Creating rollup bundle...');

	// create a bundle
	const bundle = await rollup.rollup({
		input, plugins, external
	});

	log('Generating resulting bundle code');
	const bundleResult = await bundle.generate(output);
	log('Bundle generated.');

	log('Minifying bundle...');
	const minifiedResult = minify(bundleResult.code);
	log('Bundle minified.');

	log('Bundle building finished.');
	return {
		code: bundleResult.code,
		minified: minifiedResult.code
	};
}

function finish({ code, minified }) {
	const original = output.file;
	log(`Saving ${original} file...`);
	prependAndSave(output.file, banner, code, (err) => {
		if (err) {
			return console.error(err);
		}
		log(`${original} file saved.`);
	});

	const minifiedFile = output.file.split('.js')[0];
	log(`Saving ${minifiedFile} file...`);
	prependAndSave(minifiedFile, banner, minified, (err) => {
		if (err) {
			return console.error(err);
		}
		log(`${minifiedFile} file saved.`);
	});
}

build().then(bundle => finish(bundle));

