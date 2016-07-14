const Console = require('console');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const prepareFolder = require('../../helpers/prepare-folder');
const generateFile = require('../../helpers/generate-file');
const logTask = require('../../helpers/log-task');
const shell = require('shelljs');
const ensurePathExist = require('../../helpers/ensure-path-exist');

function writeToFile({ component, outputPath }) {
  const { componentName, formattedFileSnippet } = component;
  const filePath = `${outputPath}/${componentName}.jsx`;
  return generateFile({ filePath, content: formattedFileSnippet }) && componentName;
}

function createComponentFiles({ components, outputPath }) {
  logTask('generate components');

  // make sure outputPath folder exist
  prepareFolder(outputPath);

  // generate files
  const generateFilesCount = _(components)
    .map((component) => writeToFile({ component, outputPath }))
    .filter()
    .size();

  // log generated components
  Console.log(`${chalk.red.bold(generateFilesCount)} components generated`);
}

function createCustomIndexFile(outputPath) {
  const customIndexPath = path.resolve(outputPath, 'custom/index.js');

  if (!shell.test('-f', customIndexPath)) {
    ensurePathExist(path.resolve(outputPath, 'custom'));
    const customIndexTemplatePath = path.resolve(__dirname, './templates/custom/index.js');

    shell.cp(customIndexTemplatePath, customIndexPath);
  }
}

module.exports = function processAfterAllFormattedSnippets({ component, components, options }) {
  if (!options.generateFiles) {
    return { component, components, options };
  }

  createComponentFiles({
    components,
    outputPath: path.resolve(options.outputPath, 'generated/components'),
  });

  // create custom index object, only if it doesn't exist already
  createCustomIndexFile(options.outputPath);

  return { component, components, options };
};
