import test from 'ava';

import { existsSync, lstatSync } from 'fs';
import temp from 'tempy';

import { mkdir } from '../../../../src/tools';

test('should create a directory', (t) => {
  const path = temp.file();
  t.false(existsSync(path));
  mkdir(path);
  t.true(lstatSync(path).isDirectory());
});

test('should create a directory with the path passed', (t) => {
  const path = temp.file();
  t.false(existsSync(path));
  mkdir(path);
  t.true(existsSync(path));
});

test('directory still exists if function is called multiple times', (t) => {
  const path = temp.file();
  t.false(existsSync(path));
  mkdir(path);
  t.true(existsSync(path));

  mkdir(path);
  t.true(existsSync(path));
});

