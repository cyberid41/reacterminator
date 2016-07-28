const getAttr = require('../../../helpers/get-attr');
const assignProps = require('../../../helpers/assign-props');
const getActionType = require('./get-action-type');
const formatPath = require('./format-path');
const propByKey = require('./prop-by-key');

function getStateAndAction({ component, node, id, stateKey, actionName, actionKey }) {
  const nodeState = stateKey && formatPath('state', component.componentName, id);
  const nodeAction = formatPath('action', component.componentName, [actionName, id]);

  const props = {};

  // NOTE: the order of stateKey and actionKey matters for tests
  if (stateKey) {
    props[stateKey] = propByKey(nodeState);
  }

  props[actionKey] = propByKey(nodeAction);

  assignProps({ node, props });

  return { nodeState, nodeAction };
}

function processJsxByActionType({ component, node, id, actionType }) {
  switch (actionType) {
    case 'change':
      return getStateAndAction({
        component,
        node,
        id,
        stateKey: 'value',
        actionName: 'change',
        actionKey: 'onChange',
      });

    case 'select':
      return getStateAndAction({
        component,
        node,
        id,
        stateKey: 'value',
        actionName: 'select',
        actionKey: 'onChange',
      });

    case 'check':
      return getStateAndAction({
        component,
        node,
        id,
        stateKey: 'checked',
        actionName: 'change',
        actionKey: 'onChange',
      });

    case 'toggle':
      return getStateAndAction({
        component,
        node,
        id,
        stateKey: 'checked',
        actionName: 'toggle',
        actionKey: 'onChange',
      });

    case 'click':
      return getStateAndAction({
        component,
        node,
        id,
        stateKey: null,
        actionName: 'click',
        actionKey: 'onClick',
      });

    case 'submit':
      return getStateAndAction({
        component,
        node,
        id,
        stateKey: null,
        actionName: 'submit',
        actionKey: 'onSubmit',
      });

    default:
      throw new Error(`This action type is not recognized: ${actionType}`);
  }
}

module.exports = function processHtmlAction({ component, node }) {
  const id = getAttr({ node, name: 'id' });
  if (!id) {
    return {};
  }

  const actionType = getActionType(node);
  if (!actionType) {
    return {};
  }

  return processJsxByActionType({ component, node, id, actionType });
};
