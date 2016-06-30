const _ = require('lodash')
const reactifyStyleAttr = require('./reactify-style-attr')
const tagsToComponentNames = require('./tags-to-component-names')
const removeComponentInnerHtml = require('./remove-component-inner-html')
const replaceInnerHtmlWithValueAttr = require('./replace-inner-html-with-value-attr')
const removeAllAttrsExceptProps = require('./remove-all-attrs-except-props')
const addProps = require('./add-props')
const changeLinksForParamStore = require('./change-links-for-param-store')

module.exports = function htmlSnippetToJsxSnippet ({component, components, options}) {
  _(component)
    .tap(reactifyStyleAttr)
    .tap(tagsToComponentNames)
    .tap(removeComponentInnerHtml)
    .tap(replaceInnerHtmlWithValueAttr)
    .tap(removeAllAttrsExceptProps)
    .tap(addProps)
    .tap(function (component) {
      changeLinksForParamStore(component, options)
    })
    .value()

  const jsxResult = options.pipThroughPlugins(
    'processJsx',
    {
      component,
      ast: component.ast,
      components
    }
  )

  component = jsxResult.component

  return {
    component,
    components,
    options
  }
}
