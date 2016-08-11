import reduxExample from './redux-example/index';
import custom from '../../custom/index';

const actionTypeConstants = {
  reduxExample
};

const customize = custom['action-type-constants/index'] || ((x) => x)

export default customize(actionTypeConstants);
