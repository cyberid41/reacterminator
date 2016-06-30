const _ = require('lodash')

// TODO: give the user a way to specify order for each process,
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

module.exports = function createPluginsAndPipline () {
  return {plugins, pipThroughPlugins}
}
