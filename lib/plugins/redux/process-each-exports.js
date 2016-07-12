const _ = require('lodash');

const REDUX_EXPORT_TEMPLATE = `\
const REACTERMINATOR_PLACEHOLDER_NEW_NAME = reduxConnect(
REACTERMINATOR_PLACEHOLDER_STATE
REACTERMINATOR_PLACEHOLDER_ACTION
)(REACTERMINATOR_PLACEHOLDER_NAME);
`;

module.exports = function processEachExports({ component, components, options }) {
  const state = _.get(component, 'plugins.redux.state');
  const action = _.get(component, 'plugins.redux.action');

  if (_.get(state, 'length') || _.get(action, 'length')) {
    const suffix = 'WithRedux';
    const oldName = _.map(component.exports, 'suffix').join('');
    const newName = oldName + suffix;

    const snippet = REDUX_EXPORT_TEMPLATE
      .replace('REACTERMINATOR_PLACEHOLDER_NEW_NAME', newName)
      .replace('REACTERMINATOR_PLACEHOLDER_STATE', getState(state))
      .replace('REACTERMINATOR_PLACEHOLDER_ACTION', getAction(action))
      .replace('REACTERMINATOR_PLACEHOLDER_NAME', oldName);

    component.exports.push({ suffix, snippet });
  }

  return { component, components, options };
};

function getState(state) {
  if (!_.get(state, 'length')) {
    return '  null,';
  }

  const MAP_STATE_TO_PROPS_TEMPLATE = `\
  (state) => ({
    REACTERMINATOR_PLACEHOLDER_STATE_MAP
  }),`;

  const stateMap = state.map(function (stateKey) {
    return `'${stateKey}': ${stateKey}`;
  }).join(',\n');

  return MAP_STATE_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_STATE_MAP', stateMap);
}

function getAction(action) {
  if (!_.get(action, 'length')) {
    return '  {}';
  }

  const MAP_DISPATCH_TO_PROPS_TEMPLATE = `\
  {
    REACTERMINATOR_PLACEHOLDER_ACTION_MAP
  }`;

  const actionMap = action.map(function (actionKey) {
    return `'${actionKey}': ${actionKey}`;
  }).join(',\n');

  return MAP_DISPATCH_TO_PROPS_TEMPLATE
    .replace('REACTERMINATOR_PLACEHOLDER_ACTION_MAP', actionMap);
}
