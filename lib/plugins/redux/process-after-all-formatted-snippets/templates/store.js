import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { emitToRedux } from 'param-store';
import reducers from './reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));

emitToRedux(store);

export default store;
