/* eslint-disable */
import custom from '../../../custom/index';
import actionTypeConstants from '../../action-type-constants/index';

const actionCreator = function toggleIsGoing(event) {

  return {
    type: actionTypeConstants.reduxExample.toggleIsGoing,
    value: event.target.value,
  };
};

const customize = custom['action-creators/redux-example/toggle-is-going'] || ((x) => x);

export default customize(actionCreator, { actionTypeConstants });
