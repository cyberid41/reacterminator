const processBeforeAllJsxSnippets = require('./process-before-all-jsx-snippets');
const processEachJsxSnippet = require('./process-each-jsx-snippet');
const processEachDeclarationSnippet = require('./process-each-declaration-snippet');
const processEachImports = require('./process-each-imports');
const processEachExports = require('./process-each-exports');
const processEachFormattedSnippet = require('./process-each-formatted-snippet');
const processAfterAllFormattedSnippets = require('./process-after-all-formatted-snippets');

module.exports = {
  processBeforeAllJsxSnippets,
  processEachJsxSnippet,
  processEachDeclarationSnippet,
  processEachImports,
  processEachExports,
  processEachFormattedSnippet,
  processAfterAllFormattedSnippets,
};
