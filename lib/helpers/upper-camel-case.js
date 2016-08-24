const _ = require('lodash');

module.exports = function upperCamelCase(string) {
  return _.upperFirst(_.camelCase(string));
};
