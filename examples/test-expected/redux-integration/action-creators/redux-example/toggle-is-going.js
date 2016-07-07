/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function toggleIsGoing(event) {
  return {
    type: actionTypeConstants.reduxExample.toggleIsGoing,
    value: event.target.value
  };
}
