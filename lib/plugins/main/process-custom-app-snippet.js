module.exports = function processCustomAppSnippet(
  { componentName, dependencies }
) {
  const dependenciesSnippet = dependencies
    .map(dependecy => `    ${dependecy},`)
    .join('\n');

  return `\
let CustomApp = ${componentName};

if (custom['components/${componentName}']) {
  CustomApp = custom['components/${componentName}'](${componentName}, {
    ${dependenciesSnippet}
  });
}`;
};
