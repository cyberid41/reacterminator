import custom from '../../../custom/index';

const customize = custom['redux-example/change-name'] || ((x) => x);

const actionTypeConstant = 'REDUX_EXAMPLE_CHANGE_NAME';

export default customize(actionTypeConstant);
