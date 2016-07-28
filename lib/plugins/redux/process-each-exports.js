const _ = require('lodash');

function getState(state) {
  if (!_.get(state, 'length')) {
    return '  null,';
  }

  const stateMap = state
    .map((stateKey) => `'${stateKey}': ${stateKey}`)
    .join(',\n');

  return `\
  (state) => ({
    ${stateMap}
  }),`;
}

function getAction(action) {
  if (!_.get(action, 'length')) {
    return '  {}';
  }

  const actionMap = action
    .map((actionKey) => `'${actionKey}': ${actionKey}`)
    .join(',\n');

  return `\
  {
    ${actionMap}
  }`;
}

module.exports = function processEachExports({ component, components, options }) {
  const state = _.get(component, 'plugins.redux.state');
  const action = _.get(component, 'plugins.redux.action');

  if (_.get(state, 'length') || _.get(action, 'length')) {
    const suffix = 'WithRedux';
    const oldName = _.map(component.exports, 'suffix').join('');
    const newName = oldName + suffix;

    const snippet = `\
const ${newName} = reduxConnect(
${getState(state)}
${getAction(action)}
)(${oldName});
`;

    component.exports.push({ suffix, snippet });
  }

  return { component, components, options };
};
