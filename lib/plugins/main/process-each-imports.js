module.exports = function processEachImports ({component, components, options}) {
  component.imports = component
    .dependencies
    .map((componentName) => ({
      import: componentName,
      from: `./${componentName}`
    }))

  component.imports.unshift({ import: 'React', from: 'react' })

  return {component, components, options}
}

// TODO: create a plugin for custom imports
// const importCustom = _(component.imports)
//   .split(';')
//   .map(_.trim)
//   .filter()
//   .map(function (importString) {
//     return `${importString};\n`
//   })
//   .join('')
