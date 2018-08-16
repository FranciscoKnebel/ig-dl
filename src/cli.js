#!/usr/bin/env node

import program from 'commander';

// COMMANDS
import userCommand from './commands/user';
import downloadCommand, { downloadAllUsers } from './commands/download';

const pkg = require('../package.json');

const defaultOptions = {
	dist: 'dl',
	user: {
		amount: 10,
		save: false
	},
	download: {
		all: false
	}
};

program
	.version(pkg.version)
	.description(pkg.description);

program
	.command('user <name>')
	.description('Get images from user.')
	.option('-A, --amount <number>', `The minimum amount of images expected to download. (default: ${defaultOptions.user.amount})`)
	.option('-D, --destination <path>', `Destination folder. (default: "${defaultOptions.dist}")`)
	.option('-S, --save', `After getting the image links, download the image files. (default: ${defaultOptions.user.save})`)
	.action((user, cmd) => {
		const opt = {
			user,
			amount: cmd.amount || defaultOptions.user.amount,
			dist: cmd.destination || defaultOptions.dist,
			save: cmd.save || defaultOptions.user.save
		};

		userCommand(opt).then(() => {
			if (opt.save) {
				downloadCommand(opt.user, opt);
			}
		});
	});


program.parse(process.argv);
