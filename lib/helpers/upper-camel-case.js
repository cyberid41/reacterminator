var _ = require('lodash');

module.exports = function upperCamelCase(string) {
  if (!string) {
    return '';
  }

  var camelCase = _.camelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
