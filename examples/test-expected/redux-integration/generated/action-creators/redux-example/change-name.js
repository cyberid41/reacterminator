import custom from '../../../custom/index';
import actionTypeConstants from '../../action-type-constants/index';

const actionCreator = function changeName(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.reduxExample.changeName,
    value: event.target.value,
  };
};

const customize = custom['action-creators/redux-example/change-name'] || ((x) => x);

export default customize(actionCreator, { actionTypeConstants });
