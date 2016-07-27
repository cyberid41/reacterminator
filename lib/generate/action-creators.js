const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

module.exports = function actionCreators() {
  return `\
export default (base, { actionTypeConstants, store }) => (
  (event) => {
    const {  } = store.get();

    return {
      type: actionTypeConstants.unicorn.submitSignupForm,
      value: event.target.value,
    };
  }
);
`;
};
