const { cp, mkdir, rm, test } = require('shelljs');
const path = require('path');

module.exports = function generateHelperFiles({ outputPath }) {
  rm('-rf', `${outputPath}/helpers`);

  if (!test('-d', outputPath)) {
    mkdir(outputPath);
  }

  mkdir(`${outputPath}/helpers`);

  const helpersPath = path.resolve(__dirname, '../templates/helpers');
  cp('-R', `${helpersPath}/.`, outputPath);
};
