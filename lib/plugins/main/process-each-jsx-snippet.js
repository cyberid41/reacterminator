// provide ast
const _ = require('lodash')
const cheerio = require('cheerio')
const parse = require('../../helpers/parse')
const traverse = require('../../helpers/traverse-cheerio-node')

module.exports = function processEachJsxSnippet ({component, components, options}) {
  // add plugins
  component.plugins = _.mapValues(options.plugins, () => ({}))

  // parse into cheerio
  const $ = cheerio.load(component.htmlSnippet, {
    normalizeWhitespace: true,
    decodeEntities: false
  })

  // add dependencies
  component.dependencies = []

  const $root = $.root().children()

  traverse($root, $, function ($node) {
    const componentName = $node.data('component-name')
    if (componentName) {
      component.dependencies = _.union(component.dependencies, [componentName])
      return true
    }
  })

  // replace attr name for jsx
  traverse($root, $, function ($node) {
    replaceAttrName($node, 'class', 'className')
    replaceAttrName($node, 'for', 'htmlFor')
  })

  // add ast
  component.ast = parse($.xml())

  return {component, components, options}
}

function replaceAttrName ($node, oldAttr, newAttr) {
  const attrValue = $node.attr(oldAttr)

  $node.removeAttr(oldAttr)

  if (attrValue) {
    $node.attr(newAttr, attrValue)
  }
}
