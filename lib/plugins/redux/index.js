const processEachImports = require('./process-each-imports');
const processEachExports = require('./process-each-exports');
const processEachJsxSnippet = require('./process-each-jsx-snippet');
const processAfterAllJsxSnippets = require('./process-after-all-jsx-snippets');
const processAfterAllImports = require('./process-after-all-imports');
const processAfterAllFormattedSnippets = require('./process-after-all-formatted-snippets');

module.exports = {
  processEachImports,
  processEachExports,
  processEachJsxSnippet,
  processAfterAllJsxSnippets,
  processAfterAllImports,
  processAfterAllFormattedSnippets,
};
