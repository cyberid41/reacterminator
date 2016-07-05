/* eslint-env mocha */
const assert = require('chai').assert
const processEachImports = require('../../../../../lib/plugins/redux/process-each-imports')

describe('lib/plugins/redux/process-each-imports', function () {
  it('should import reduxConnect if there is state', function () {
    const { component: { imports } } = processEachImports({
      component: {
        plugins: {redux: {state: ['stateA']}},
        imports: []
      },
    })

    assert.deepEqual(
      imports,
      [
        {import: '{ connect as reduxConnect }', from: 'react-redux'}
      ]
    )
  })

  it('should import reduxConnect if there is action', function () {
    const { component: { imports } } = processEachImports({
      component: {
        plugins: {redux: {action: ['actionA']}},
        imports: []
      },
    })

    assert.deepEqual(
      imports,
      [
        {import: '{ connect as reduxConnect }', from: 'react-redux'},
        {import: 'action', from: '../action-creators/index'}
      ]
    )
  })

  it('should not import reduxConnect if there is no state or action', function () {
    const { component: { imports } } = processEachImports({
      component: {
        plugins: {redux: {}},
        imports: []
      },
    })

    assert.deepEqual(
      imports,
      []
    )
  })
})
