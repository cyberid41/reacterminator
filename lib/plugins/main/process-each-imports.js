module.exports = function processEachImports({ component, components, options }) {
  component.imports = component
    .dependencies
    .map((componentName) => ({
      import: componentName,
      from: `./${componentName}`,
    }));

  component.imports.unshift({ import: 'React', from: 'react' });

  return { component, components, options };
};
