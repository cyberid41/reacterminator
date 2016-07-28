const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const generateFile = require('../../../helpers/generate-file');
const prepareFolder = require('../../../helpers/prepare-folder');
const logTask = require('../../../helpers/log-task');
const ensurePathExist = require('../../../helpers/ensure-path-exist');
const generateIndexes = require('./generate-indexes');
const createActionTypeConstantContent = require('./create-action-type-constant-content');
const createReducerContent = require('./create-reducer-content');
const createActionCreatorContent = require('./create-action-creator-content');
const { cp } = require('shelljs');

function generateReduxStore(outputPath) {
  generateFile({
    filePath: path.resolve(outputPath, 'generated/store.js'),
    content: fs.readFileSync(path.resolve(__dirname, 'templates/store.js')),
  });
}

function getTypeAndName(actionName) {
  const actionNameSegments = _.kebabCase(actionName).split('-');
  const actionType = actionNameSegments.shift();
  const actionId = _.camelCase(actionNameSegments.join('-'));
  return { actionId, actionType };
}

function createFileName({ type, actionName }) {
  switch (type) {
    case 'action-type-constants':
    case 'action-creators':
      return `${_.kebabCase(actionName)}.js`;
    case 'reducers':
      return `${_.kebabCase(getTypeAndName(actionName).actionId)}.js`;
    default:
      throw new Error('The file type ${type} is not recognized.');
  }
}

function createContent({ type, fromPath, actionName }) {
  const { actionId, actionType } = getTypeAndName(actionName);

  switch (type) {
    case 'action-type-constants':
      return createActionTypeConstantContent({ fromPath, actionName });
    case 'action-creators':
      return createActionCreatorContent({
        actionId,
        actionType,
        actionName,
        fromPath,
      });
    case 'reducers':
      return createReducerContent({
        actionId,
        actionType,
        actionName,
        fromPath,
      });
    default:
      throw new Error('The content type ${type} is not recognized.');
  }
}

function generateReduxFiles({ type, components, options }) {
  logTask(`generate ${type}`);

  const folderPath = path.resolve(options.outputPath, 'generated', type);

  prepareFolder(folderPath);

  _.each(components, ({ pathName, fromPath, plugins }) => {
    const { redux: { action } } = plugins;

    if (!pathName) {
      return;
    }

    const subFolderPath = path.resolve(folderPath, fromPath);

    prepareFolder(subFolderPath);

    _.each(action, (actionFullName) => {
      const actionName = _.last(actionFullName.split('.'));

      const filePath = path.resolve(
        folderPath,
        fromPath,
        createFileName({ type, actionName })
      );
      const content = createContent({ type, fromPath, actionName });

      if (content) {
        generateFile({ filePath, content });
      }
    });
  });

  generateIndexes({ folderPath, type });
}

function generateHelperFile(outputPath) {
  cp(
    path.resolve(__dirname, 'templates/generated/helpers.js'),
    path.resolve(outputPath, 'generated/helpers.js')
  );
}

module.exports = function processAfterAllFormattedSnippets({ components, options }) {
  if (!options.generateFiles) {
    return { components, options };
  }

  const { outputPath } = options;

  // store
  generateReduxStore(outputPath);
  // action-type-constants
  generateReduxFiles({ type: 'action-type-constants', components, options });
  // action-creators
  generateReduxFiles({ type: 'action-creators', components, options });
  // reducers
  generateReduxFiles({ type: 'reducers', components, options });
  // helpers
  generateHelperFile(outputPath);
  // custom folders
  ensurePathExist(path.resolve(outputPath, 'custom/action-type-constants'));
  ensurePathExist(path.resolve(outputPath, 'custom/action-creators'));
  ensurePathExist(path.resolve(outputPath, 'custom/reducers'));

  return { components, options };
};
