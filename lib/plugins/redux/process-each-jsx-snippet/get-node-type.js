const _ = require('lodash');
const getAttr = require('../../../helpers/get-attr');

function getInputNodeType(node) {
  const inputType = getAttr({ node, name: 'type' }) || '';
  const inputTypeString = inputType ? `[type=${inputType}]` : '';

  return `input${inputTypeString}`;
}

function getAnchorNodeType(node) {
  const href = getAttr({ node, name: 'href' });

  if (href === '#') {
    return 'a';
  }
}

module.exports = function getNodeType(node) {
  const tagName = _.get(node, 'openingElement.name.name');

  switch (tagName) {
    case 'input':
      return getInputNodeType(node);
    case 'textarea':
    case 'button':
    case 'form':
    case 'select':
      return tagName;
    case 'a':
      return getAnchorNodeType(node);
    default:
      throw new Error('The tag name ${tagName} is not recognized.');
  }
};
