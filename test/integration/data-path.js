/* eslint-env mocha */
const assert = require('chai').assert
const reacterminator = require('../../lib/index')

describe('data-path', function () {
  it('should create App component', function () {
    const content = `\
<div data-component-name="Login" data-component-path="login">
</div>`

    const LoginExpected = `\
import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

export default Login;
`

    const AppExpected = `\
import React from 'react';
import Login from './Login';
import { Stack } from 'react-super-components';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stack indexKey="path" activeLayerIndex={this.props.path}>
          <Login index="login" />
        </Stack>
      </Provider>
      );
  }
}
;

export default App;
`

    const components = reacterminator({type: 'string', content: content})

    const LoginActual = components.Login.formattedFileSnippet
    assert.deepEqual(LoginActual, LoginExpected)

    const AppActual = components.App.formattedFileSnippet
    assert.deepEqual(AppActual, AppExpected)
  })

  it('should create Index component with \'\' as path', function () {
    const content = `\
<div data-component-name="Index" data-component-path="index">
</div>`

    const AppExpected = `\
import React from 'react';
import Index from './Index';
import { Stack } from 'react-super-components';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stack indexKey="path" activeLayerIndex={this.props.path}>
          <Index index="" />
        </Stack>
      </Provider>
      );
  }
}
;

export default App;
`

    const components = reacterminator({type: 'string', content})

    const AppActual = components.App.formattedFileSnippet
    assert.deepEqual(AppActual, AppExpected)
  })
})
