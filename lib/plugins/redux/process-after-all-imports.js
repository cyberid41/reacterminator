module.exports = function processAfterAllImports({ components, options }) {
  // add imports for App component
  if (!components.App) {
    return { components, options };
  }

  components.App.imports.push({ import: '{ Provider }', from: 'react-redux' });
  components.App.imports.push({ import: 'store', from: '../store' });

  return { components, options };
};
