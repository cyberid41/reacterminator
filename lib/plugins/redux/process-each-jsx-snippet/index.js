const traverse = require('babel-traverse').default;
const processHtmlAction = require('./process-html-action');
const processErrorExplanation = require('./process-error-explanation');
const processValue = require('./process-value');
const getAttr = require('../../../helpers/get-attr');

function addStateAndAction(
  { nodeState, nodeAction }, state, action
) {
  // NOTE: nodeState and nodeAction can be array or value
  if (nodeState) { state.push(nodeState); }
  if (nodeAction) { action.push(nodeAction); }
}

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
      const isCustom = getAttr({ node, name: 'data-component-custom' });
      if (isCustom) {
        return true;
      }
      addStateAndAction(processHtmlAction({ component, node }), state, action);
      addStateAndAction(processErrorExplanation({ component, node }), state, action);
      addStateAndAction(processValue({ component, node }), state, action);
    },
  });

  component.plugins.redux = { state, action };

  return { component, components, options };
};
