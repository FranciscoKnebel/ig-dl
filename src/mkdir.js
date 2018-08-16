import fs from 'fs-extra';

// Make sure the output directory is there.
export default function mkdir(newDest) {
	fs.ensureDirSync(newDest);
}
