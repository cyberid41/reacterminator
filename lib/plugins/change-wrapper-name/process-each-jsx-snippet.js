const traverse = require('babel-traverse').default
const getAttr = require('../../helpers/get-attr')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const root = component.ast.program.body[0].expression

  traverse(component.ast, {
    JSXElement: function ({ node }) {
      const wrapper = getAttr({node, name: 'data-component-wrapper', isDelete: true})

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
