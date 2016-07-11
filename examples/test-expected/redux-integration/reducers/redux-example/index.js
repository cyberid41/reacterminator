/* eslint-disable */
import { combineReducers } from 'redux';
import isGoing from './is-going';
import name from './name';
import phoneNumber from './phone-number';
import custom from '../../../custom/index';
import helpers from '../../helpers/index';

const baseReducers = {
  isGoing,
  name,
  phoneNumber,
};

const additionalReducers = helpers.getAdditional({
  type: 'reducers',
  path: 'example-reduces',
  baseFiles: [
    'isGoing',
    'name',
    'phoneNumber',
  ],
  custom,
});

const reducers = Object.assign(baseReducers, additionalReducers);

const reducer = (state, action) => {
  switch (action.type) {
    case 'REDUX_EXAMPLE_INITIALIZE':
      return action.value;
    default:
      return combineReducers(reducers)(state, action);
  }
}

const customize = custom['reducers/redux-example/index'] || ((x) => x);

export default customize(reducer, reducers)
