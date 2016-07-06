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
        pathName: fileName,
        fromPath: fileName
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
        fromPath: fileName
      }
    )
    if (htmlSnippet) {
      htmlSnippets[htmlSnippet.componentName] = htmlSnippet
    }
  })

  return htmlSnippets
}
