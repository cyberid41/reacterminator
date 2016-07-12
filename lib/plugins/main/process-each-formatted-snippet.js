const formatFileSnippet = require('./format-file-snippet');
const processCustomAppSnippet = require('./process-custom-app-snippet');

module.exports = function processEachFormattedSnippet({ component, components, options }) {
  const { componentName, imports, dependencies, declarationSnippet, exports } = component;

  // import
  let importsSnippet = imports
    .map((importObj) => `import ${importObj.import} from '${importObj.from}';\n`)
    .join('');

  // export name
  let exportName = exports.map(({ suffix }) => suffix).join('');

  // custom (only App.jsx should have this)
  let customAppSnippet = false;

  if (component.componentName === 'App') {
    exportName = `Custom${componentName}`;
    importsSnippet += 'import custom from \'../../custom/index\';\n';
    customAppSnippet = processCustomAppSnippet({ componentName, dependencies });
  }

  // export
  const exportExpression = `export default ${exportName};`;
  const exportsSnippet = exports
    .map(({ snippet }) => `${snippet}\n`)
    .concat(exportExpression)
    .join('');

  const allSnippets = [
    importsSnippet,
    declarationSnippet,
    exportsSnippet,
  ];

  if (customAppSnippet) allSnippets.splice(2, 0, customAppSnippet);

  const unformattedFileSnippet = allSnippets
    .map((snippet) => `${snippet}\n`)
    .join('');

  component.formattedFileSnippet = formatFileSnippet(unformattedFileSnippet);

  return { component, components, options };
};
