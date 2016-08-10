/* eslint-env mocha */
const { checkFiles } = require('../helpers');

describe('single-component', function () {
  it('should generate one component from an html document', function () {
    checkFiles({
      inputPath: './examples/test/single-component.html',
      outputDir: 'single-component',
      outputFiles: [
        'generated/components/ComponentA.jsx',
      ],
    });
  })
})
