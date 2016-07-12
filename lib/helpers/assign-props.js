const _ = require('lodash');
const parse = require('./parse');
const harvest = require('./harvest');

function objectToString(obj) {
  if (!_.isObject(obj)) {
    throw new Error(`${obj} should be an object.`);
  }

  return _.map(obj, (value, key) => `${key}=${value}`).join(' ');
}

module.exports = function assignProps({ node, props }) {
  const propsString = _.isString(props) ? props : objectToString(props);

  const divWithPropsAst = parse(`<div ${propsString}/>`);

  const propsAst = harvest(divWithPropsAst, 'openingElement.attributes');

  // TODO: instead of concat, we should deduplicate and use the new props
  node.openingElement.attributes = node.openingElement.attributes.concat(propsAst);
};
