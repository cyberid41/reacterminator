/* eslint-env mocha */
var assert = require('chai').assert
var reacterminator = require('../../lib/index')
var _ = require('lodash')

describe('data-primary', function () {
  it('should use the primary component', function () {
    var content = `\
<div data-component-name="ComponentA">Not Primary</div>
<div data-component-name="ComponentA" data-component-primary="true">Primary</div>
<div data-component-name="ComponentA">Not Primaty Either</div>`

    var ComponentAExpected = `\
import React from 'react';
import custom from '../../custom/index';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        Primary
      </div>
      );
  }
}
;

const customize = custom['components/ComponentA'] || ((x) => x);
const ComponentAWithCustom = customize(ComponentA);

export default ComponentAWithCustom;
`

    var components = reacterminator({type: 'string', content: content})
    var ComponentAActual = _.find(components, {componentName: 'ComponentA'})
      .formattedFileSnippet

    assert.deepEqual(ComponentAActual, ComponentAExpected)
  })
})
