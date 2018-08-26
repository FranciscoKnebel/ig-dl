import request from 'requestretry';
import { createWriteStream, readFile, unlinkSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

import { promisify } from 'util';

import { log } from '../tools';
import defaultOptions from '../default';

const pReadFile = promisify(readFile);

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
  return new Promise((resolve) => {
    request({
      url,
      delayStrategy,
      fullResponse: false
    })
      .pipe(createWriteStream(filename))
      .on('close', () => {
        log(`Saved ${url} to ${filename}`);
        resolve(filename);
      });
  });
}

export function downloadUser(user, opt) {
  const dir = `${opt.dist}/${user}`;

  log(`Downloading images from "${user}..."`);

  return pReadFile(`${dir}/pending.txt`, 'utf8')
    .then((data) => {
      const downloads = [];

      data.toString().split('\n').forEach((url, i) => {
        if (url.length > 0) {
          const file = url.split('/p/')[1].split('/media')[0];

          log(`[${i}] ${user} => downloading ${url}.`);
          downloads.push(downloadAndSave(url, `${dir}/${file}.jpg`));
        }
      });

      return Promise.all(downloads).then((res) => {
        log('Downloads finished. Removing pending.txt file...');
        unlinkSync(`${dir}/pending.txt`);
        log('pending.txt file removed.');

        return res;
      });
    });
}

export function downloadAllUsers(dir) {
  const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
  const users = dirs(dir);

  log(`Downloading images from ${users.length} users.`);
  for (const user of users) {
    downloadUser(user);
  }
}

export default function (program) {
  return program
    .command('download')
    .alias('d')
    .description('Download images already obtained from users.')
    .option('-U, --user <name>', 'Download all pending images from a user.')
    .option('-A, --all', `Download all pending images from all users. (default: ${defaultOptions.download.all})`)
    .option('-D, --destination <path>', `Destination folder. (default: "${defaultOptions.dist}")`)
    .action((cmd) => {
      const opt = {
        dist: cmd.destination || defaultOptions.dist
      };

      if (cmd.all) {
        downloadAllUsers(opt.dist);
      } else if (cmd.user) {
        downloadUser(cmd.user, opt);
      } else {
        console.log('"user" or "all" option needs to be defined.');
      }
    });
}
