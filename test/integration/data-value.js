/* eslint-env mocha */
const assert = require('chai').assert
const reacterminator = require('../../lib/index')

describe('data-value', function () {
  it('should replace inner html with data-component-value', function () {
    const content = `\
<div data-component-name="ComponentA">
  <span data-component-value="{this.props.firstName}">Chun</span>
  <span data-component-value="{this.props.lastName}">Yang</span>
</div>`

    const expectedComponentA = `\
import React from 'react';
import custom from '../../custom/index';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.firstName}</span> <span>{this.props.lastName}</span>
      </div>
      );
  }
}
;

const customize = custom['components/ComponentA'] || ((x) => x);
const ComponentAWithCustom = customize(ComponentA, {
  React
});

export default ComponentAWithCustom;
`

    const realComponentA = reacterminator({type: 'string', content: content})
      .ComponentA
      .formattedFileSnippet

    assert.deepEqual(realComponentA, expectedComponentA)
  })
})
