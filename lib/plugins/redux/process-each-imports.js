const _ = require('lodash');

module.exports = function processEachImports({ component, components, options }) {
  const hasState = _.get(component, 'plugins.redux.state.length');
  const hasAction = _.get(component, 'plugins.redux.action.length');

  if (hasState || hasAction) {
    component.imports.push({
      import: '{ connect as reduxConnect }',
      from: 'react-redux',
    });
  }

  if (hasAction) {
    component.imports.push({
      import: 'action',
      from: '../action-creators/index',
    });
  }

  return { component, components, options };
};
