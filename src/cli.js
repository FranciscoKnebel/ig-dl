import program from 'commander';

import pkg from '../package.json';
import commands from './commands/index';

program
  .version(pkg.version)
  .description(pkg.description);

// Define CLI commands.
commands(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
