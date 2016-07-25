import React from 'react';
import KitchenSink from './KitchenSink';
import custom from '../../custom/index';
import { Stack } from 'react-super-components';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stack indexKey='path' activeLayerIndex={this.props.path}>
          <KitchenSink index='kitchen-sink' />
        </Stack>
      </Provider>
      );
  }
}
;

const customize = custom['components/App'] || ((x) => x);
const AppWithCustom = customize(App);

export default AppWithCustom;
