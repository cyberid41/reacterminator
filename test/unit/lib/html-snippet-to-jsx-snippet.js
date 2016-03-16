/* eslint-env mocha */
var assert = require('chai').assert
var htmlSnippetToJsxSnippet = require('../../../lib/html-snippet-to-jsx-snippet')

describe('html-snippet-to-jsx-snippet', function () {
  it('should change class to className, for to htmlFor', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div class="class-a" for="input-a"></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component).jsxSnippet,
      '<div className="class-a" htmlFor="input-a"></div>'
    )
  })

  it('should change class to className, for to htmlFor for inner html', function () {
    var component = {
      name: 'ComponentA',
      htmlSnippet: '<div class="class-a" for="input-a"><div class="class-b"></div></div>'
    }

    assert.deepEqual(
      htmlSnippetToJsxSnippet(component).jsxSnippet,
      '<div className="class-a" htmlFor="input-a"><div className="class-b"></div></div>'
    )
  })
})
