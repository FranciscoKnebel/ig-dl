import program from 'commander';

// COMMANDS
import userCommand from './commands/user';
import downloadCommand, { downloadAllUsers } from './commands/download';

import defaultOptions from './default';

import pkg from '../package.json';

program
  .version(pkg.version)
  .description(pkg.description);

program
  .command('user <name>')
  .alias('u')
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

program
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
      downloadCommand(cmd.user, opt);
    } else {
      console.log('"user" or "all" option needs to be defined.');
    }
  });

// error on unknown commands
program.on('command:*', () => {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
