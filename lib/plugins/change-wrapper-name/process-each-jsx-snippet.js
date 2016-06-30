const traverse = require('babel-traverse').default
const extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const root = component.ast.program.body[0].expression

  traverse(component.ast, {
    JSXElement: function ({ node }) {
      const wrapper = extractAttrValueByNameFromAstNode(node, 'data-component-wrapper')

      if (wrapper && node === root) {
        root.openingElement.name.name = wrapper

        if (node.closingElement) {
          node.closingElement.name.name = wrapper
        }
      }
    }
  })

  return {component, components, options}
}
