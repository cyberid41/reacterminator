const fs = require('fs');
const shell = require('shelljs');
const { assert } = require('chai');
const reacterminator = require('../lib/index');

function checkFile(outputDir, outputFile) {
  assert.deepEqual(
    fs.readFileSync(`./reacterminator/${outputFile}`, 'utf8'),
    fs.readFileSync(`./examples/test-expected/${outputDir}/${outputFile}`, 'utf8')
  );
}

function checkFiles ({inputPath, outputDir, outputFiles}) {
  shell.rm('-rf', './reacterminator');
  reacterminator(
    { type: 'path', content: inputPath },
    { fileToComponent: true, generateFiles: true }
  );
  outputFiles.forEach((outputFile) => checkFile(outputDir, outputFile));
}

module.exports = {
  checkFiles,
  checkFile,
};
