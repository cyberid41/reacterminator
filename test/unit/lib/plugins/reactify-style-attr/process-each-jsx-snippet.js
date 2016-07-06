/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../lib/helpers/parse')
const generate = require('babel-generator').default
const processJsxSnippet = require('../../../../../lib/plugins/reactify-style-attr/process-each-jsx-snippet')

describe('lib/plugins/reactify-style-attr/process-each-jsx-snippet', function () {
  it('should use object for style', function () {
    compare(
      '<div style="padding-right: 100px; -webket-flex-box: flex;"></div>',
      '<div style={{ paddingRight: \'100px\', WebketFlexBox: \'flex\' }}></div>;'
    )
  })

  it('should work if style is empty', function () {
    compare(
      '<div style=""></div>',
      '<div style={{}}></div>;'
    )
  })
})

function compare (before, after) {
  const component = {
    componentName: 'ComponentA',
    ast: parse(before)
  }

  assert.deepEqual(
    generate(processJsxSnippet({component}).component.ast, {}, '').code,
    after
  )
}
