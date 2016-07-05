const _ = require('lodash')
const formatFileSnippet = require('./format-file-snippet')

module.exports = function processEachFormattedSnippet ({component, components, options}) {
  const { imports, declarationSnippet, exports } = component

  const importsSnippet = imports
    .map((importObj) => `import ${importObj.import} from '${importObj.from}';\n`)
    .join('')

  const exportName = _.map(exports, 'suffix').join('')
  const exportExpression = `export default ${exportName};`
  const exportsSnippet = _.map(exports, 'snippet').join('\n') + exportExpression

  const unformattedFileSnippet = [importsSnippet, declarationSnippet, exportsSnippet]
    .map((snippet) => `${snippet}\n`)
    .join('')

  component.formattedFileSnippet = formatFileSnippet(unformattedFileSnippet)

  return {component, components, options}
}
