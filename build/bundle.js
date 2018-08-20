// Bundles the CLI into a single commonJS file, for command line usage.

import { minify } from 'uglify-js';

import { log, prependAndSave } from '../src/tools';
import { input, output, plugins, external } from '../rollup.config';
import genBanner from './banner';

const rollup = require('rollup');

const banner = genBanner('ig-down CLI');

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

async function finish({ code, minified }) {
  const original = output.file;
  log(`Saving ${original} file...`);

  let err = await prependAndSave(output.file, banner, code);
  if (err) {
    return console.error(err);
  }
  log(`${original} file saved.`);

  const minifiedFile = output.file.split('.js')[0];
  log(`Saving ${minifiedFile} file...`);
  err = await prependAndSave(minifiedFile, banner, minified);
  if (err) {
    return console.error(err);
  }
  log(`${minifiedFile} file saved.`);
}

build().then(bundle => finish(bundle));

