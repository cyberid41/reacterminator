const _ = require('lodash')
const elementToHtmlSnippet = require('../../element-to-html-snippet')
const cheerioParse = require('../../helpers/cheerio-parse')

module.exports = function processBeforeAllJsxSnippets ({components, options}) {
  // create App component to aggregate all path components
  const pathDivs = _(components)
    .filter('pathName')
    .map((c) => `<div data-component-name='${c.componentName}'></div>`)
    .join('')

  const htmlSnippet = `<div data-component-name='App'>${pathDivs}</div>`
  const $ = cheerioParse(htmlSnippet)

  components.App = elementToHtmlSnippet(
    $('div[data-component-name=App]'),
    $,
    {},
    {}
  )

  return {components, options}
}
