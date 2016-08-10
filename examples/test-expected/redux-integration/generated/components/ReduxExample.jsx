import React from 'react';
import ComponentA from './ComponentA';
import { connect as reduxConnect } from 'react-redux';
import action from '../action-creators/index';
import custom from '../../custom/index';

class ReduxExample extends React.Component {
  render() {
    return (
      <div>
        <form id='email-form' name='email-form' onSubmit={this.props['action.reduxExample.submitEmailForm']}>
          <a href='#' id='anchor-button' onClick={this.props['action.reduxExample.clickAnchorButton']} /> <a href='http://www.google.com' id='anchor-button-absolute-url' />
          <input id='name'
            name='name'
            onChange={this.props['action.reduxExample.changeName']}
            value={this.props['state.reduxExample.name']} />
          <input id='is-going'
            type='checkbox'
            name='is-going'
            onChange={this.props['action.reduxExample.toggleIsGoing']}
            checked={this.props['state.reduxExample.isGoing']} />
          <input id='phone-number'
            type='text'
            name='phone-number-login'
            onChange={this.props['action.reduxExample.changePhoneNumber']}
            value={this.props['state.reduxExample.phoneNumber']} />
          <div className='error-explanation'>
            {this.props['state.reduxExample.phoneNumberError']}
          </div>
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
    'state.reduxExample.phoneNumber': state.reduxExample.phoneNumber,
    'state.reduxExample.phoneNumberError': state.reduxExample.phoneNumberError,
  }),
  {
    'action.reduxExample.submitEmailForm': action.reduxExample.submitEmailForm,
    'action.reduxExample.clickAnchorButton': action.reduxExample.clickAnchorButton,
    'action.reduxExample.changeName': action.reduxExample.changeName,
    'action.reduxExample.toggleIsGoing': action.reduxExample.toggleIsGoing,
    'action.reduxExample.changePhoneNumber': action.reduxExample.changePhoneNumber,
    'action.reduxExample.changePhoneNumberError': action.reduxExample.changePhoneNumberError,
    'action.reduxExample.clickSingleButton': action.reduxExample.clickSingleButton,
  }
)(ReduxExample);

const customize = custom['components/ReduxExample'] || ((x) => x);
const ReduxExampleWithReduxWithCustom = customize(ReduxExampleWithRedux, {
  React,
  ComponentA,
  reduxConnect,
  action
});

export default ReduxExampleWithReduxWithCustom;
