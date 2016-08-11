module.exports = function createReducersIndexContent(
  { type, pathName, importsString, constantsString }
) {
  const isRoot = pathName === type;

  const relativePath = isRoot ? '' : '../';
  const customPath = `${relativePath}../../custom/index`;

  const customKeyRelativePath = isRoot ? '' : `/${pathName}`;
  const customKeyName = `${type}${customKeyRelativePath}/index`;

  return `\
${importsString}
import { combineReducers } from 'redux';
import custom from '${customPath}';

const reducers = {
  ${constantsString}
};

const combinedReducer = combineReducers(reducers);

const customize = custom['${customKeyName}'] || ((x) => x);

export default customize(combinedReducer, reducers);
`;
};
