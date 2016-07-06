/* eslint-env mocha */
const assert = require('chai').assert
const reacterminator = require('../../lib/index')

describe('nested-components', function () {
  it('should generate two nested components', function () {
    const content = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB">
  </div>
</div>`

    const ComponentA = `\
import React from 'react';
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <ComponentB></ComponentB>
      </div>
      );
  }
}
;

export default ComponentA;\n`

    const ComponentB = `\
import React from 'react';

class ComponentB extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

export default ComponentB;\n`

    const components = reacterminator({type: 'string', content})

    assert.deepEqual(components.ComponentA.formattedFileSnippet, ComponentA)
    assert.deepEqual(components.ComponentB.formattedFileSnippet, ComponentB)
  })

  it('should generate three nested components', function () {
    const content = `\
<div data-component-name="ComponentA">
  <div data-component-name="ComponentB">
    <div data-component-name="ComponentC">
    </div>
  </div>
</div>`

    const ComponentA = `\
import React from 'react';
import ComponentB from './ComponentB';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <ComponentB></ComponentB>
      </div>
      );
  }
}
;

export default ComponentA;\n`

    const ComponentB = `\
import React from 'react';
import ComponentC from './ComponentC';

class ComponentB extends React.Component {
  render() {
    return (
      <div>
        <ComponentC></ComponentC>
      </div>
      );
  }
}
;

export default ComponentB;\n`

    const ComponentC = `\
import React from 'react';

class ComponentC extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

export default ComponentC;\n`

    const components = reacterminator({type: 'string', content})

    assert.deepEqual(components.ComponentA.formattedFileSnippet, ComponentA)
    assert.deepEqual(components.ComponentB.formattedFileSnippet, ComponentB)
    assert.deepEqual(components.ComponentC.formattedFileSnippet, ComponentC)
  })
})
