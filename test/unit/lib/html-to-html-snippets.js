/* eslint-env mocha */
const assert = require('chai').assert
const htmlFileToHtmlSnippets = require('../../../lib/html-file-to-html-snippets')

describe('html-to-html-snippets', function () {
  it('should export a function', function () {
    assert.typeOf(htmlFileToHtmlSnippets, 'Function')
  })

  it('should output one component', function () {
    const fileContent = `\
<div data-component-name="ComponentA">
</div>`

    assert.equal(
      htmlFileToHtmlSnippets({htmlFile: {fileContent}}).ComponentA.htmlSnippet,
      '<div> </div>'
    )
  })

  it('should output two nested components', function () {
    const fileContent = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB">
  </div>
</div>`

    assert.equal(
      htmlFileToHtmlSnippets({htmlFile: {fileContent}}).ComponentA.htmlSnippet,
      '<div> <div data-component-name="ComponentB"> </div> </div>'
    )
    assert.equal(
      htmlFileToHtmlSnippets({htmlFile: {fileContent}}).ComponentB.htmlSnippet,
      '<div> </div>'
    )
  })

  it('should throw an error when the name is empty', function () {
    const fileContent = `\
<div data-component-name="">
</div>`

    assert.throws(
      function () {
        htmlFileToHtmlSnippets({htmlFile: {fileContent}})
      },
      /this component does not have a name/
    )
  })

  it('should remove commented nodes', function () {
    const fileContent = `\
<div data-component-name="ComponentA">
  <!--[if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif]-->
</div>`

    const outputComponent = htmlFileToHtmlSnippets({htmlFile: {fileContent}}).ComponentA

    assert.equal(outputComponent.htmlSnippet, '<div>  </div>')
    assert.deepEqual(outputComponent.removedComments, ['<!--[if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif]-->'])
  })

  it('should remove script tags', function () {
    const fileContent = `\
<div data-component-name="ComponentA">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script>
</div>`

    const outputComponent = htmlFileToHtmlSnippets({htmlFile: {fileContent}}).ComponentA

    assert.equal(outputComponent.htmlSnippet, '<div>  </div>')
    assert.deepEqual(outputComponent.removedScriptTags, ['<script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script>'])
  })

  it('should remove style tags', function () {
    const fileContent = `\
<div data-component-name="ComponentA">
<style> .directory-info { vertical-align: middle; } </style>
</div>`

    const outputComponent = htmlFileToHtmlSnippets({htmlFile: {fileContent}}).ComponentA

    assert.deepEqual(outputComponent.htmlSnippet, '<div>  </div>')
    assert.deepEqual(outputComponent.removedStyleTags, ['<style> .directory-info { vertical-align: middle; } </style>'])
  })

  it('should output file component based on filename', function () {
    const fileContent = '<body></body>'

    const usersComponent = htmlFileToHtmlSnippets({
      htmlFile: {fileContent, fileName: 'users'},
      options: {fileToComponent: true}
    }).Users

    assert.deepEqual(usersComponent.htmlSnippet, '<body></body>')
    assert.deepEqual(usersComponent.wrapper, 'div')
  })
})
