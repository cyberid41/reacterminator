const getAttr = require('../../../helpers/get-attr');
const assignProps = require('../../../helpers/assign-props');
const getActionType = require('./get-action-type');
const formatPath = require('./format-path');
const propByKey = require('./prop-by-key');

function getStateAndAction({ component, node, id, stateKey, actionName, actionKey }) {
  const nodeAction = formatPath('action', component.componentName, [actionName, id]);
  assignProps({ node, props: {[actionKey]: propByKey(nodeAction)}});

  // Do not have state key
  if (!stateKey) {
    return { nodeAction }
  }

  // Have state key
  const nodeState = formatPath('state', component.componentName, id);
  // const nodeErrorState = formatPath('state', component.componentName, `${id}-error`);
  // const nodeActionError = formatPath('action', component.componentName, [actionName, id]);

  assignProps({ node, props: {[stateKey]: propByKey(nodeState)}});

  return {
    nodeState,
    // nodeErrorState,
    nodeAction,
    // nodeActionError,
  };
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
