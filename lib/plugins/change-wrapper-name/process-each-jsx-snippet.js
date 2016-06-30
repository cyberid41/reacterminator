module.exports = function processEachJsxSnippet ({component, components, options}) {
  const { wrapper } = component

  if (wrapper) {
    const root = component.ast.program.body[0].expression
    root.openingElement.name.name = wrapper

    if (root.closingElement) {
      root.closingElement.name.name = wrapper
    }
  }

  return {component, components, options}
}
