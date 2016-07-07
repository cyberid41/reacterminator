const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const generateFile = require('../../../helpers/generate-file')
const constCase = require('../../../helpers/const-case')
const createActionIndexContent = require('./create-action-index');

module.exports = function generateIndexes ({folderPath, type}) {
  // index for each path file
  const subFolderPaths = getDirectories(folderPath)

  subFolderPaths.forEach((subFolderPath) => {
    const fileNames = getFileNames(path.resolve(folderPath, subFolderPath))

    generateIndex({
      filePath: path.resolve(folderPath, subFolderPath, 'index.js'),
      type,
      pathNames: fileNames
    })
  })

  // index for all path files
  generateIndex({
    filePath: path.resolve(folderPath, 'index.js'),
    type,
    pathNames: subFolderPaths,
    importSuffix: '/index'
  })
}

function generateIndex ({filePath, type, pathNames, importSuffix}) {
  importSuffix = importSuffix || ''

  const content = createIndexContent({
    type: type + (pathNames.length === 0 ? '.empty' : ''),
    pathNames,
    importSuffix,
    filePath
  })

  generateFile({filePath, content})
}

function getDirectories (dir) {
  return fs
    .readdirSync(dir)
    .filter((subDir) => fs.statSync(path.resolve(dir, subDir)).isDirectory())
}

function getFileNames (dir) {
  return fs
    .readdirSync(dir)
    .filter((subDir) => fs.statSync(path.resolve(dir, subDir)).isFile())
    .map((name) => path.parse(name).name)
}

function createIndexContent ({type, pathNames, importSuffix, filePath}) {
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
      return `\
import { combineReducers } from 'redux';
${importsString}

export default (state = {}, action) => {
  switch (action.type) {
    case '${constCase(pathName)}_INITIALIZE':
      return action.value;
    default:
      return combineReducers({
${constantsString}
      })(state, action);
  }
}
`
    case 'reducers.empty':
      return `\
export default (state = {}) => (state);
`
  }
}
