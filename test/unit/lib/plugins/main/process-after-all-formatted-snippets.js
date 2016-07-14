/* eslint-env mocha */
const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const shell = require('shelljs')
const processAfterAllFormattedSnippets = require('../../../../../lib/plugins/main/process-after-all-formatted-snippets.js')

describe('lib/plugins/main/process-after-all-formatted-snippets', function () {
  beforeEach(function () {
    shell.rm('-rf', './reacterminator')
  })

  it('should generate a file', function () {
    const formattedFileSnippet = `\
import ComponentB from './components/ComponentB.jsx';

class ComponentA extends React.Component {
  render() {
    return <ComponentB></ComponentB>
  }
}

export default ComponentA;`

    const components = {
      ComponentA: {
        componentName: 'ComponentA',
        formattedFileSnippet,
        removedComments: [],
        removedScriptTags: []
      }
    }

    processAfterAllFormattedSnippets({
      components,
      options: {
        generateFiles: true,
        outputPath: path.resolve('./reacterminator')
      }
    })

    assert.deepEqual(
      fs.readFileSync(
        path.resolve('./reacterminator/generated/components/ComponentA.jsx'),
        'utf-8'
      ),
      '/* eslint-disable */\n' + formattedFileSnippet
    )
  })

  it('should report removed codes', function () {
    const formattedFileSnippet = `\
class ComponentA extends React.Component {
  render() {
    return <div></div>
  }
}`

    processAfterAllFormattedSnippets({
      components: {
        ComponentA: {
          componentName: 'ComponentA',
          formattedFileSnippet,
          removedComments: ['<!-- -->'],
          removedScriptTags: ['<script></script>'],
          removedStyleTags: ['<style></style>']
        }
      },
      options: {
        generateFiles: true,
        outputPath: path.resolve('./reacterminator')
      }
    })

    assert.deepEqual(
      fs.readFileSync(
        path.resolve('./reacterminator/generated/components/ComponentA.jsx'),
        'utf-8'
      ),
      '/* eslint-disable */\n' + formattedFileSnippet
    )
  })
})
