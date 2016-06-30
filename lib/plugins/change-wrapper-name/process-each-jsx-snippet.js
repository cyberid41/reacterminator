const extractAttrValueByNameFromAstNode = require('../../helpers/extract-attr-value-by-name-from-ast-node')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const root = component.ast.program.body[0].expression

  const wrapper = extractAttrValueByNameFromAstNode(root, 'data-component-wrapper')

  if (wrapper) {
    root.openingElement.name.name = wrapper

    if (root.closingElement) {
      root.closingElement.name.name = wrapper
    }
  }

  return {component, components, options}
}
