const _ = require('lodash');

module.exports = function formatPath(...keys) {
  return _(keys)
    .map((key) => {
      const keyString = _.isArray(key) ? key.join('-') : key;
      return _.camelCase(keyString);
    })
    .join('.');
};
