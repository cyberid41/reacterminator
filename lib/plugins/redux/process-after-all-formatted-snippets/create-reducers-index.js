module.exports = function createReducersIndex(
  { type, pathName, importsString, constantsString }
) {
  const isRoot = pathName === type;


  const paramStoreReducerImport = isRoot
    ? '\nimport { reducer as paramStore } from \'param-store\';'
    : '';
  const paramStoreReducerConstant = isRoot
    ? ',\n  paramStore,'
    : '';

  const relativePath = isRoot ? '' : '../';
  const customPath = `${relativePath}../../custom/index`;
  const actionTypeConstantsPath = `${relativePath}../action-type-constants/index`;

  const customKeyRelativePath = isRoot ? '' : `/${pathName}`;
  const customKeyName = `${type}${customKeyRelativePath}/index`;

  return `\
${importsString}${paramStoreReducerImport}
import { combineReducers } from 'redux';
import custom from '${customPath}';
import actionTypeConstants from '${actionTypeConstantsPath}';

const reducers = {
  ${constantsString}${paramStoreReducerConstant}
};

const combinedReducer = combineReducers(reducers);

const customize = custom['${customKeyName}'] || ((x) => x);

export default customize(combinedReducer, { actionTypeConstants, reducers });
`;
};
