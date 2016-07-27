import componentsUnicorn from './components/Unicorn';
import actionTypeConstantsUnicornChangeEmail from './action-type-constants/unicorn-change-email';
import actionTypeConstantsUnicornSumitSignupForm from './action-type-constants/unicorn/sumit-signup-form';
import actionCreatorsUnicornSumitSignupForm from './action-creators/unicorn/sumit-signup-form';
import reducersUnicornName from './reducers/unicorn/name';

export default {
  'components/Unicorn': componentsUnicorn,
  'action-type-constants/unicorn-change-email': actionTypeConstantsUnicornChangeEmail,
  'action-type-constants/unicorn/sumit-signup-form': actionTypeConstantsUnicornSumitSignupForm,
  'action-creators/unicorn/sumit-signup-form': actionCreatorsUnicornSumitSignupForm,
  'reducers/unicorn/name': reducersUnicornName,
};
