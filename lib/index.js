const _ = require('lodash')
const path = require('path')
const createHtmlFiles = require('./create-html-files')
const htmlFileToHtmlSnippets = require('./html-file-to-html-snippets')

// TODO: give the user a way to specify order for each process,
// TODO: let user choose plugins
// not just in a plugin level
// e.g. super-components before redux
const plugins = [
  'main', // this need to be at the beginning
  'super-components', // this need to come before redux
  'redux',
  'change-wrapper-name',
  'reactify-style-attr',
  'tags-to-component-names',
  'replace-inner-html-with-value-attr',
  'add-props', // this need to be after all props manipulation since it removes all other props
  'clean-jsx-ast' // this need to be at the end to clean ast
].reduce((acc, pluginName) => {
  acc[pluginName] = require(`./plugins/${pluginName}`)
  return acc
}, {})

function pipThroughPlugins (processName, initialValue) {
  return _.reduce(plugins, (finalValue, plugin, pluginName) => {
    const processFunction = plugin[processName] || _.identity
    return processFunction(finalValue)
  }, initialValue)
}

module.exports = function reacterminator ({type, content}, options) {
  // prepare options
  options = _.extend({outputPath: './reacterminator'}, options)
  options.outputPath = path.resolve(options.outputPath)

  options = _.extend({plugins, pipThroughPlugins}, options)

  const htmlFiles = createHtmlFiles({
    type,
    content,
    recursive: options.recursive
  })

  const htmlSnippets = _.reduce(
    htmlFiles,
    (acc, htmlFile) => {
      Object.assign(acc, htmlFileToHtmlSnippets({htmlFile, htmlFiles, options}))
      return acc
    },
    {}
  )

  const processes = [
    'processBeforeAllJsxSnippets',
    'processEachJsxSnippet',
    'processAfterAllJsxSnippets',
    'processEachDeclarationSnippet',
    'processEachImports',
    'processAfterAllImports',
    'processEachExports',
    'processEachFormattedSnippet',
    'processAfterAllFormattedSnippets' // change to processAfterAllFormattedSnippets
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
