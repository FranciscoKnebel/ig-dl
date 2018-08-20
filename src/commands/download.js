import request from 'requestretry';
import { createWriteStream, readFile, unlinkSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

import { log } from '../tools';

function delayStrategy() {
  // set delay of retry to a random number between 500 and 3500 ms
  return Math.floor(Math.random() * (3500 - 500 + 1) + 500);
}

/**
 * @param  {string} url
 * @param  {string} filename
 * @return {Promise}
 */
export function downloadAndSave(url, filename) {
  // TODO: Guarantee that the file will be downloaded or indicate the error
  // to the user.
  // TODO: only remove successfully download files from pending.txt
  return request({
    url,
    delayStrategy
  })
    .pipe(createWriteStream(filename))
    .on('close', () => log(`Saved ${url} to ${filename}`));
}

export default function download(user, opt) {
  const dir = `${opt.dist}/${user}`;

  log(`Downloading images from "${user}..."`);
  readFile(`${dir}/pending.txt`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    data.toString().split('\n').forEach((url, i) => {
      if (url.length > 0) {
        const file = url.split('/p/')[1].split('/media')[0];

        log(`[${i}] ${user} => downloading ${url}.`);
        downloadAndSave(url, `${dir}/${i}.${file}.jpg`);
      }
    });

    unlinkSync(`${dir}/pending.txt`);
  });
}

export function downloadAllUsers(dir) {
  const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
  const users = dirs(dir);

  log(`Downloading images from ${users.length} users.`);
  for (const user of users) {
    download(user);
  }
}

