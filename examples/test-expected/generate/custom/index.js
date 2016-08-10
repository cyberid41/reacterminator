import actionCreatorsUnicornSubmitSignupForm from './action-creators/unicorn/submit-signup-form';
import actionTypeConstantsUnicornChangeEmail from './action-type-constants/unicorn/change-email';
import actionTypeConstantsUnicornSubmitSignupForm from './action-type-constants/unicorn/submit-signup-form';
import componentsUnicorn from './components/Unicorn';
import reducersUnicornName from './reducers/unicorn/name';

export default {
  'action-creators/unicorn/submit-signup-form': actionCreatorsUnicornSubmitSignupForm,
  'action-type-constants/unicorn/change-email': actionTypeConstantsUnicornChangeEmail,
  'action-type-constants/unicorn/submit-signup-form': actionTypeConstantsUnicornSubmitSignupForm,
  'components/Unicorn': componentsUnicorn,
  'reducers/unicorn/name': reducersUnicornName,
};
