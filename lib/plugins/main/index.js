module.exports = {
  processBeforeAllJsxSnippets: require('./process-before-all-jsx-snippets'),
  processEachJsxSnippet: require('./process-each-jsx-snippet'),
  processEachDeclarationSnippet: require('./process-each-declaration-snippet'),
  processEachImports: require('./process-each-imports'),
  processEachExports: require('./process-each-exports'),
  processEachFormattedSnippet: require('./process-each-formatted-snippet'),
  processAllFormattedSnippets: require('./process-all-formatted-snippets')
}
