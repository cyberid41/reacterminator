/* eslint-env mocha */
const assert = require('chai').assert
const reacterminator = require('../../lib/index')

describe('one-component', function () {
  it('should generate one component from one div', function () {
    const content = `\
<div data-component-name="ComponentA">
</div>`

    const ComponentA = `\
import React from 'react';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

export default ComponentA;\n`

    assert.deepEqual(
      reacterminator({type: 'string', content}).ComponentA.formattedFileSnippet,
      ComponentA
    )
  })

  it('should generate one component from an html document', function () {
    const content = `\
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title></title>
  </head>
  <body>
    <div data-component-name="ComponentA">
    </div>
  </body>
</html>`

    const ComponentA = `\
import React from 'react';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

export default ComponentA;\n`

    assert.deepEqual(
      reacterminator({type: 'string', content}).ComponentA.formattedFileSnippet,
      ComponentA
    )
  })
})
