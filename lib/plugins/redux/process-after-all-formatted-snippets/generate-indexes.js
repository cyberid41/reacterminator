const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const generateFile = require('../../../helpers/generate-file');
const createActionIndexContent = require('./create-action-index');
const createReducersIndexContent = require('./create-reducer-index');

function createIndexContent({ type, pathNames, importSuffix = '', filePath }) {
  const importsString = pathNames
    .map((fileName) => `import ${_.camelCase(fileName)} from './${fileName}${importSuffix}';`)
    .join('\n');

  const constantsString = pathNames.map(_.camelCase).join(',\n  ');

  const pathName = _.last(path.parse(filePath).dir.split('/'));

  switch (type) {
    case 'action-type-constants':
    case 'action-creators':
      return createActionIndexContent({ type, pathName, importsString, constantsString });
    case 'reducers':
      return createReducersIndexContent({ type, pathName, importsString, constantsString });
    case 'reducers.empty':
      return `\
export default (state = {}) => (state);
`;
    default:
      return `\
export default (state = {}) => (state);
`;
  }
}

function generateIndex({ filePath, type, pathNames, importSuffix }) {
  const content = createIndexContent({
    type: type + (pathNames.length === 0 ? '.empty' : ''),
    pathNames,
    importSuffix,
    filePath,
  });

  generateFile({ filePath, content });
}

function getDirectories(dir) {
  return fs
    .readdirSync(dir)
    .filter((subDir) => fs.statSync(path.resolve(dir, subDir)).isDirectory());
}

function getFileNames(dir) {
  return fs
    .readdirSync(dir)
    .filter((subDir) => fs.statSync(path.resolve(dir, subDir)).isFile())
    .map((name) => path.parse(name).name);
}

module.exports = function generateIndexes({ folderPath, type }) {
  // index for each path file
  const subFolderPaths = getDirectories(folderPath);

  subFolderPaths.forEach((subFolderPath) => {
    const fileNames = getFileNames(path.resolve(folderPath, subFolderPath));

    generateIndex({
      filePath: path.resolve(folderPath, subFolderPath, 'index.js'),
      type,
      pathNames: fileNames,
    });
  });

  // index for all path files
  generateIndex({
    filePath: path.resolve(folderPath, 'index.js'),
    type,
    pathNames: subFolderPaths,
    importSuffix: '/index',
  });
};

