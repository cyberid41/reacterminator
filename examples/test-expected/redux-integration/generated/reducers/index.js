import reduxExample from './redux-example/index';
import { reducer as paramStore } from 'param-store';
import { combineReducers } from 'redux';
import custom from '../../custom/index';

const reducers = {
  reduxExample,
  paramStore,
};

const combinedReducer = combineReducers(reducers);

const customize = custom['reducers/index'] || ((x) => x);

export default customize(combinedReducer, reducers);
