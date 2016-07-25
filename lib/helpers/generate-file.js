const Console = require('console');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function generateFile({ filePath, content }) {
  fs.writeFileSync(filePath, (content || ''));
  Console.log(`CREATED: ${chalk.green.underline(filePath)}`);
  return true;
};
