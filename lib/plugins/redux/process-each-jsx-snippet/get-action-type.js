const _ = require('lodash');
const getAttr = require('../../../helpers/get-attr');

function getActionTypeOfInput(node) {
  const inputType = getAttr({ node, name: 'type' });

  switch (inputType) {
    case 'button':
    case 'submit':
      return 'click';

    case 'radio':
      return 'check';

    case 'checkbox':
      return 'toggle';

    default:
      return 'change';
  }
}

function getActionTypeOfAnchor(node) {
  const href = getAttr({ node, name: 'href' });
  return href === '#' && 'click';
}

module.exports = function getActionType(node) {
  const tagName = _.get(node, 'openingElement.name.name');

  switch (tagName) {
    case 'input':
      return getActionTypeOfInput(node);
    case 'textarea':
      return 'change';

    case 'button':
      return 'click';

    case 'select':
      return 'select';

    case 'form':
      return 'submit';

    case 'a':
      return getActionTypeOfAnchor(node);

    default:
      return null;
  }
};
