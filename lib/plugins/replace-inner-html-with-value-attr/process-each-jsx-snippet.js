const traverse = require('babel-traverse').default
const parse = require('../../helpers/parse')
const extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')
const transplant = require('../../helpers/transplant')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  traverse(component.ast, {
    JSXElement: function (nodePath) {
      const { node } = nodePath

      const value = extractAttrValueByNameFromAstNode(node, 'data-component-value')
      if (!value) {
        return
      }

      const divWithSameValueAst = parse(`<div>${value}</div>`)

      transplant(node, divWithSameValueAst, 'children')
    }
  })

  return {component, components, options}
}
