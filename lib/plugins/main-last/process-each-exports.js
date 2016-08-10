const _ = require('lodash');

// NOTE: we are manually parsing the imports, probably not a good idea
function extractDependencyFromImport(importString) {
  if (importString[0] !== '{') {
    return importString;
  }

  return _.last(importString.replace(/[{}]/g, '').split(' ').filter(Boolean));
}

module.exports = function processEachExports({ component, components, options }) {
  const suffix = 'WithCustom';

  const oldName = component.exports.map(e => e.suffix).join('');
  const newName = oldName + suffix;

  const dependenciesString = component
    .imports
    .map(e => extractDependencyFromImport(e.import))
    .filter(dependencyString => dependencyString !== 'custom')
    .join(', ');

  const snippet = `\
const customize = custom['components/${component.componentName}'] || ((x) => x);
const ${newName} = customize(${oldName}, { ${dependenciesString} });
`;

  component.exports.push({ suffix, snippet });

  return { component, components, options };
};
