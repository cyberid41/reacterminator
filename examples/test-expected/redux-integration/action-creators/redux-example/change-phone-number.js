/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function changePhoneNumber(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.reduxExample.changePhoneNumber,
    value: event.target.value
  };
}
