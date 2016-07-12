const fs = require('fs');
const chalk = require('chalk');
const eslintDisable = '/* eslint-disable */\n';
const isCustomFile = require('./is-custom-file');

module.exports = function generateFile({ filePath, content }) {
  const shouldOverride = !isCustomFile(filePath);

  if (shouldOverride) {
    fs.writeFileSync(filePath, eslintDisable + (content || ''));
    console.log(`CREATED: ${chalk.green.underline(filePath)}`);
  }

  return shouldOverride;
};
