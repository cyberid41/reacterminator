module.exports = function processEachImports({ component, components, options }) {
  component.imports.push({ import: 'custom', from: '../../custom/index' });

  return { component, components, options };
};
