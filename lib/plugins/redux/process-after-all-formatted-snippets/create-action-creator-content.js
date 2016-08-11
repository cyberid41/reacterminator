const _ = require('lodash');

module.exports = function createActionCreatorContent(
  { actionType, actionName, fromPath }
) {
  const customOverrideMapping = `${_.kebabCase(fromPath)}/${_.kebabCase(actionName)}`;
  const preventDefaultString = (actionType === 'toggle' || actionType === 'check')
    ? ''
    : '  event.preventDefault();\n';

  switch (actionType) {
    case 'change':
    case 'click':
    case 'select':
    case 'submit':
    case 'toggle':
    case 'check':
      return `\
import custom from '../../../custom/index';
import actionTypeConstants from '../../action-type-constants/index';
import store from '../../store';

const actionCreator = function ${actionName}(event) {
${preventDefaultString}
  return {
    type: actionTypeConstants.${_.camelCase(fromPath)}.${actionName},
    value: event.target.value,
  };
};

const customize = custom['action-creators/${customOverrideMapping}'] || ((x) => x);

export default customize(actionCreator, { actionTypeConstants, store });
`;
    default:
      throw new Error(`This action type is not recognized: ${actionType}`);
  }
};
