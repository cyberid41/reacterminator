const cheerioParse = require('./helpers/cheerio-parse')
const elementToHtmlSnippet = require('./element-to-html-snippet')

module.exports = function htmlToHtmlSnippets ({htmlFile, htmlFiles, options}) {
  options = options || {}

  const {fileContent, fileName} = htmlFile

  const $ = cheerioParse(fileContent)

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
