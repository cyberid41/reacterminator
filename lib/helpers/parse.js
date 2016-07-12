const Console = require('console');
const chalk = require('chalk');
const babylon = require('babylon');

module.exports = function parse(string) {
  try {
    return babylon.parse(string, { plugins: ['jsx'] });
  } catch (e) {
    Console.log(chalk.bold.red('problematic string: '), string);
    throw e;
  }
}
