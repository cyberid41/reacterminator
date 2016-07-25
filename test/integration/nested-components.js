/* eslint-env mocha */
const { checkFiles } = require('../helpers');

describe('nested-components', function () {
  it('should generate two nested components', function () {
    checkFiles({
      inputPath: './examples/test/nested-components-two.html',
      outputDir: 'nested-components-two',
      outputFiles: [
        'generated/components/ComponentA.jsx',
        'generated/components/ComponentB.jsx',
      ],
    });
  })

  it('should generate three nested components', function () {
    checkFiles({
      inputPath: './examples/test/nested-components-three.html',
      outputDir: 'nested-components-three',
      outputFiles: [
        'generated/components/ComponentA.jsx',
        'generated/components/ComponentB.jsx',
        'generated/components/ComponentC.jsx',
      ],
    });
  })
})
