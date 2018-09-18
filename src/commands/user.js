/* eslint no-await-in-loop: 0 */

import { existsSync, createWriteStream } from 'fs-extra';
import puppeteer from 'puppeteer';

import { mkdir, log } from '../tools';
import defaultOptions from '../default';

import { downloadUser } from './download';

export function extractor() {
  const extractedElements = document.querySelectorAll('img');
  const items = [];
  for (const element of extractedElements) {
    if (!element.alt.endsWith('profile picture')) {
      const a = element.parentNode.parentNode.parentNode.href.split('/?taken-by')[0];
      items.push({
        id: a.split('/p/')[1],
        a,
        src: element.src
      });
    }
  }

  return items;
}

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
function inArray(arr, comparer) {
  for (let i = 0; i < arr.length; i += 1) {
    if (comparer(arr[i])) return true;
  }
  return false;
}

// adds an element to the array if it does not already exist using a comparer
// function
function pushIfNotExist(arr, element, comparer) {
  if (!inArray(arr, comparer)) {
    arr.push(element);
  }
}

export async function scroller(page, extractr, targetCount, scrollDelay = 1000) {
  const res = [];

  let items = [];
  try {
    let previousHeight;

    while (res.length < targetCount) {
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);

      items = await page.evaluate(extractr);

      for (const element of items) {
        pushIfNotExist(res, element, e => e.id === element.id);
      }
    }
  } catch (e) { throw e; }

  return res;
}

export function scraper(opt) {
  const {
    user, amount, dist, screenshot, headless
  } = opt;

  return (async () => {
    const browser = await puppeteer.launch({
      timeout: 0,
      headless,
      args: [
        process.env.NODE_ENV === 'test' ? '--no-sandbox' : ''
      ]
    });
    const page = await browser.newPage();

    mkdir(`${dist}/${user}`);
    log(`Loading user page of '${user}'..`);
    await page.goto(`https://www.instagram.com/${user}`);
    await page.setViewport({
      width: 640,
      height: 1080
    });
    log('Page loaded.');

    // Scroll and extract items from the page.
    log('Scrolling through page...');
    const items = await scroller(page, extractor, amount, 200);
    log('Done it!');

    log(`Creating file with image links for user '${user}'.`);
    const stream = createWriteStream(
      `${dist}/${user}/pending.txt`,
      { flags: 'a' }
    );


    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];

      const file = `${dist}/${user}/${item.id}.jpg`;
      const url = `${item.a}/media/?size=l`;

      // Ensure no repeat downloads are made
      if (existsSync(file)) {
        console.log(`Skipping ${item.id}`);
      } else {
        try {
          stream.write(`${url}\n`);
        } catch (e) {
          console.error(e, url);
        }
      }
    }
    stream.end();
    log('File written and closed.');

    if (screenshot) {
      await page.screenshot({ path: `${dist}/${user}/${user}.png`, fullPage: true });
    }

    await browser.close();

    return items.length;
  })();
}

export default function (program) {
  return program
    .command('user <name>')
    .alias('u')
    .description('Get images from user.')
    .option('-A, --amount <number>', `The minimum amount of images expected to download. (default: ${defaultOptions.user.amount})`)
    .option('-D, --destination <path>', `Destination folder. (default: "${defaultOptions.dist}")`)
    .option('-S, --save', `After getting the image links, download the image files. (default: ${defaultOptions.user.save})`)
    .option('-h, --no-headless', 'Opens browser for debugging.')
    .option('-s, --screenshot', 'Saves page screenshot after scrolling is finished')
    .action((user, cmd) => {
      const opt = {
        user,
        amount: cmd.amount || defaultOptions.user.amount,
        dist: cmd.destination || defaultOptions.dist,
        save: cmd.save || defaultOptions.user.save,
        screenshot: cmd.screenshot || defaultOptions.screenshot,
        headless: cmd.headless
      };

      scraper(opt).then(() => {
        if (opt.save) {
          downloadUser(opt.user, opt);
        }
      });
    });
}
