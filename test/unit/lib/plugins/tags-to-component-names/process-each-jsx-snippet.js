/* eslint-env mocha */
var assert = require('chai').assert
var parse = require('../../../../../lib/helpers/parse')
var generate = require('babel-generator').default
var tagsToComponentNames = require('../../../../../lib/plugins/tags-to-component-names/process-each-jsx-snippet')

describe('change tags to component names', function () {
  it('should change tags to component names', function () {
    const { component: { ast } } = tagsToComponentNames({
      component: {
        ast: parse('<div><div data-component-name="ComponentA"/></div>')
      }
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<div><ComponentA data-component-name="ComponentA" /></div>;'
    )
  })
})
