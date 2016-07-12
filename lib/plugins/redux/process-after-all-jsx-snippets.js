module.exports = function processAfterAllJsxSnippets({ components, options }) {
  // wrap App jsx in Provider
  if (!components.App) {
    return { components, options };
  }

  components.App.jsxSnippet = `<Provider store={store}>${components.App.jsxSnippet}</Provider>`;

  return { components, options };
};
