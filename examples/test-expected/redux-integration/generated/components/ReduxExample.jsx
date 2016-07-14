/* eslint-disable */
import React from 'react';
import ComponentA from './ComponentA';
import { connect as reduxConnect } from 'react-redux';
import action from '../action-creators/index';

class ReduxExample extends React.Component {
  render() {
    return (
      <div>
        <form id='email-form' name='email-form' onSubmit={this.props['action.reduxExample.submitEmailForm']}>
          <a href='#' id='anchor-button' onClick={this.props['action.reduxExample.clickAnchorButton']} /> <a href='http://www.google.com' id='anchor-button-absolute-url' />
          <input id='name'
            name='name'
            value={this.props['state.reduxExample.name']}
            onChange={this.props['action.reduxExample.changeName']} />
          <input id='is-going'
            type='checkbox'
            name='is-going'
            checked={this.props['state.reduxExample.isGoing']}
            onChange={this.props['action.reduxExample.toggleIsGoing']} />
          <input id='phone-number'
            type='text'
            name='phone-number-login'
            value={this.props['state.reduxExample.phoneNumber']}
            onChange={this.props['action.reduxExample.changePhoneNumber']} />
          <button id='single-button' onClick={this.props['action.reduxExample.clickSingleButton']} />
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
