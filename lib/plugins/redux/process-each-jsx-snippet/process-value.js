const getAttr = require('../../../helpers/get-attr');
const formatPath = require('./format-path');
const propByKey = require('./prop-by-key');
const parse = require('../../../helpers/parse');
const transplant = require('../../../helpers/transplant');

module.exports = function processValue({ component, node }) {
  const reduxValue = getAttr({
    node,
    name: 'data-component-redux-value',
    isDelete: true,
  });

  if (!reduxValue) {
    return {};
  }

  const nodeState = formatPath('state', component.componentName, reduxValue);

  transplant(node, parse(`<div>${propByKey(nodeState)}</div>`), 'children');

  return { nodeState };
};
