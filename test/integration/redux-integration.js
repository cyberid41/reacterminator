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
  beforeEach(function () {
    shell.rm('-rf', './reacterminator');
  });

  it('should hook redux into component and generate redux files', () => {
    processFile('./examples/test/redux-example.html');

    const filePaths = [
      'components/ReduxExample.jsx',
      'components/ComponentA.jsx',
      'store.js',
      'action-type-constants/redux-example/change-name.js',
      'action-type-constants/redux-example/index.js',
      'action-type-constants/index.js',
      'action-creators/redux-example/change-name.js',
      'action-creators/redux-example/toggle-is-going.js',
      'action-creators/redux-example/index.js',
      'action-creators/index.js',
      'reducers/redux-example/name.js',
      'reducers/redux-example/is-going.js',
      'reducers/redux-example/index.js',
      'reducers/index.js',
    ];

    filePaths.forEach(checkFile);
  });

  it('should not create reducer file for a path if there is no reducers to combile', () => {
    processFile('./examples/test/redux-no-reducers.html');

    checkFile('reducers/redux-no-reducers/index.js');
  });
});
