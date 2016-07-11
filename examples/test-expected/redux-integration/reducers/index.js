/* eslint-disable */
import reduxExample from './redux-example/index';
import { combineReducers } from 'redux';
import custom from '../../custom/index';
import helpers from '../helpers/index';

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'REDUCERS_INITIALIZE':
      return action.value;
    default:
      return combineReducers(reducers)(state, action);
  }
}

const customize = custom['reducers/index'] || ((x) => x);

export default customize(reducer, reducers);
