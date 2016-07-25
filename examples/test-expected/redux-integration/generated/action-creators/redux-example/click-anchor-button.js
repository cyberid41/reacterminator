import actionTypeConstants from '../../action-type-constants/index';

export default function clickAnchorButton(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.reduxExample.clickAnchorButton,
    value: event.target.value
  };
}
