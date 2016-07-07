const _ = require('lodash');

module.exports = function createActionIndexContent(
  { type, pathName, importsString, constantsString }
) {
  let path = pathName;
  let customPath = '../../../custom/index';
  let helpersPath = '../../helpers/index';
  let customOverrideMapping = `${type}/${_.kebabCase(path)}/index`;

  if (pathName === type) {
    path = '';
    customPath = '../../custom/index';
    helpersPath = '../helpers/index';
    customOverrideMapping = `${type}/index`;
  }

  const strippedConstantsString = constantsString.replace(/\s/g, '').split(',');
  const baseFilesString = _.map(strippedConstantsString, string => `    '${string}',`).join('\n');

  const baseConstName = `base${_.upperFirst(_.camelCase(type))}`;
  const additionalConstName = `additional${_.upperFirst(_.camelCase(type))}`;

  return `\
${importsString}
import custom from '${customPath}';
import helpers from '${helpersPath}';

const ${baseConstName} = {
  ${constantsString}
};

const ${additionalConstName} = helpers.getAdditional({
  type: '${type}',
  path: '${path}',
  baseFiles: [
${baseFilesString}
  ],
  custom,
});

const ${_.camelCase(type)}  = Object.assign(${baseConstName}, ${additionalConstName});

const customize = custom['${customOverrideMapping}'] || ((x) => x)

export default customize(${_.camelCase(type)}, ${_.camelCase(type)});
`;
};
