/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')

describe('validate-data-component-name', function () {
  it('should throw an error if the data-component-name value is invalid', function () {
    assert.throws(
     function () {
       reacterminator({
         type: 'string',
         content: '<div data-component-name=""></div>'
       })
     },
     /does not have a name/
    )
  })

  it('should throw an error if there is no data-component-name', function () {
    assert.throws(
     function () {
       reacterminator({
         type: 'string',
         content: '<div></div>'
       })
     },
     /No components are detected/
    )
  })
})
