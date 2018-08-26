import test from 'ava';

import { readFileSync, existsSync } from 'fs';
import temp from 'tempy';

import { prependAndSave } from '../../../../src/tools';

const paths = [
  './tests/mocks/_file3.mock.js',
  './tests/mocks/_file4.mock.js'
];

const files = [];
test.before(() => {
  paths.forEach((path) => {
    files.push(readFileSync(path, 'utf8'));
  });
});

test('should create a new file', async (t) => {
  const data = files[0];

  const path = temp.file();
  await prependAndSave(path, '', data);
  t.true(existsSync(path));
});

test('should write data to file', async (t) => {
  const data = files[0];

  const path = temp.file();
  await prependAndSave(path, '', data);
  const fileData = readFileSync(path, 'utf8');

  t.is(data, fileData);
});

test('should append some data to the beginning of a file and then write it', async (t) => {
  const data = files[0];
  const prepend = files[1];

  const path = temp.file();
  await prependAndSave(path, prepend, data);
  const fileData = readFileSync(path, 'utf8');

  t.is(prepend + data, fileData);
});
