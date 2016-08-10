const getAttr = require('../../../helpers/get-attr');
const formatPath = require('./format-path');
const propByKey = require('./prop-by-key');
const parse = require('../../../helpers/parse');
const transplant = require('../../../helpers/transplant');

module.exports = function processErrorExplanation({ component, node }) {
  const reduxValue = getAttr({
    node,
    name: 'data-component-redux-error-explanation',
    isDelete: true,
  });

  if (!reduxValue) {
    return {};
  }

  const nodeState = formatPath('state', component.componentName, reduxValue);
  const nodeAction = formatPath(
    'action',
    component.componentName,
    ['change', reduxValue]
  );

  transplant(node, parse(`<div>${propByKey(nodeState)}</div>`), 'children');

  return { nodeState, nodeAction };
};
