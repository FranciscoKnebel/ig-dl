/* eslint no-await-in-loop: 0 */

import fs from 'fs-extra';
import puppeteer from 'puppeteer';

import { mkdir, log } from '../tools';

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
			items = await page.evaluate(extractr);

			for (const element of items) {
				pushIfNotExist(res, element, e => e.id === element.id);
			}

			previousHeight = await page.evaluate('document.body.scrollHeight');
			await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
			await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
			await page.waitFor(scrollDelay);
		}
	} catch (e) { throw e; }

	return res;
}

export default function scraper(opt) {
	const { user, amount, dist } = opt;

	return (async () => {
		const browser = await puppeteer.launch({
			timeout: 0,
			headless: false
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
		const stream = fs.createWriteStream(
			`${dist}/${user}/pending.txt`,
			{ flags: 'a' }
		);
		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];

			const dir = `${dist}/${user}/${items.length - 1 - i}.${item.id}.jpg`;
			const url = `${item.a}/media/?size=l`;

			if (fs.existsSync(dir)) {
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

		// await page.screenshot({ path: `${user}.png`, fullPage: true });

		await browser.close();

		return items.length;
	})();
}
