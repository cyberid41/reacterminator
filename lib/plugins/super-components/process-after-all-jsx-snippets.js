const _ = require('lodash');

const STACK_TEMPLATE = `\
<Stack indexKey='path' activeLayerIndex={ this.props.path }>
  REACTERMINATOR_PLACEHOLDER_LAYERS
</Stack>
`;

module.exports = function processAfterAllJsxSnippets({ components, options }) {
  // recreate App component
  if (!components.App) {
    return { components, options };
  }

  const layersSnippet = _(components)
    .filter(({ pathName }) => _.isString(pathName))
    .map(({ componentName, pathName }) => {
      // treat index differently, since index means empty path
      const indexName = (pathName === 'index') ? '' : pathName;
      return `<${componentName} index='${indexName}' />`;
    })
    .join('\n');

  components.App.jsxSnippet = STACK_TEMPLATE.replace(
    'REACTERMINATOR_PLACEHOLDER_LAYERS',
    layersSnippet
  );

  return { components, options };
};
