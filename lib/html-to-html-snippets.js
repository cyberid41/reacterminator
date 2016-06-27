const cheerio = require('cheerio')
const Attr = require('./attr')
const COMMENT_NODE_TYPE = 8
const upperCamelCase = require('./helpers/upper-camel-case')

module.exports = function htmlToHtmlSnippets ({htmlFile, htmlFiles, options}) {
  options = options || {}

  const {fileContent, fileName} = htmlFile

  const $ = cheerio.load(fileContent, {
    normalizeWhitespace: true,
    decodeEntities: false
  })

  const htmlSnippets = {}

  if (options.fileToComponent) {
    const htmlSnippet = elementToHtmlSnippet(
      $('body'),
      $,
      htmlSnippets,
      {
        componentName: fileName,
        wrapper: 'div',
        path: fileName,
        isPath: true,
        fromPath: fileName // NOTE: this is not used anywhere yet
      }
    )
    htmlSnippets[htmlSnippet.componentName] = htmlSnippet
  }

  $('[data-component-name]').each(function () {
    const htmlSnippet = elementToHtmlSnippet(
      $(this),
      $,
      htmlSnippets,
      {
        fromPath: fileName // NOTE: this is not used anywhere yet
      }
    )
    if (htmlSnippet) {
      htmlSnippets[htmlSnippet.componentName] = htmlSnippet
    }
  })

  return htmlSnippets
}

function elementToHtmlSnippet ($element, $, htmlSnippets, componentOptions) {
  // get all annotated attributes
  $element = $element.clone()

  const component = Object.assign(
    {},
    componentOptions,
    new Attr($element).extract()
  )

  component.componentName = upperCamelCase(component.componentName)

  const {componentName} = component

  // check component name
  if (!componentName) {
    throw new Error(
      `this component does not have a name: \n ${$element.toString()}`
    )
  }

  // only override an existing component if the current is primary
  const isPrimary = component.primary
  const skipCurrentComponent = htmlSnippets[componentName] && !isPrimary
  if (skipCurrentComponent) {
    return
  }

  // remove comment, script and style
  component.removedComments = []
  component.removedScriptTags = []
  component.removedStyleTags = []
  $element
    .contents()
    .filter(function () {
      if (this.nodeType === COMMENT_NODE_TYPE) {
        component.removedComments.push($(this).toString())
        return true
      } else if ($(this).get(0).tagName === 'script') {
        component.removedScriptTags.push($(this).toString())
        return true
      } else if ($(this).get(0).tagName === 'style') {
        component.removedStyleTags.push($(this).toString())
        return true
      }
    })
    .remove()

  // convert element to string snippet
  component.htmlSnippet = $element.toString()

  return component
}
