export default function unknown(program) {
  return program.on('command:*', () => {
    console.error(
      'Invalid command: %s\nSee --help for a list of available commands.',
      program.args.join(' ')
    );

    process.exit(1);
  });
}
