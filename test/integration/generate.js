/* eslint-env mocha */
const fs = require('fs')
const shell = require('shelljs')
const assert = require('chai').assert
const generate = require('../../lib/generate/index')
const { checkFile } = require('../helpers')

describe('integration/generate', function () {
  beforeEach(function () {
    shell.rm('-rf', './reacterminator')
    shell.mkdir('-p', [
      './reacterminator/custom/action-type-constants',
      './reacterminator/custom/action-creators/',
      './reacterminator/custom/reducers/',
      './reacterminator/custom/components/',
    ])
    shell.cp('./lib/plugins/main/templates/custom/index.js', './reacterminator/custom/')
  })

  it('should throw erro when type is not defined', function () {
    assert.throws(
      () => generate('non-exist'),
      /is not supported/
    )
  })

  it('should generate all types of files', function () {
    generate('components/Unicorn', 'reacterminator')
    checkFile('generate', 'custom/components/Unicorn.jsx')

    generate('action-type-constants/unicorn/change-email', 'reacterminator')
    checkFile('generate', 'custom/action-type-constants/unicorn/change-email.js')

    generate('action-creators/unicorn/sumit-signup-form', 'reacterminator')
    checkFile('generate', 'custom/action-creators/unicorn/sumit-signup-form.js')
    checkFile('generate', 'custom/action-type-constants/unicorn/sumit-signup-form.js')

    generate('reducers/unicorn/name', 'reacterminator')
    checkFile('generate', 'custom/reducers/unicorn/name.js')

    checkFile('generate', 'custom/index.js')
  })
})
