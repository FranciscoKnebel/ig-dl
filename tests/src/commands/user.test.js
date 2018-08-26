import test from 'ava';
import temp from 'tempy';

import { existsSync, readdir } from 'fs';
import { promisify } from 'util';

import * as user from '../../../src/commands/user';

const readDirectory = promisify(readdir);

// Extractor
// test('', (t) => {
// });

// Scrapper
test('should create a directory for an user', async (t) => {
  const opt = {
    user: 'test',
    dist: temp.file()
  };

  t.false(existsSync(opt.dist));
  await user.scraper(opt);
  t.true(existsSync(opt.dist));
});

test('should create user folder on dist', async (t) => {
  const opt = {
    user: 'test',
    dist: temp.directory()
  };

  // Number of directory in dist increased
  const files1 = await readDirectory(opt.dist);
  t.is(files1.length, 0);
  await user.scraper(opt);
  const files2 = await readDirectory(opt.dist);
  t.true(files2.length > files1.length);

  // "opt.user" is a directory name inside dist
  t.true(files2.includes(opt.user));
});

test('should save files to created user directory', async (t) => {
  const opt = {
    user: 'test',
    dist: temp.directory()
  };

  await user.scraper(opt);
  const files = await readDirectory(`${opt.dist}/${opt.user}`);
  t.true(files.length > 0);
});

test('should create a "pending.txt" file on user directory', async (t) => {
  const opt = {
    user: 'test',
    dist: temp.directory()
  };

  await user.scraper(opt);
  const files = existsSync(`${opt.dist}/${opt.user}/pending.txt`);
  t.true(files);
});

test('should save a screenshot "user.png" when option is chosen', async (t) => {
  const opt = {
    user: 'test',
    dist: temp.directory(),
    screenshot: true
  };

  await user.scraper(opt);
  const files = existsSync(`${opt.dist}/${opt.user}/${opt.user}.png`);
  t.true(files);
});
