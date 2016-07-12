const traverse = require('babel-traverse').default;
const getNodeType = require('./get-node-type');
const processJsxByType = require('./process-jsx-by-type');
const getAttr = require('../../../helpers/get-attr');

module.exports = function processEachJsxSnippet({ component, components, options }) {
  // TODO: process non-path component in the future
  if (!component.pathName) {
    return { component, components, options };
  }

  const state = [];
  const action = [];
  const { ast } = component;

  traverse(ast, {
    JSXElement({ node }) {
      const id = getAttr({ node, name: 'id' });
      if (!id) {
        return;
      }

      const type = getNodeType(node);
      if (!type) {
        return;
      }

      const { nodeState, nodeAction } = processJsxByType({ component, node, type, id });
      nodeState && state.push(nodeState);
      nodeAction && action.push(nodeAction);
    },
  });

  component.plugins.redux = { state, action };

  return { component, components, options };
};
