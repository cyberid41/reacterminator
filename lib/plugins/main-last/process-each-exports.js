module.exports = function processEachExports({ component, components, options }) {
  const suffix = 'WithCustom';

  const oldName = component.exports.map((e) => e.suffix).join('');
  const newName = oldName + suffix;
  const snippet = `\
const customize = custom['components/${component.componentName}'] || ((x) => x);
const ${newName} = customize(${oldName});
`;

  component.exports.push({ suffix, snippet });

  return { component, components, options };
};
