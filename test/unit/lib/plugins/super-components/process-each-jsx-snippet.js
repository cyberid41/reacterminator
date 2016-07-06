/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../lib/helpers/parse')
const generate = require('babel-generator').default
const processEachJsxSnippet = require('../../../../../lib/plugins/super-components/process-each-jsx-snippet')

describe('lib/plugins/super-components/process-each-jsx-snippet', function () {
  it('should change anchor tag', function () {
    compare(
      '<a href="directory.html">This is a link</a>',
      '<Link href="directory.html" params={{ path: \'directory\' }}>This is a link</Link>;'
    )
  })

  it('should not change anchor tag starts with #', function () {
    compare(
      '<a href="#to-the-moon"/>',
      '<a href="#to-the-moon" />;'
    )
  })

  it('do nothing if not an anchor tag', function () {
    compare(
      '<div href="directory.html"/>',
      '<div href="directory.html" />;'
    )
  })

  it('do nothing if does not have a href tag', function () {
    compare(
      '<a />',
      '<a />;'
    )
  })

  it('should not change anchor tag when changeLinksForParamStore is false', function () {
    compare(
      '<a href="directory.html"/>',
      '<a href="directory.html" />;',
      {changeLinksForParamStore: false}
    )
  })

  it('should not change anchor tag with absolute url', function () {
    compare(
      '<a href="http://www.google.com"/>',
      '<a href="http://www.google.com" />;'
    )
  })

  it('should not override existing onClick event', function () {
    compare(
      '<a href="http://www.google.com" onClick={() => null}/>',
      '<a href="http://www.google.com" onClick={() => null} />;'
    )
  })

  it('should not change tel', function () {
    compare(
      '<a href="tel:918" />;',
      '<a href="tel:918" />;'
    )
  })

  it('should not change mailto', function () {
    compare(
      '<a href="mailto:918" />;',
      '<a href="mailto:918" />;'
    )
  })

  it('should change #back to history back on click', function () {
    compare(
      '<a href="#back"/>',
      `\
<a href="#back" onClick={e => {
  e.preventDefault();window.history.back();
}} />;`
    )
  })

  it('should add import needParamStore if it is used', function () {
    checkNeedParamStore(
      '<a href="user"/>',
      true
    )
  })

  it('should not add import needParamStore if it is not used', function () {
    checkNeedParamStore(
      '<a href="#"/>',
      undefined,
      {changeLinksForParamStore: false}
    )
  })
})

function compare (before, after, options) {
  const { component: { ast } } = processEachJsxSnippet({
    component: {ast: parse(before), plugins: {'super-components': {}}},
    options: options || {changeLinksForParamStore: true}
  })

  const { code } = generate(ast, {}, '')

  assert.deepEqual(code, after)
}

function checkNeedParamStore (code, expectedNeedParamStore, options) {
  const { component: { plugins } } = processEachJsxSnippet({
    component: {ast: parse(code), plugins: {'super-components': {}}},
    options: {changeLinksForParamStore: true}
  })

  const { needParamStore } = plugins['super-components']

  assert.deepEqual(needParamStore, expectedNeedParamStore)
}
