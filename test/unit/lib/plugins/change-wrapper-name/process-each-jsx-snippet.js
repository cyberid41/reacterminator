/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../lib/helpers/parse')
const generate = require('babel-generator').default
const changeWrapperName = require('../../../../../lib/plugins/change-wrapper-name/process-each-jsx-snippet.js')

describe('change wrapper name', function () {
  it('should change wrapper name', function () {
    const { component: { ast } } = changeWrapperName({
      component: {
        ast: parse('<div data-component-wrapper="ComponentA"/>')
      }
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<ComponentA  />;'
    )
  })

  it('should change wrapper name for a component with inner content', function () {
    const { component: { ast } } = changeWrapperName({
      component: {
        ast: parse('<div data-component-wrapper="ComponentA">text</div>')
      }
    })

    assert.deepEqual(
      generate(ast, {}, '').code,
      '<ComponentA >text</ComponentA>;'
    )
  })
})
