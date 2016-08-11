import isGoingError from './is-going-error';
import isGoing from './is-going';
import nameError from './name-error';
import name from './name';
import phoneNumberError from './phone-number-error';
import phoneNumber from './phone-number';
import { combineReducers } from 'redux';
import custom from '../../../custom/index';
import actionTypeConstants from '../../action-type-constants/index';

const reducers = {
  isGoingError,
  isGoing,
  nameError,
  name,
  phoneNumberError,
  phoneNumber
};

const combinedReducer = combineReducers(reducers);

const customize = custom['reducers/redux-example/index'] || ((x) => x);

export default customize(combinedReducer, { actionTypeConstants, reducers });
