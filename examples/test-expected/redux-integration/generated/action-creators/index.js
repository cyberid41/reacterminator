import reduxExample from './redux-example/index';
import custom from '../../custom/index';
import store from '../store';

const actionCreators = {
  reduxExample
};

const customize = custom['action-creators/index'] || ((x) => x)

export default customize(actionCreators, { store });
