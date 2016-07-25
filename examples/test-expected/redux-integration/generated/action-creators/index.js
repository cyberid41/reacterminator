import reduxExample from './redux-example/index';
import custom from '../../custom/index';
import helpers from '../helpers';

const baseActionCreators = {
  reduxExample
};

const additionalActionCreators = helpers.getAdditional({
  type: 'action-creators',
  path: '',
  baseFiles: [
    'reduxExample',
  ],
  custom,
});

const actionCreators  = Object.assign(baseActionCreators, additionalActionCreators);

const customize = custom['action-creators/index'] || ((x) => x)

export default customize(actionCreators, actionCreators);
