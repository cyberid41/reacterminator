const constCase = require('../helpers/const-case');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

module.exports = function actionTypeConstants({ name, route }) {
  return `\
export default () => '${constCase(route, name)}';
`;
};
