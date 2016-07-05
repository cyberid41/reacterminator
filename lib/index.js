module.exports = reacterminator

const _ = require('lodash')
const path = require('path')
const createPluginsAndPipline = require('./create-plugins-and-pipline')
const createHtmlFiles = require('./create-html-files')
const htmlToHtmlSnippets = require('./html-to-html-snippets')

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

  const processes = [
    'processBeforeAllJsxSnippets',
    'processEachJsxSnippet',
    'processEachDeclarationSnippet',
    'processEachImports',
    'processEachExports',
    'processEachFormattedSnippet',
    'processAllFormattedSnippets'
  ]

  // TODO: improve performance by using one ast hook to go through the whole project
  const components = processes.reduce(
    (previousComponents, process) => {
      const processType = /processEach/.test(process) ? 'each' : 'all'

      switch (processType) {
        case 'each':
          return _.mapValues(
            previousComponents,
            (component) => {
              return options.pipThroughPlugins(process, {
                component,
                components: previousComponents,
                options
              }).component
            }
          )
      case 'all':
        return options.pipThroughPlugins(process, {
          components: previousComponents,
          options
        }).components
      }
    },
    htmlSnippets
  )

  if (_.isEmpty(components)) {
    throw new Error(
      'No components are detected, please specify data-component-name ' +
      'on the tags you want as a component'
    )
  }

  return components
}
