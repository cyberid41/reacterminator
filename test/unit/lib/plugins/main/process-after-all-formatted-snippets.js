/* eslint-env mocha */
const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const shell = require('shelljs')
const processAfterAllFormattedSnippets = require('../../../../../lib/plugins/main/process-after-all-formatted-snippets.js')

function checkFileContent (file, content) {
  assert.deepEqual(
    fs.readFileSync(file, 'utf-8'),
    content
  );
}

function matchFiles (actual, expected) {
  assert.deepEqual(
    fs.readFileSync(actual, 'utf-8'),
    fs.readFileSync(expected, 'utf-8')
  );
}

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

    checkFileContent(
      path.resolve('./reacterminator/generated/components/ComponentA.jsx'),
      formattedFileSnippet
    )

    matchFiles(
      path.resolve('./reacterminator/custom/index.js'),
      path.resolve(__dirname, '../../../../../lib/plugins/main/templates/custom/index.js')
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

    checkFileContent(
      path.resolve('./reacterminator/generated/components/ComponentA.jsx'),
      formattedFileSnippet
    )
  })
})
