const constCase = require('../helpers/const-case');

module.exports = function actionTypeConstants({ name, route }) {
  return `\
export default () => '${constCase(route, name)}';
`;
};
