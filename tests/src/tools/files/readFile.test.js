import test from 'ava';

import { readFileSync } from 'fs';

import { isArrayOfStrings } from '../../../helpers/matchers';
import { readFile } from '../../../../src/tools';

const paths = [
  './tests/mocks/_file1.mock.js',
  './tests/mocks/_file2.mock.js'
];

const files = [];
test.before(() => {
  paths.forEach((path) => {
    files.push(readFile(path));
  });
});

test('should read a file and return an array of strings', (t) => {
  files.forEach((lines) => {
    t.true(isArrayOfStrings(lines));
  });
});

test('should separate each line of file into an element of an array', (t) => {
  paths.forEach((path, i) => {
    const file = readFileSync(path, 'utf8');

    file.split('\n').forEach((line, j) => {
      t.is(line, files[i][j]);
    });
  });
});
