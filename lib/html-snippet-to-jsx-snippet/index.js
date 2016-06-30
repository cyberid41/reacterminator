const _ = require('lodash')
const addProps = require('./add-props')
const changeLinksForParamStore = require('./change-links-for-param-store')

module.exports = function htmlSnippetToJsxSnippet ({ component, components, options }) {
  _(component)
    .tap(addProps)
    .tap(function (component) {
      changeLinksForParamStore(component, options)
    })
    .value()

  return { component, components, options }
}
