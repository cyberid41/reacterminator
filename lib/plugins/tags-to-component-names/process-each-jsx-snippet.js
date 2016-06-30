const _ = require('lodash')
const traverse = require('babel-traverse').default

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const { ast } = component
  const root = ast.program.body[0].expression

  traverse(ast, {
    JSXElement: function (nodePath) {
      const { node } = nodePath

      if (node === root) {
        return
      }

      const componentNameAttrIndex = _.findIndex(
        node.openingElement.attributes,
        function (attribute) {
          return attribute.name.name === 'data-component-name'
        }
      )

      if (componentNameAttrIndex === -1) {
        return
      }

      const componentName = node
        .openingElement
        .attributes[componentNameAttrIndex]
        .value
        .value

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
