/* eslint-disable */
import changeName from './change-name';
import changePhoneNumber from './change-phone-number';
import clickAnchorButton from './click-anchor-button';
import clickSingleButton from './click-single-button';
import submitEmailForm from './submit-email-form';
import toggleIsGoing from './toggle-is-going';
import custom from '../../../custom/index';
import helpers from '../../helpers';

const baseActionCreators = {
  changeName,
  changePhoneNumber,
  clickAnchorButton,
  clickSingleButton,
  submitEmailForm,
  toggleIsGoing
};

const additionalActionCreators = helpers.getAdditional({
  type: 'action-creators',
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

const actionCreators  = Object.assign(baseActionCreators, additionalActionCreators);

const customize = custom['action-creators/redux-example/index'] || ((x) => x)

export default customize(actionCreators, actionCreators);
