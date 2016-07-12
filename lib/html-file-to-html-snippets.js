const cheerioParse = require('./helpers/cheerio-parse');
const htmlElementToHtmlSnippet = require('./html-element-to-html-snippet');

module.exports = function htmlFileToHtmlSnippets({ htmlFile, options }) {
  const { fileContent, fileName } = htmlFile;

  const $ = cheerioParse(fileContent);

  const htmlSnippets = {};

  if (options.fileToComponent) {
    const htmlSnippet = htmlElementToHtmlSnippet(
      $('body'),
      $,
      htmlSnippets,
      {
        componentName: fileName,
        wrapper: 'div',
        pathName: fileName,
        fromPath: fileName,
      }
    );
    htmlSnippets[htmlSnippet.componentName] = htmlSnippet;
  }

  $('[data-component-name]').each(function addComponent() {
    const htmlSnippet = htmlElementToHtmlSnippet(
      $(this),
      $,
      htmlSnippets,
      {
        fromPath: fileName,
      }
    );

    if (htmlSnippet) {
      htmlSnippets[htmlSnippet.componentName] = htmlSnippet;
    }
  });

  return htmlSnippets;
};
