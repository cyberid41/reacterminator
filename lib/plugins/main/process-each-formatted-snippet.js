const formatFileSnippet = require('./format-file-snippet');

module.exports = function processEachFormattedSnippet({ component, components, options }) {
  const { imports, declarationSnippet, exports } = component;

  // import
  const importsSnippet = imports
    .map((importObj) => `import ${importObj.import} from '${importObj.from}';\n`)
    .join('');

  // export name
  const exportName = exports.map(({ suffix }) => suffix).join('');

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

  const unformattedFileSnippet = allSnippets
    .map((snippet) => `${snippet}\n`)
    .join('');

  component.formattedFileSnippet = formatFileSnippet(unformattedFileSnippet);

  return { component, components, options };
};
