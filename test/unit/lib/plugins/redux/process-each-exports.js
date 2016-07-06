/* eslint-env mocha */
const _ = require('lodash')
const assert = require('chai').assert
const processEachExports = require('../../../../../lib/plugins/redux/process-each-exports')

describe('lib/plugins/redux/process-each-exports', function () {
  it('should wrap component if there is state', function () {
    const { suffix, snippet } = getLastExport({
      state: ['state.stateA', 'state.stateB']
    })

    assert.deepEqual(
      snippet,
`const ComponentAWithRedux = reduxConnect(
  (state) => ({
    'state.stateA': state.stateA,
'state.stateB': state.stateB
  }),
  {}
)(ComponentA);\n`
    )
    assert.deepEqual(suffix, 'WithRedux')
  })

  it('should wrap component if there is action', function () {
    const { snippet } = getLastExport({
      action: ['action.actionA']
    })

    assert.deepEqual(
      snippet,

`const ComponentAWithRedux = reduxConnect(
  null,
  {
    'action.actionA': action.actionA
  }
)(ComponentA);\n`
    )
  })

  it('should import reduxConnect if there is action and state', function () {
    const { snippet } = getLastExport({
      action: ['action.actionA'],
      state: ['state.stateA']
    })

    assert.deepEqual(
      snippet,
`const ComponentAWithRedux = reduxConnect(
  (state) => ({
    'state.stateA': state.stateA
  }),
  {
    'action.actionA': action.actionA
  }
)(ComponentA);\n`
    )
  })

  it('should not wrap component if there is no state or action', function () {
    const { snippet } = getLastExport({})

    assert.deepEqual(snippet, '')
  })
})

function getLastExport (redux) {
  const { component: { exports } } = processEachExports({
    component: {
      plugins: {redux},
      exports: [{
        suffix: 'ComponentA',
        snippet: ''
      }]
    }
  })

  return _.last(exports)
}
