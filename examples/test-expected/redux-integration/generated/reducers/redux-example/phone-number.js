import actionTypeConstants from '../../action-type-constants/index';

export default function phoneNumber(state = '', action) {
  switch (action.type) {
    case actionTypeConstants.reduxExample.changePhoneNumber:
      return action.value;
    default:
      return state;
  }
}
