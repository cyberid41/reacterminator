const _ = require('lodash');

module.exports = function getAttr({ node, name, isDelete }) {
  const attributes = _.get(node, 'openingElement.attributes');

  const index = _.findIndex(
    attributes,
    (attribute) => _.get(attribute, 'name.name') === name
  );

  if (index === -1) {
    return;
  }

  const value = attributes[index].value.value;

  if (isDelete) {
    delete attributes[index];
  }

  return value;
};
