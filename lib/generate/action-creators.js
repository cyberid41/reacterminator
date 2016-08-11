const _ = require('lodash');

module.exports = function actionCreators({ route, name }) {
  return `\
export default (base, { actionTypeConstants, store }) => (
  (event) => {
    const formValues = store.getState().${_.camelCase(route)};

    return {
      type: actionTypeConstants.${_.camelCase(route)}.${_.camelCase(name)},
      value: event.target.value,
    };
  }
);
`;
};
