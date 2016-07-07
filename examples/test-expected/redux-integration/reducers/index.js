/* eslint-disable */
import { combineReducers } from 'redux';
import reduxExample from './redux-example/index';

export default (state = {}, action) => {
  switch (action.type) {
    case 'REDUCERS_INITIALIZE':
      return action.value;
    default:
      return combineReducers({
reduxExample
      })(state, action);
  }
}
