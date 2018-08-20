// Builds CJS files for all scripts except the main entry,
// for unit testing and module usage outside the CLI.

import { minify } from 'uglify-js';

import { log, prependAndSave } from '../src/tools';
import { plugins, external } from '../rollup.config';

import genBanner from './banner';

const rollup = require('rollup');

const input = ['src/**/*.js', '!src/cli.js'];
const output = {
  file: 'bin/lib.js',
  format: 'cjs'
};

const banner = genBanner('ig-down library, for unit testing and module usage.');

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
  let err = await prependAndSave(output.file, banner, code);
  if (err) {
    return console.error(err);
  }
  log(`'${output.file}' file saved.`);

  log('Minifying bundle...');
  const minifiedResult = minify(code);
  log('Bundle minified.');

  const minifiedPath = `${output.file.split('.js')[0]}.min.js`;
  log(`Saving ${minifiedPath} file...'`);
  err = await prependAndSave(minifiedPath, banner, minifiedResult.code);
  if (err) {
    return console.error(err);
  }
  log(`'${minifiedPath}' file saved.`);
}

export default build();

