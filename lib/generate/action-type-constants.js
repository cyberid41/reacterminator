const constCase = require('../helpers/const-case');

module.exports = function actionTypeConstants({ route, name }) {
  return `\
export default () => '${constCase(route, name)}';
`;
};
