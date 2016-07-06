module.exports = function processEachImports ({component, components, options}) {
  if (component.plugins['super-components'].needParamStore) {
    component.imports.push({
      import: '{ Link }',
      from: 'param-store'
    })
  }

  return ({component, components, options})
}
