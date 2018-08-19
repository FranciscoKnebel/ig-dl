import { readFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';

import moment from 'moment';

moment.locale('pt-br');

export function multilineComment(lines) {
	return `\n/**${
		lines
			.map(line => `\n*${line.length > 0 ? ` ${line}` : ''}`)
			.join('')
	}/`;
}

export function readFile(path) {
	return readFileSync(path, 'utf8')
		.toString()
		.split('\n');
}

// Make sure the output directory is there.
export function mkdir(newDest) {
	ensureDirSync(newDest);
}

export function getTime(append = ':') {
	return `${moment().format('DD/MM/YYYY-HH:mm:ss')}${append}`;
}

export function log(msg) {
	console.log(getTime(), msg);
}
