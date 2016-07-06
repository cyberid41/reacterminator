/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../lib/helpers/parse')
const generate = require('babel-generator').default
const tagsToComponentNames = require('../../../../../lib/plugins/tags-to-component-names/process-each-jsx-snippet')

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
