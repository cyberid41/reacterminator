const processEachJsxSnippet = require('./process-each-jsx-snippet');
const processAfterAllJsxSnippets = require('./process-after-all-jsx-snippets');
const processEachImports = require('./process-each-imports');
const processAfterAllImports = require('./process-after-all-imports');
const processEachExports = require('./process-each-exports');
const processAfterAllFormattedSnippets = require('./process-after-all-formatted-snippets');

module.exports = {
  processEachJsxSnippet,
  processAfterAllJsxSnippets,
  processEachImports,
  processAfterAllImports,
  processEachExports,
  processAfterAllFormattedSnippets,
};
