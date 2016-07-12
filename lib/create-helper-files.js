const Console = require('console');
const { cp, ls, mkdir, rm, test } = require('./helpers/shelljs');
const path = require('path');
const chalk = require('chalk');
const logTask = require('./helpers/log-task');

module.exports = function generateHelperFiles({ outputPath }) {
  logTask('clean & generate helpers');
  rm('-rf', `${outputPath}/helpers`);

  if (!test('-d', outputPath)) {
    mkdir(outputPath);
  }

  mkdir(`${outputPath}/helpers`);

  const helpersPath = path.resolve(__dirname, '../templates/helpers');
  cp('-R', `${helpersPath}/.`, outputPath);

  ls('-A', `${outputPath}/helpers/`).forEach(file => {
    const newFile = `${outputPath}/helpers/${file}`;
    Console.log(`CREATED: ${chalk.green.underline(newFile)}`);
  });
};
