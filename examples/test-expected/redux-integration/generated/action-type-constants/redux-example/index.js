import changeName from './change-name';
import changePhoneNumber from './change-phone-number';
import clickAnchorButton from './click-anchor-button';
import clickSingleButton from './click-single-button';
import submitEmailForm from './submit-email-form';
import toggleIsGoing from './toggle-is-going';
import custom from '../../../custom/index';
import helpers from '../../helpers';

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
