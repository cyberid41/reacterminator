const constCase = require('../../../helpers/const-case');
const _ = require('lodash');

module.exports = function createActionTypeConstantContent({ fromPath, actionName }) {
  const customIndex = `${_.kebabCase(fromPath)}/${_.kebabCase(actionName)}`;

  return `\
import custom from '../../../custom/index';

const customize = custom['${customIndex}'] || ((x) => x);

const actionTypeConstant = '${constCase(fromPath, actionName)}';

export default customize(actionTypeConstant);
`;
};
