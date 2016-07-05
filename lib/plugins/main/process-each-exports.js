module.exports = function processEachExports ({component, components, options}) {
  component.exports = [{
    suffix: component.componentName,
    snippet: ''
  }]

  return {component, components, options}
}
