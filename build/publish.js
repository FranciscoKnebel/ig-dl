const pkg = require('../package.json');
const git = require('simple-git')();

git.add([
  'bin/*'
]);

git.addTag(pkg.version);

git.commit(`Publish new build ${pkg.version}.`);

git.push('origin', 'master');
git.pushTags('origin');
