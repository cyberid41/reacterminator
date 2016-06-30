const _ = require('lodash')
const createImport = require('./create-import')
const createExport = require('./create-export')
const addDeclaration = require('./add-declaration')
const parse = require('./helpers/parse')
const generate = require('babel-generator').default

// TODO: move this into a plugin, add hooks to it
module.exports = function addAppComponent ({components, options}) {
  const dependencies = _(components)
    .filter('path')
    .map('componentName')
    .value()

  // Do not create component if there is no path
  if (dependencies.length === 0) {
    return {components, options}
  }

  const htmlSnippet = '<div></div>'

  let appComponent = {
    componentName: 'App',
    htmlSnippet,
    ast: parse(htmlSnippet),
    plugins: _.mapValues(options.plugins, () => ({}))
  }

  const jsxResult = options.pipThroughPlugins(
    'processAppJsx',
    {
      component: appComponent,
      ast: appComponent.ast,
      components
    }
  )

  appComponent = jsxResult.component
  appComponent.dependencies = dependencies

  // remove semicolon at the end of line, otherwise the syntax is wrong
  // NOTE: the third argument of the generate function should be the code
  // however we should NOT use the previous code to generate the new code,
  // and an empty string is enough to remove the error message.
  // So we put an empty string there.
  appComponent.jsxSnippet = generate(
    jsxResult.ast,
    {
      retainLines: false,
      comments: false,
      sourceMaps: false
    },
    ''
  ).code.replace(/;$/, '')

  addDeclaration({
    component: appComponent,
    components,
    options
  })

  const importSnippet = createImport({
    component: appComponent,
    components,
    options,
    processName: 'processAppImport'
  })

  const {declarationSnippet} = appComponent

  const exportSnippet = createExport({
    component: appComponent,
    components,
    options,
    processName: 'processAppExport'
  })

  appComponent.fileSnippet = importSnippet + declarationSnippet + exportSnippet

  components['App'] = appComponent

  return {components, options}
}
