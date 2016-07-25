import React from 'react';
import ReduxExample from './ReduxExample';
import custom from '../../custom/index';
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

const customize = custom['components/App'] || ((x) => x);
const AppWithReduxWithCustom = customize(AppWithRedux);

export default AppWithReduxWithCustom;
