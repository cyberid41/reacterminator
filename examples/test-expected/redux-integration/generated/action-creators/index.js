import reduxExample from './redux-example/index';
import custom from '../../custom/index';
import store from '../store';
import actionTypeConstants from '../action-type-constants/index';

const actionCreators = {
  reduxExample
};

const customize = custom['action-creators/index'] || ((x) => x)

export default customize(actionCreators, { actionTypeConstants, store });
