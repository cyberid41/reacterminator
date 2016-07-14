/* eslint-env mocha */
const fs = require('fs');
const shell = require('shelljs');
const assert = require('chai').assert;
const reacterminator = require('../../lib/index');

function checkFile(filePath) {
  assert.deepEqual(
    fs.readFileSync(`./reacterminator/${filePath}`, 'utf8'),
    fs.readFileSync(`./examples/test-expected/redux-integration/${filePath}`, 'utf8')
  );
}

function processFile(filePath) {
  reacterminator(
    {
      type: 'path',
      content: filePath,
    },
    {
      fileToComponent: true,
      generateFiles: true,
    }
  );
}

describe('redux-integration', () => {
  beforeEach(() => {
    shell.rm('-rf', './reacterminator');
  });

  it('should hook redux into component and generate redux files', () => {
    processFile('./examples/test/redux-example.html');

    const filePaths = [
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
    ];

    filePaths.forEach(checkFile);
  });

  it('should not create reducer file for a path if there is no reducers to combile', () => {
    processFile('./examples/test/redux-no-reducers.html');

    checkFile('generated/reducers/redux-no-reducers/index.js');
  });
});
