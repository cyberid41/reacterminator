/* eslint-env mocha */
const fs = require('fs')
const shell = require('shelljs')
const assert = require('chai').assert
const reacterminator = require('../../lib/index')

describe('redux-integration', function () {
  beforeEach(function () {
    shell.rm('-rf', './reacterminator')
  })

  it('should hook redux into component and generate redux files', function () {
    reacterminator(
      {
        type: 'path',
        content: './examples/test/redux-example.html'
      },
      {
        fileToComponent: true,
        generateFiles: true
      }
    )

    // Assert component content
    assert.deepEqual(
      fs.readFileSync('./reacterminator/components/ReduxExample.jsx', 'utf8'),
      `\
/* eslint-disable */
import React from 'react';
import ComponentA from './ComponentA';
import { connect as reduxConnect } from 'react-redux';
import action from '../action-creators/index';

class ReduxExample extends React.Component {
  render() {
    return (
      <div>
        <form id="email-form" name="email-form" onSubmit={this.props['action.reduxExample.submitEmailForm']}>
          <a href="#" id="anchor-button" onClick={this.props['action.reduxExample.clickAnchorButton']} /> <a href="http://www.google.com" id="anchor-button-absolute-url" />
          <input id="name"
            name="name"
            value={this.props['state.reduxExample.name']}
            onChange={this.props['action.reduxExample.changeName']} />
          <input id="is-going"
            type="checkbox"
            name="is-going"
            checked={this.props['state.reduxExample.isGoing']}
            onChange={this.props['action.reduxExample.toggleIsGoing']} />
          <input id="phone-number"
            type="text"
            name="phone-number-login"
            value={this.props['state.reduxExample.phoneNumber']}
            onChange={this.props['action.reduxExample.changePhoneNumber']} />
          <button id="single-button" onClick={this.props['action.reduxExample.clickSingleButton']} />
          <ComponentA />
        </form>
      </div>
      );
  }
}
;

const ReduxExampleWithRedux = reduxConnect(
  (state) => ({
    'state.reduxExample.name': state.reduxExample.name,
    'state.reduxExample.isGoing': state.reduxExample.isGoing,
    'state.reduxExample.phoneNumber': state.reduxExample.phoneNumber
  }),
  {
    'action.reduxExample.submitEmailForm': action.reduxExample.submitEmailForm,
    'action.reduxExample.clickAnchorButton': action.reduxExample.clickAnchorButton,
    'action.reduxExample.changeName': action.reduxExample.changeName,
    'action.reduxExample.toggleIsGoing': action.reduxExample.toggleIsGoing,
    'action.reduxExample.changePhoneNumber': action.reduxExample.changePhoneNumber,
    'action.reduxExample.clickSingleButton': action.reduxExample.clickSingleButton
  }
)(ReduxExample);

export default ReduxExampleWithRedux;
`
    )

    // assert component
    assert.deepEqual(
      fs.readFileSync('./reacterminator/components/ComponentA.jsx', 'utf8'),
      `\
/* eslint-disable */
import React from 'react';

class ComponentA extends React.Component {
  render() {
    return (
      <div />
      );
  }
}
;

export default ComponentA;
`
    )

    // assert store content
    assert.deepEqual(
      fs.readFileSync('./reacterminator/store.js', 'utf8'),
      `\
/* eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

export default createStore(reducers, applyMiddleware(thunk));
`
    )

    // assert action-type-constants content
    assert.deepEqual(
      fs.readFileSync('./reacterminator/action-type-constants/redux-example/change-name.js', 'utf8'),
      `\
/* eslint-disable */
import custom from '../../../custom/index';

const customize = custom['redux-example/change-name'] || ((x) => x);

const actionTypeConstant = 'REDUX_EXAMPLE_CHANGE_NAME';

export default customize(actionTypeConstant);
`
    )

    // assert action-type-constants redux-example index
    assert.deepEqual(
      fs.readFileSync('./reacterminator/action-type-constants/redux-example/index.js', 'utf8'),
      `\
/* eslint-disable */
import changeName from './change-name';
import changePhoneNumber from './change-phone-number';
import clickAnchorButton from './click-anchor-button';
import clickSingleButton from './click-single-button';
import submitEmailForm from './submit-email-form';
import toggleIsGoing from './toggle-is-going';
import custom from '../../../custom/index';
import helpers from '../../helpers/index';

const baseActionTypeConstants = {
  changeName,
  changePhoneNumber,
  clickAnchorButton,
  clickSingleButton,
  submitEmailForm,
  toggleIsGoing
};

const additionalActionTypeConstants = helpers.getAdditional({
  type: 'action-type-constants',
  path: 'redux-example',
  baseFiles: [
    'changeName',
    'changePhoneNumber',
    'clickAnchorButton',
    'clickSingleButton',
    'submitEmailForm',
    'toggleIsGoing',
  ],
  custom,
});

const actionTypeConstants  = Object.assign(baseActionTypeConstants, additionalActionTypeConstants);

const customize = custom['action-type-constants/redux-example/index'] || ((x) => x)

export default customize(actionTypeConstants, actionTypeConstants);
`
    )

    // assert action-type-constants index
    assert.deepEqual(
      fs.readFileSync('./reacterminator/action-type-constants/index.js', 'utf8'),
      `\
/* eslint-disable */
import reduxExample from './redux-example/index';

export default {
reduxExample
}
`
    )

    // assert action-creators content
    assert.deepEqual(
    fs.readFileSync('./reacterminator/action-creators/redux-example/change-name.js', 'utf8'),
    `\
/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function changeName(event) {
  event.preventDefault();

  return {
    type: actionTypeConstants.reduxExample.changeName,
    value: event.target.value
  };
}
`
    )

    assert.deepEqual(
    fs.readFileSync('./reacterminator/action-creators/redux-example/toggle-is-going.js', 'utf8'),
    `\
/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function toggleIsGoing(event) {
  return {
    type: actionTypeConstants.reduxExample.toggleIsGoing,
    value: event.target.value
  };
}
`
    )

    // assert reducers content
    assert.deepEqual(
      fs.readFileSync('./reacterminator/reducers/redux-example/name.js', 'utf8'),
      `\
/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function name(state = '', action) {
  switch (action.type) {
    case actionTypeConstants.reduxExample.changeName:
      return action.value;
    default:
      return state;
  }
}
`
    )

    assert.deepEqual(
      fs.readFileSync('./reacterminator/reducers/redux-example/is-going.js', 'utf8'),
      `\
/* eslint-disable */
import actionTypeConstants from '../../action-type-constants/index';

export default function isGoing(state = false, action) {
  switch (action.type) {
    case actionTypeConstants.reduxExample.toggleIsGoing:
      return !state;
    default:
      return state;
  }
}
`
    )

    // assert reducers redux-example index
    assert.deepEqual(
      fs.readFileSync('./reacterminator/reducers/redux-example/index.js', 'utf8'),
      `\
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
`
    )

    // assert reducers index
    assert.deepEqual(
      fs.readFileSync('./reacterminator/reducers/index.js', 'utf8'),
      `\
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
`
    )
  })

  it('should not create reducer file for a path if there is no reducers to combile', function () {
    reacterminator(
      {
        type: 'path',
        content: './examples/test/redux-no-reducers.html'
      },
      {
        fileToComponent: true,
        generateFiles: true
      }
    )

    assert.deepEqual(
      fs.readFileSync('./reacterminator/reducers/redux-no-reducers/index.js', 'utf8'),
      `\
/* eslint-disable */
export default (state = {}) => (state);
`
    )
  })
})
