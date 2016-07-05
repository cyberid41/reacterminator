/* eslint-env mocha */
const assert = require('chai').assert
const formatFileSnippet = require('../../../../../lib/plugins/main/format-file-snippet')

describe('format-file-snippet', function () {
  it('should format nested tags', function () {
    const snippet = `\
class ComponentA extends React.Component {
  render() {
    return (
      <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>
    );
  }
}

export default ComponentA;\n`

    assert.deepEqual(
      formatFileSnippet(snippet),
      `\
class ComponentA extends React.Component {
  render() {
    return (
      <ul>
        <li>
          Item 1
        </li>
        <li>
          Item 2
        </li>
        <li>
          Item 3
        </li>
        <li>
          Item 4
        </li>
        <li>
          Item 5
        </li>
      </ul>
      );
  }
}

export default ComponentA;\n`
    )
  })

  it('shouls throw an error when syntax is invalid', function () {
    assert.throw(
      function () {
        formatFileSnippet('div></div>')
      },
      /Unexpected token/i
    )
  })
})
