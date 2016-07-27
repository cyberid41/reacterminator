const fs = require('fs');
const shell = require('shelljs');

function exist (outputPath) {
  try {
    return fs.statSync(outputPath).isDirectory();
  } catch (e) {
    return false;
  }
}

module.exports = function ensurePathExist(outputPath) {
  if (!exist(outputPath)) {
    shell.mkdir('-p', outputPath);
  }
};
