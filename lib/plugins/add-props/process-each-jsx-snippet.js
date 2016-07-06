const traverse = require('babel-traverse').default
const getAttr = require('../../helpers/get-attr')
const assignProps = require('../../helpers/assign-props')
const parse = require('../../helpers/parse')
const transplant = require('../../helpers/transplant')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const root = component.ast.program.body[0].expression

  traverse(component.ast, {
    JSXElement: function (nodePath) {
      const node = nodePath.node

      const props = getAttr({node, name: 'data-component-props', isDelete: true}) || ''

      if (node === root) {
        return
      }

      const isComponent = getAttr({node, name: 'data-component-name'})
      if (isComponent) {
        // if this element is a component, we remove all props other than specified
        transplant(node, parse(`<div ${props}></div>`), 'openingElement.attributes')
      } else {
        assignProps({node, props})
      }
    }
  })

  return {component, components, options}
}
