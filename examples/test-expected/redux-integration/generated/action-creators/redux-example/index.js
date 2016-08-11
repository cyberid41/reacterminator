import changeIsGoingError from './change-is-going-error';
import changeNameError from './change-name-error';
import changeName from './change-name';
import changePhoneNumberError from './change-phone-number-error';
import changePhoneNumber from './change-phone-number';
import clickAnchorButton from './click-anchor-button';
import clickSingleButton from './click-single-button';
import submitEmailForm from './submit-email-form';
import toggleIsGoing from './toggle-is-going';
import custom from '../../../custom/index';
import store from '../../store';
import actionTypeConstants from '../../action-type-constants/index';

const actionCreators = {
  changeIsGoingError,
  changeNameError,
  changeName,
  changePhoneNumberError,
  changePhoneNumber,
  clickAnchorButton,
  clickSingleButton,
  submitEmailForm,
  toggleIsGoing
};

const customize = custom['action-creators/redux-example/index'] || ((x) => x)

export default customize(actionCreators, { actionTypeConstants, store });
