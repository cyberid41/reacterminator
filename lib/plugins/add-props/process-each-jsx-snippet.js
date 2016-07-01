const traverse = require('babel-traverse').default
const getAttr = require('../../helpers/get-attr')
const assignProps = require('../../helpers/assign-props')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  const root = component.ast.program.body[0].expression

  traverse(component.ast, {
    JSXElement: function (nodePath) {
      const node = nodePath.node

      const props = getAttr({node, name: 'data-component-props', isDelete: true})
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
