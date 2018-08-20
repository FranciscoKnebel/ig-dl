import moment from 'moment';

import pkg from '../package.json';
import { readFile, multilineComment } from '../src/tools';

function buildBanner(prepend, title = '') {
  const info = [
    title, '',
    `${pkg.name} - ${pkg.version} - ${moment().format('DD/MM/YYYY')}`,
    pkg.homepage,
    pkg.author,
    ''
  ];
  const lines = readFile('LICENSE.md');

  return `${prepend}\n${multilineComment(info)}\n${multilineComment(lines)}\n`;
}

export default title => buildBanner('#!/usr/bin/env node', title);

