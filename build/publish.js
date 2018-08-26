import { log } from '../src/tools';

const pkg = require('../package.json');
const git = require('simple-git/promise')();

function publish() {
  log(`Version ${pkg.version} does not exist.`);
  log(`Sending new build ${pkg.version} to remote...`);

  git.add([
    'bin/*'
  ]);

  git.commit(`Publish build ${pkg.version}.`).then(() => {
    log('Created build commit');

    return git.addTag(pkg.version);
  }).then(() => {
    log(`Created tag ${pkg.version}.`);
    log('Pushing build to remote...');

    return Promise.all([
      git.push('origin', 'master'),
      git.pushTags('origin')
    ]);
  }).then(() => log(`Pushed build and tag ${pkg.version} to origin.`));
}

git.tags()
  .then(tags => !tags.all.includes(pkg.version))
  .then((shouldPublish) => {
    if (!shouldPublish) {
      throw Error('Should not publish. Version tag already exists. Have you bumped package.json version?');
    }
  })
  .then(publish)
  .catch(e => console.error(e));
