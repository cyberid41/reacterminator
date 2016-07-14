/* eslint-env mocha */
const fs = require('fs')
const shell = require('shelljs')
const assert = require('chai').assert
const generateFile = require('../../../../lib/helpers/generate-file')
const path = require('path')

describe('lib/helpers/generate-file.js', function () {
  beforeEach(function () {
    shell.rm('-rf', './reacterminator')
    shell.mkdir('./reacterminator')
  })
})
