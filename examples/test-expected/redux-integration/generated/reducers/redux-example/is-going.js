import custom from '../../../custom/index';
import actionTypeConstants from '../../action-type-constants/index';

const reducer = (state = false, action) => {
  switch (action.type) {
    case actionTypeConstants.reduxExample.toggleIsGoing:
      return !state;
    default:
      return state;
  }
}

const customize = custom['reducers/redux-example/is-going'] || ((x) => x);

export default customize(reducer, { actionTypeConstants });
