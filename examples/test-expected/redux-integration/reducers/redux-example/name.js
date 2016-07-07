/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function name(state = '', action) {
  switch (action.type) {
    case actionTypeConstants.reduxExample.changeName:
      return action.value;
    default:
      return state;
  }
}
