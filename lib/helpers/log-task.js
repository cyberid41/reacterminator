const Console = require('console');
const chalk = require('chalk');

module.exports = function logTask(task) {
  Console.log(chalk.bold(`\n===== ${task}`));
};
