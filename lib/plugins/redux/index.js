module.exports = {
  processEachImports: require('./process-each-imports'),
  processEachExports: require('./process-each-exports'),
  processEachJsxSnippet: require('./process-each-jsx-snippet'),
  processAfterAllJsxSnippets: require('./process-after-all-jsx-snippets'),
  processAfterAllImports: require('./process-after-all-imports'),
  processAfterAllFormattedSnippets: require('./process-after-all-formatted-snippets')
}
