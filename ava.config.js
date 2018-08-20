export default {
  files: [
    './tests/**/*.test.js'
  ],
  sources: [
    './src/commands/**/*',
    './src/**/*',
    '!./src/**/cli.js'
  ],
  require: [
    'esm'
  ],
  babel: false,
  compileEnhancements: false
};

