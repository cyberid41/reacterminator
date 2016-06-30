const _ = require('lodash')
const traverse = require('babel-traverse').default
const extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const { ast } = component
  const root = ast.program.body[0].expression

  traverse(ast, {
    JSXElement: function (nodePath) {
      const { node } = nodePath

      if (node === root) {
        return
      }

      const componentName = extractAttrValueByNameFromAstNode(node, 'data-component-name')
      if (!componentName) {
        return
      }

      // change tag name
      node.openingElement.name.name = componentName
      if (node.closingElement) {
        node.closingElement.name.name = componentName
      }

      // clear inner html
      node.children = []
    }
  })

  return {component, components, options}
}
