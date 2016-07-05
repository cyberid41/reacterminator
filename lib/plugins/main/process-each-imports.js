module.exports = function processEachImports ({component, components, options}) {
  const imports = component
    .dependencies
    .map((componentName) => ({
      import: componentName,
      from: `./${componentName}`
    }))

  imports.push({ import: 'React', from: 'react' })

  component.imports = imports

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
