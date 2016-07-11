const _ = require('lodash');
const traverse = require('babel-traverse').default;
const assignProps = require('../../helpers/assign-props');
const changeTag = require('../../helpers/change-tag');

function isAbsoluteHref(href) {
  return /^https?:\/\//i.test(href) ||
    /^#/.test(href) ||
    /^mailto:/.test(href) ||
    /^tel:/.test(href);
}

function isBack(href) {
  return href === '#back';
}

// TODO: move this to param-store plugin
module.exports = function processEachJsxSnippet({ component, components, options }) {
  if (!_.get(options, 'changeLinksForParamStore')) {
    return { component, components, options };
  }

  traverse(component.ast, {
    JSXElement(nodePath) {
      const node = nodePath.node;

      const isAnchorTag = _.get(node, 'openingElement.name.name') === 'a';

      if (!isAnchorTag) return;

      const props = node.openingElement.attributes;

      const hasOnClick = _.find(
        props,
        {
          type: 'JSXAttribute',
          name: { name: 'onClick' },
        }
      );

      if (hasOnClick) return;

      const hrefNode = _.find(
        props,
        {
          type: 'JSXAttribute',
          name: { name: 'href' },
        }
      );

      if (!hrefNode) return;

      const href = hrefNode.value.value;

      if (isBack(href)) {
        assignProps({
          node,
          props: { onClick: '{(e) => { e.preventDefault(); window.history.back(); } }' },
        });
        return;
      }

      if (isAbsoluteHref(href)) return;

      // change tag to Link
      changeTag(node, 'Link');

      // add params prop
      const hrefWithoutDotHtml = href.replace(/\.html$/i, '');
      assignProps({
        node,
        props: { params: `{{ path: '${hrefWithoutDotHtml}' }}` },
      });

      component.plugins['super-components'].needParamStore = true;
    },
  });

  return { component, components, options };
};
