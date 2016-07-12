const _ = require('lodash');
const getAttr = require('../../../helpers/get-attr');

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
  }
};

function getInputNodeType(node) {
  const inputType = getAttr({ node, name: 'type' }) || '';

  return 'input' + (inputType ? `[type=${inputType}]` : '');
}

function getAnchorNodeType(node) {
  const href = getAttr({ node, name: 'href' });

  if (href === '#') {
    return 'a';
  }
}
