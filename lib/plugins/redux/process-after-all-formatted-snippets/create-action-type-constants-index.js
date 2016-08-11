module.exports = function createActionTypeConstantsIndex(
  { type, pathName, importsString, constantsString }
) {
  const isRoot = pathName === type;

  const relativePath = isRoot ? '' : '../';
  const customPath = `${relativePath}../../custom/index`;

  const customKeyRelativePath = isRoot ? '' : `/${pathName}`;
  const customKeyName = `${type}${customKeyRelativePath}/index`;

  return `\
${importsString}
import custom from '${customPath}';

const actionTypeConstants = {
  ${constantsString}
};

const customize = custom['${customKeyName}'] || ((x) => x)

export default customize(actionTypeConstants);
`;
};
