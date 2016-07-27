import reduxExample from './redux-example/index';
import { combineReducers } from 'redux';
import custom from '../../custom/index';
import helpers from '../helpers';

const baseReducers = {
  reduxExample
};

const additionalReducers = helpers.getAdditional({
  type: 'reducers',
  path: '',
  baseFiles: [
    'reduxExample',
  ],
  custom,
});

const reducers = Object.assign(baseReducers, additionalReducers);

const reducer = (_state, _action) => {
  switch (_action.type) {
    case 'REDUCERS_INITIALIZE':
      return _action.value;
    default:
      return combineReducers(reducers)(_state, _action);
  }
}

const customize = custom['reducers/index'] || ((x) => x);

export default customize(reducer, reducers);
