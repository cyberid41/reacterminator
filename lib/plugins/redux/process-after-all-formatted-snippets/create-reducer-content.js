const _ = require('lodash')

module.exports = function createReducerContent (
  {actionId, actionType, actionName, fromPath}
) {
  const customOverrideMapping = `${_.kebabCase(fromPath)}/${_.kebabCase(actionId)}`;
  const stateParam = actionType === 'toggle' ? false : '\'\'';

  switch (actionType) {
    case 'change':
    case 'select':
    case 'check':
    case 'toggle':
      return `\
import custom from '../../../custom/index';
import actionTypeConstants from '../../action-type-constants/index';

const reducer = ${actionId}(state = ${stateParam}, action) => {
  switch (action.type) {
    case actionTypeConstants.${_.camelCase(fromPath)}.${actionName}:
      return action.value;
    default:
      return state;
  }
}

const customize = custom['reducers/${customOverrideMapping}'] || ((x) => x);

export default customize(reducer, { actionTypeConstants });
`
    case 'click':
    case 'submit':
      return null

    default:
      throw new Error(`This action type is not recognized: ${actionType}`)
  }
}
