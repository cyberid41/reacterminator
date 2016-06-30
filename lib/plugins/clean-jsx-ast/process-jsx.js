const generate = require('babel-generator').default

module.exports = function processJsx ({component, components, options}) {
  // remove semicolon at the end of line, otherwise the syntax is wrong
  // NOTE: the third argument of the generate function should be the code
  // however we should NOT use the previous code to generate the new code,
  // and an empty string is enough to remove the error message.
  // So we put an empty string there.
  component.jsxSnippet = generate(
    component.ast,
    {
      retainLines: false,
      comments: false,
      sourceMaps: false
    },
    ''
  ).code.replace(/;$/, '')

  // ast is only a temperory property,
  // we remove it so that the final return value is readable
  delete component.ast

  return {component, components, options}
}
