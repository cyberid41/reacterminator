const traverse = require('babel-traverse').default
const extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')
const assignProps = require('../../helpers/assign-props')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const root = component.ast.program.body[0].expression

  traverse(component.ast, {
    JSXElement: function (nodePath) {
      const node = nodePath.node

      const props = extractAttrValueByNameFromAstNode(node, 'data-component-props')
      if (!props) {
        return
      }

      if (node === root) {
        return
      }

      assignProps({node, props})
    }
  })

  return {component, components, options}
}
