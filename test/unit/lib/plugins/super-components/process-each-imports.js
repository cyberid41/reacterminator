/* eslint-env mocha */
const assert = require('chai').assert
const processEachImports = require('../../../../../lib/plugins/super-components/process-each-imports')

describe('lib/plugins/super-components/process-each-imports', function () {
  it('should add import if needParamStore is true', function () {
    const { component } = processEachImports({
      component: {
        imports: [],
        plugins: {
          'super-components': {
            needParamStore: true
          }
        }
      }
    })

    assert.deepEqual(
      component.imports,
      [{ import: '{ Link }', from: 'param-store' }]
    )
  })
})
