const Console = require('console');
const { cp, ls, mkdir, test } = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const logTask = require('./helpers/log-task');

module.exports = function generateCustomIndex({ outputPath }) {
  logTask('check for custom folder, if it doesn\'t exisit create it');

  const customOutputPath = outputPath.replace('/generated', '/custom');

  if (!test('-d', customOutputPath)) {
    mkdir(customOutputPath);
  }

  if (!test('-f', './client/imports/custom/index.js')) {
    const customPath = path.resolve(__dirname, '../templates/custom/index.js');
    cp('-R', `${customPath}/.`, customOutputPath);

    ls('-A', customOutputPath).forEach(file => {
      const newFile = `${customOutputPath}/${file}`;
      Console.log(`CREATED: ${chalk.green.underline(newFile)}`);
    });
  } else {
    const msg = 'IGNORE: CUSTOM OVERRIDE OBJECT ALREADY EXISTS.';
    Console.log(chalk.red.bold(msg));
  }
};
