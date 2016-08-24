const fs = require('fs');
const shell = require('shelljs');
const { assert } = require('chai');
const reacterminator = require('../lib/index');
const _ = require('lodash');

function checkFile(outputDir, outputFile) {
  assert.deepEqual(
    fs.readFileSync(`./reacterminator/${outputFile}`, 'utf8'),
    fs.readFileSync(`./examples/test-expected/${outputDir}/${outputFile}`, 'utf8')
  );
}

function checkFiles ({inputPath, outputDir, outputFiles, options={}}) {
  shell.rm('-rf', './reacterminator');
  reacterminator(
    { type: 'path', content: inputPath },
    _.extend({}, { fileToComponent: true, generateFiles: true }, options)
  );
  outputFiles.forEach((outputFile) => checkFile(outputDir, outputFile));
}

module.exports = {
  checkFiles,
  checkFile,
};
