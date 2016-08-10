const _ = require('lodash');

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

  components.App.jsxSnippet = `\
<Stack indexKey='path' activeLayerIndex={ this.props.path }>
  ${layersSnippet}
</Stack>
`;

  return { components, options };
};
