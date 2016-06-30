module.exports = reacterminator

const _ = require('lodash')
const path = require('path')
const createPluginsAndPipline = require('./create-plugins-and-pipline')
const createHtmlFiles = require('./create-html-files')
const htmlToHtmlSnippets = require('./html-to-html-snippets')
const htmlSnippetToJsxSnippet = require('./html-snippet-to-jsx-snippet')
const addDeclaration = require('./add-declaration')
const addImportAndExport = require('./add-import-and-export')
const addAppComponent = require('./add-app-component')
const formatFileSnippet = require('./format-file-snippet')

function reacterminator ({type, content}, options) {
  // prepare options
  options = _.extend({outputPath: './reacterminator'}, options)
  options.outputPath = path.resolve(options.outputPath)

  // TODO: let user choose plugins
  const {plugins, pipThroughPlugins} = createPluginsAndPipline()
  options = _.extend({plugins, pipThroughPlugins}, options)

  const htmlFiles = createHtmlFiles({
    type,
    content,
    recursive: options.recursive
  })

  // TODO: handle is-primary/duplication
  const htmlSnippets = _.reduce(
    htmlFiles,
    (acc, htmlFile) => {
      Object.assign(acc, htmlToHtmlSnippets({htmlFile, htmlFiles, options}))
      return acc
    },
    {}
  )

  _.each(htmlSnippets, (htmlSnippet) => {
    htmlSnippet.plugins = _.mapValues(options.plugins, () => ({}))
  })

  function createProcessFunction (processName) {
    return (initialValue) => {
      return options.pipThroughPlugins(processName, initialValue)
    }
  }

  const pips = [
    {fn: htmlSnippetToJsxSnippet, type: 'each'},
    {fn: addDeclaration, type: 'each'},
    {fn: addImportAndExport, type: 'each'},
    {fn: addAppComponent, type: 'all'},
    {fn: formatFileSnippet, type: 'each'},
    {fn: 'processAllFormattedSnippets', type: 'all'}
  ]

  const components = pips.reduce((previousComponents, {fn, type}) => {
    // TODO: 1. gradually change fn to string and generate function from it
    // TODO: 2. remove type, use the name of the function to determin time
    const processFunction = _.isFunction(fn) ? fn : createProcessFunction(fn)

    switch (type) {
      case 'each':
        return _.mapValues(
          previousComponents,
          (component) => {
            return processFunction({
              component,
              components: previousComponents,
              options
            }).component
          }
        )
      case 'all':
        return processFunction({
          components: previousComponents,
          options
        }).components
    }
  }, htmlSnippets)

  if (_.isEmpty(components)) {
    throw new Error(
      'No components are detected, please specify data-component-name ' +
      'on the tags you want as a component'
    )
  }

  return components
}
