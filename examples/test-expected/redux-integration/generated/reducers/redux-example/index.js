import isGoingError from './is-going-error';
import isGoing from './is-going';
import nameError from './name-error';
import name from './name';
import phoneNumberError from './phone-number-error';
import phoneNumber from './phone-number';
import { combineReducers } from 'redux';
import custom from '../../../custom/index';
import helpers from '../../helpers';

const baseReducers = {
  isGoingError,
  isGoing,
  nameError,
  name,
  phoneNumberError,
  phoneNumber
};

const additionalReducers = helpers.getAdditional({
  type: 'reducers',
  path: 'redux-example',
  baseFiles: [
    'isGoingError',
    'isGoing',
    'nameError',
    'name',
    'phoneNumberError',
    'phoneNumber',
  ],
  custom,
});

const reducers = Object.assign(baseReducers, additionalReducers);

const reducer = (_state, _action) => {
  switch (_action.type) {
    case 'REDUX_EXAMPLE_INITIALIZE':
      return _action.value;
    default:
      return combineReducers(reducers)(_state, _action);
  }
}

const customize = custom['reducers/redux-example/index'] || ((x) => x);

export default customize(reducer, reducers);
