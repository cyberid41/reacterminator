/* eslint-env mocha */
const { checkFiles } = require('../helpers');

describe('kitchen-sinck', function () {
  it('should show all the features', function () {
    checkFiles({
      inputPath: './examples/test/kitchen-sink.html',
      outputDir: 'kitchen-sink',
      outputFiles: [
        'generated/components/KitchenSink.jsx',
        'generated/components/CustomRoute.jsx',
        'generated/components/Header.jsx',
        'generated/components/ListItem.jsx',
      ],
    })
  })
})
