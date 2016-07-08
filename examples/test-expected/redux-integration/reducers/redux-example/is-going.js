/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function isGoing(state = false, action) {
  switch (action.type) {
    case actionTypeConstants.reduxExample.toggleIsGoing:
      return !state;
    default:
      return state;
  }
}
