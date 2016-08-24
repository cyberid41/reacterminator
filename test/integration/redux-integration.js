/* eslint-env mocha */
const { checkFiles } = require('../helpers');

describe('integration/redux-integration', () => {
  it('should hook redux into component and generate redux files', () => {
    checkFiles({
      inputPath: './examples/test/redux-example.html',
      outputDir: 'redux-integration',
      outputFiles: [
        'generated/components/ReduxExample.jsx',
        'generated/components/ComponentA.jsx',
        'generated/action-type-constants/redux-example/change-name.js',
        'generated/action-type-constants/redux-example/index.js',
        'generated/action-type-constants/index.js',
        'generated/action-creators/redux-example/change-name.js',
        'generated/action-creators/redux-example/toggle-is-going.js',
        'generated/action-creators/redux-example/index.js',
        'generated/action-creators/index.js',
        'generated/reducers/redux-example/name.js',
        'generated/reducers/redux-example/is-going.js',
        'generated/reducers/redux-example/index.js',
        'generated/reducers/index.js',
        'generated/store.js',
        'custom/index.js',
      ],
      options: {
        addErrorDivAfterInput: true
      }
    });
  });

  it('should not create reducer file for a path if there is no reducers to combile', () => {
    checkFiles({
      inputPath: './examples/test/redux-no-reducers.html',
      outputDir: 'redux-no-reducers',
      outputFiles: [
        'generated/reducers/redux-no-reducers/index.js',
      ]
    })
  });
});
