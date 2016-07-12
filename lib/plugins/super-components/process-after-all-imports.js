module.exports = function processAfterAllImports({ components, options }) {
  // add imports for app component
  const component = components.App;

  if (!component) {
    return { components, options };
  }

  component.imports.push({
    import: '{ Stack }',
    from: 'react-super-components',
  });

  return { components, options };
};
