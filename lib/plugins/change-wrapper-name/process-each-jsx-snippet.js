const traverse = require('babel-traverse').default;
const getAttr = require('../../helpers/get-attr');
const changeTag = require('../../helpers/change-tag');

module.exports = function processEachJsxSnippet({ component, components, options }) {
  // NOTE: we preserve the function the traverse is for optimazation porpose in the future
  const root = component.ast.program.body[0].expression;

  traverse(component.ast, {
    JSXElement({ node }) {
      const wrapper = getAttr({
        node,
        name: 'data-component-wrapper',
        isDelete: true,
      });

      if (wrapper && node === root) {
        changeTag(node, wrapper);
      }
    },
  });

  return { component, components, options };
};
