import { log } from '../src/tools';

const pkg = require('../package.json');
const git = require('simple-git')();

log(`Sending new build ${pkg.version} to remote...`);

git.add([
  'bin/*'
]);
git.addTag(pkg.version).exec(() => {
  log(`Created tag ${pkg.version}.`);
});


git.commit(`Publish build ${pkg.version}.`).exec(() => {
  log('Created build commit');
});

log('Pushing build to remote...');
function prom(g) {
  return new Promise(resolve => g.exec(resolve()));
}

Promise.all([
  prom(git.push('origin', 'master')),
  prom(git.pushTags('origin'))
]).then(() => {
  log(`Pushed build and tag ${pkg.version} to origin.`);
});

