import { log } from '../src/tools';

const pkg = require('../package.json');
const git = require('simple-git')();

log(`Sending new build ${pkg.version} to remote...`);

git.add([
  'bin/*'
]);
git.addTag(pkg.version).then(() => {
  log(`Created tag ${pkg.version}.`);
});


git.commit(`Publish build ${pkg.version}.`).then(() => {
  log('Created build commit');
});

log('Pushing build to remote...');
Promise.all([
  git.push('origin', 'master'),
  git.pushTags('origin')
]).then(() => {
  log(`Pushed build and tag ${pkg.version} to origin.`);
});
