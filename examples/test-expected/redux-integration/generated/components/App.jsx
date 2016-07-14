/* eslint-disable */
import React from 'react';
import ReduxExample from './ReduxExample';
import { Stack } from 'react-super-components';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stack indexKey='path' activeLayerIndex={this.props.path}>
          <ReduxExample index='redux-example' />
        </Stack>
      </Provider>
      );
  }
}
;

export default App;
