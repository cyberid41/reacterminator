const _ = require('lodash');
const { ls } = require('shelljs');
const path = require('path');
const fs = require('fs');
const suffixRegex = /\.(jsx|js)$/;

module.exports = function regenerateCustomIndex(customFolder) {
  // get all custom files
  const customPaths = ls([
    `${customFolder}/components/**`,
    `${customFolder}/action-type-constants/**`,
    `${customFolder}/action-creators/**`,
    `${customFolder}/reducers/**`,
  ]).filter(customPath => suffixRegex.test(customPath))
    .filter(customPath => /^\//.test(customPath))
    .map(customPath => customPath.replace(`${customFolder}/`, ''))
    .map(customPath => customPath.replace(suffixRegex, ''))
    .sort();

  // generate the index file based on those files
  const importsString = customPaths
    .map(customPath => `import ${_.camelCase(customPath)} from './${customPath}';`)
    .join('\n');

  const exportsString = customPaths
    .map(customPath => `  '${customPath}': ${_.camelCase(customPath)},`)
    .join('\n');

  const content = `\
${importsString}

export default {
${exportsString}
};
`;

  fs.writeFileSync(
    path.resolve(customFolder, 'index.js'),
    content
  );
};
