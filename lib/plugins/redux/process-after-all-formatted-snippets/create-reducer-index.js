const _ = require('lodash');

module.exports = function createReducersIndexContent(
  { type, pathName, importsString, constantsString }
) {
  const isRoot = pathName === type;

  const path = isRoot ? '' : pathName;
  const extraUp = isRoot ? '' : '../';
  const customPath = `${extraUp}../../custom/index`;
  const helpersPath = `${extraUp}../helpers`;
  const customOverrideMapping = `${type}${isRoot ? '' : '/'}${_.kebabCase(path)}/index`;
  const actionTypeConstant = `${_.toUpper(_.snakeCase(pathName))}_INITIALIZE`;

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
