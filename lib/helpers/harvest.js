const _ = require('lodash');

module.exports = function harvest(doner, organ) {
  return _.get(doner.program.body[0].expression, organ);
};
