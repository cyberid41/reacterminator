import custom from '../../../custom/index';
import actionTypeConstants from '../../action-type-constants/index';

const reducer = (_state = false, _action) => {
  switch (_action.type) {
    case actionTypeConstants.reduxExample.toggleIsGoing:
      return !_state;
    default:
      return _state;
  }
}

const customize = custom['reducers/redux-example/is-going'] || ((x) => x);

export default customize(reducer, { actionTypeConstants });
