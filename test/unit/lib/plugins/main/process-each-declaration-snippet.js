/* eslint-env mocha */
const assert = require('chai').assert
const addDeclaration = require('../../../../../lib/plugins/main/process-each-declaration-snippet')

describe('add-declaration', function () {
  it('should add declaration', function () {
    const component = {
      componentName: 'ComponentA',
      jsxSnippet: '<div></div>'
    }

    assert.deepEqual(
      addDeclaration({component}).component.declarationSnippet,
      `\
class ComponentA extends React.Component {
  render() {
    return (
      <div></div>
      );
  }
};\n`
    )
  })
})
