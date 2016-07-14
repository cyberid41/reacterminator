/* eslint-disable */
import reduxExample from './redux-example/index';
import custom from '../../custom/index';
import helpers from '../helpers/index';

const baseActionTypeConstants = {
  reduxExample
};

const additionalActionTypeConstants = helpers.getAdditional({
  type: 'action-type-constants',
  path: '',
  baseFiles: [
    'reduxExample',
  ],
  custom,
});

const actionTypeConstants  = Object.assign(baseActionTypeConstants, additionalActionTypeConstants);

const customize = custom['action-type-constants/index'] || ((x) => x)

export default customize(actionTypeConstants, actionTypeConstants);
