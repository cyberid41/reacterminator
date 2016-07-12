const traverse = require('babel-traverse').default;
const parse = require('../../helpers/parse');
const getAttr = require('../../helpers/get-attr');
const transplant = require('../../helpers/transplant');

module.exports = function processEachJsxSnippet({ component, components, options }) {
  traverse(component.ast, {
    JSXElement({ node }) {
      const value = getAttr({ node, name: 'data-component-value', isDelete: true });
      if (!value) {
        return;
      }

      const divWithSameValueAst = parse(`<div>${value}</div>`);

      transplant(node, divWithSameValueAst, 'children');
    },
  });

  return { component, components, options };
};
