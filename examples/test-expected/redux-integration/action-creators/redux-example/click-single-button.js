/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function clickSingleButton(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.reduxExample.clickSingleButton,
    value: event.target.value
  };
}
