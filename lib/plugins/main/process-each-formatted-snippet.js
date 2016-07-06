const formatFileSnippet = require('./format-file-snippet')

module.exports = function processEachFormattedSnippet ({component, components, options}) {
  const { imports, declarationSnippet, exports } = component

  const importsSnippet = imports
    .map((importObj) => `import ${importObj.import} from '${importObj.from}';\n`)
    .join('')

  const exportName = exports.map(({suffix}) => suffix).join('')
  const exportExpression = `export default ${exportName};`
  const exportsSnippet = exports
    .map(({snippet}) => `${snippet}\n`)
    .concat(exportExpression)
    .join('')

  const unformattedFileSnippet = [importsSnippet, declarationSnippet, exportsSnippet]
    .map((snippet) => `${snippet}\n`)
    .join('')

  component.formattedFileSnippet = formatFileSnippet(unformattedFileSnippet)

  return {component, components, options}
}
