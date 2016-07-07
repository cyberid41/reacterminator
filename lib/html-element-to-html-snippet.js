const _ = require('lodash')
const upperCamelCase = require('./helpers/upper-camel-case')
const COMMENT_NODE_TYPE = 8

const DATA_NAMES_TO_ATTR_NAMES = {
  'data-component-name': 'componentName',
  'data-component-primary': 'primary',
  'data-component-path': 'pathName'
}

const DATA_NAMES = _.keys(DATA_NAMES_TO_ATTR_NAMES)

function getAttrsAndDelete ($node) {
  // get all attributes
  return DATA_NAMES.reduce((attrs, dataName) => {
    // get and remove data-component-xxx
    const dataValue = _.trim($node.attr(dataName))
    $node.removeAttr(dataName)

    // put it into attributes
    if (dataValue) {
      attrs[DATA_NAMES_TO_ATTR_NAMES[dataName]] = dataValue
    }

    return attrs
  }, {})
}

module.exports = function htmlElementToHtmlSnippet ($element, $, htmlSnippets, componentOptions) {
  // get all annotated attributes
  $element = $element.clone()

  const attrs = getAttrsAndDelete($element)
  const component = Object.assign({}, componentOptions, attrs)

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
