/* eslint-disable */
import { combineReducers } from 'redux';
import isGoing from './is-going';
import name from './name';
import phoneNumber from './phone-number';

export default (state = {}, action) => {
  switch (action.type) {
    case 'REDUX_EXAMPLE_INITIALIZE':
      return action.value;
    default:
      return combineReducers({
isGoing,
name,
phoneNumber
      })(state, action);
  }
}
