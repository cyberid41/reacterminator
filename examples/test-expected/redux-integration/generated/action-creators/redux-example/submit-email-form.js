import actionTypeConstants from '../../action-type-constants/index';

export default function submitEmailForm(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.reduxExample.submitEmailForm,
    value: event.target.value
  };
}
