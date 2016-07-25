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

function processFile(inputPath) {
  reacterminator(
    { type: 'path', content: inputPath },
    { fileToComponent: true, generateFiles: true }
  );
}

function checkFiles ({inputPath, outputDir, outputFiles}) {
  shell.rm('-rf', './reacterminator');
  processFile(inputPath);
  outputFiles.forEach((outputFile) => checkFile(outputDir, outputFile));
}

module.exports = {
  checkFiles,
};
