const _ = require('lodash')
const removeComponentInnerHtml = require('./remove-component-inner-html')
const replaceInnerHtmlWithValueAttr = require('./replace-inner-html-with-value-attr')
const removeAllAttrsExceptProps = require('./remove-all-attrs-except-props')
const addProps = require('./add-props')
const changeLinksForParamStore = require('./change-links-for-param-store')

module.exports = function htmlSnippetToJsxSnippet ({ component, components, options }) {
  _(component)
    .tap(removeComponentInnerHtml)
    .tap(replaceInnerHtmlWithValueAttr)
    .tap(removeAllAttrsExceptProps)
    .tap(addProps)
    .tap(function (component) {
      changeLinksForParamStore(component, options)
    })
    .value()

  return { component, components, options }
}
