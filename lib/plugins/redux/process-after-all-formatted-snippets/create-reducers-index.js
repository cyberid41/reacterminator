const _ = require('lodash');

module.exports = function createReducersIndexContent(
  { type, pathName, importsString, constantsString }
) {
  let path = pathName;
  let customPath = '../../../custom/index';
  let helpersPath = '../../helpers/index';
  let customOverrideMapping = `${type}/${_.kebabCase(path)}/index`;

  const actionTypeConstant = `${_.toUpper(path)}_INITIALIZE`;

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
import { combineReducers } from 'redux';
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

const reducers = Object.assign(baseReducers, additionalReducers);

const reducer = (state, action) => {
  switch (action.type) {
    case '${actionTypeConstant}':
      return action.value;
    default:
      return combineReducers(reducers)(state, action);
  }
}

const customize = custom['${customOverrideMapping}'] || ((x) => x);

export default customize(reducer, reducers);
`;
};
