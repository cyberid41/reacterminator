/* eslint-env mocha */
const assert = require('chai').assert;
const reacterminator = require('../../lib/index');
const { checkFiles } = require('../helpers');

describe('data-component-custom', function () {
  it('should create an empty custom component', function () {
    checkFiles({
      inputPath: './examples/test/data-component-custom.html',
      outputDir: 'data-component-custom',
      outputFiles: [
        'generated/components/DataComponentCustom.jsx',
      ]
    });
  });
});
