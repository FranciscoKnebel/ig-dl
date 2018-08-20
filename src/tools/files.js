import { readFileSync, writeFile } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { promisify } from 'util';

// FILES
export function readFile(path) {
  return readFileSync(path, 'utf8')
    .toString()
    .split('\n');
}

export function prependAndSave(file, prepend, data) {
  return promisify(writeFile)(file, prepend + data);
}

export function mkdir(newDest) {
  // Make sure the output directory is there.
  return ensureDirSync(newDest);
}
