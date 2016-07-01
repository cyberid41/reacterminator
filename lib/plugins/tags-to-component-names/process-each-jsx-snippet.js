const _ = require('lodash')
const traverse = require('babel-traverse').default
const getAttr = require('../../helpers/get-attr')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const { ast } = component
  const root = ast.program.body[0].expression

  traverse(ast, {
    JSXElement: function (nodePath) {
      const { node } = nodePath

      if (node === root) {
        return
      }

      const componentName = getAttr({node, name: 'data-component-name', isDelete: true})
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
