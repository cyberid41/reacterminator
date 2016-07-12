const Console = require('console');
const chalk = require('chalk');
const esformatter = require('esformatter');
esformatter.register(require('esformatter-jsx'));
esformatter.register(require('esformatter-quotes'));
esformatter.register(require('esformatter-eol-last'));
// NOTE: this plugin cause problem for jsx, it adds extra semicolon
// <div onClick={() => {};}></div>
// esformatter.register(require('esformatter-semicolons'))

module.exports = function formatFileSnippet(snippet) {
  const formatOptions = {
    jsx: {
      formatJSX: true,
      attrsOnSameLineAsTag: false, // move each attribute to its own line
      maxAttrsOnTag: 3, // if lower or equal than 3 attributes, they will be kept on a single line
      firstAttributeOnSameLine: true, // keep the first attribute in the same line as the tag
      alignWithFirstAttribute: false, // do not align attributes with the first tag
      spaceInJSXExpressionContainers: '',
    },
    quotes: {
      type: 'single',
      avoidEscape: false,
    },
  };

  try {
    return esformatter.format(snippet, formatOptions);
  } catch (e) {
    Console.log(
      `\nOpsssss! The following snippet has ${chalk.bold.red('SYNTAX')} errors:`
    );
    Console.log('---------------------------------');
    Console.log(snippet);
    Console.log('---------------------------------');
    throw e;
  }
};
