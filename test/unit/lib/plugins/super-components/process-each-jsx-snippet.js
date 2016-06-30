/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../lib/helpers/parse')
const generate = require('babel-generator').default
const changeLinksForParamStore = require('../../../../../lib/plugins/super-components/process-each-jsx-snippet')

describe('change links for param store', function () {
  it('should change anchor tag', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="directory.html">This is a link</a>')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<Link href="directory.html" params={{ path: \'directory\' }}>This is a link</Link>;'
    )
  })

  it('should not change anchor tag starts with #', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="#to-the-moon"/>')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="#to-the-moon" />;'
    )
  })

  it('do nothing if not an anchor tag', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<div href="directory.html"/>')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<div href="directory.html" />;'
    )
  })

  it('do nothing if does not have a href tag', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a />')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a />;'
    )
  })

  it('should not change anchor tag when changeLinksForParamStore is false', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="directory.html"/>')},
      options: {changeLinksForParamStore: false}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="directory.html" />;'
    )
  })

  it('should not change anchor tag with absolute url', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="http://www.google.com"/>')},
      options: {changeLinksForParamStore: false}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="http://www.google.com" />;'
    )
  })

  it('should not override existing onClick event', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="http://www.google.com" onClick={() => null}/>')},
      options: {changeLinksForParamStore: false}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="http://www.google.com" onClick={() => null} />;'
    )
  })

  it('should add import ParamStore if it is not used', function () {
    const { component: { imports } } = changeLinksForParamStore({
      component: {ast: parse('<a href="#"/>')},
      options: {changeLinksForParamStore: false}
    })

    assert.deepEqual(imports, undefined)
  })

  it('should add import ParamStore if it is used', function () {
    const { component: { imports } } = changeLinksForParamStore({
      component: {ast: parse('<a href="user"/>')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      imports,
      'import {Link} from \'param-store\';'
    )
  })

  it('should not change tel', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="tel:918"/>')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="tel:918" />;'
    )
  })

  it('should not change mailto', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="mailto:918"/>')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<a href="mailto:918" />;'
    )
  })

  it('should change #back to history back on click', function () {
    const { component: { ast } } = changeLinksForParamStore({
      component: {ast: parse('<a href="#back"/>')},
      options: {changeLinksForParamStore: true}
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      `\
<a href="#back" onClick={e => {
  e.preventDefault();window.history.back();
}} />;`
    )
  })
})
