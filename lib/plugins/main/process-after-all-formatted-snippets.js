const Console = require('console');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const prepareFolder = require('../../helpers/prepare-folder');
const generateFile = require('../../helpers/generate-file');
const logTask = require('../../helpers/log-task');

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

module.exports = function processAfterAllFormattedSnippets({ component, components, options }) {
  if (!options.generateFiles) {
    return { component, components, options };
  }

  createComponentFiles({
    components,
    outputPath: path.resolve(options.outputPath, 'components'),
  });

  return { component, components, options };
};
