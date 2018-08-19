import { readFileSync, writeFile } from 'fs';
import { ensureDirSync } from 'fs-extra';

import moment from 'moment';

moment.locale('pt-br');

// COMMENTS
export function multilineComment(lines) {
	return `\n/**${
		lines
			.map(line => `\n*${line.length > 0 ? ` ${line}` : ''}`)
			.join('')
	}/`;
}

// FILES
export function readFile(path) {
	return readFileSync(path, 'utf8')
		.toString()
		.split('\n');
}

export function prependAndSave(file, prepend, data, cb) {
	return writeFile(file, prepend + data, cb);
}

export function mkdir(newDest) {
	// Make sure the output directory is there.
	ensureDirSync(newDest);
}

// TIME & DATE
export function getTime(append = ':') {
	return `${moment().format('DD/MM/YYYY-HH:mm:ss')}${append}`;
}

export function log(msg) {
	console.log(getTime(), msg);
}
