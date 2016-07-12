const _ = require('lodash');
const harvest = require('./harvest');

module.exports = function transplant(donee, doner, organ) {
  _.set(donee, organ, harvest(doner, organ));
};
