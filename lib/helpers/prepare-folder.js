const ensurePathExist = require('./ensure-path-exist');
const shell = require('shelljs');

module.exports = function prepareFolder(folderPath) {
  shell.rm('-rf', folderPath);
  ensurePathExist(folderPath);
};
