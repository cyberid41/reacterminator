// provide ast
const _ = require('lodash');
const cheerio = require('cheerio');
const parse = require('../../helpers/parse');
const traverse = require('../../helpers/traverse-cheerio-node');
const changeTag = require('../../helpers/change-tag');

function replaceAttrName($node, oldAttr, newAttr) {
  const attrValue = $node.attr(oldAttr);

  $node.removeAttr(oldAttr);

  if (attrValue) {
    $node.attr(newAttr, attrValue);
  }
}

module.exports = function processEachJsxSnippet({ component, components, options }) {
  // add plugins
  component.plugins = _.mapValues(options.plugins, () => ({}));

  // parse into cheerio
  const $ = cheerio.load(component.htmlSnippet, {
    normalizeWhitespace: true,
    decodeEntities: false,
  });

  // add dependencies
  component.dependencies = [];

  const $root = $.root().children();

  traverse($root, $, ($node) => {
    const componentName = $node.data('component-name');
    if (componentName) {
      component.dependencies = _.union(component.dependencies, [componentName]);
      return true;
    }
  });

  // replace attr name for jsx
  // TODO: convert all attribute to camelCase,
  // and treat special cases,
  // remove some, (xml)
  // change some (className)
  traverse($root, $, ($node) => {
    replaceAttrName($node, 'class', 'className');
    replaceAttrName($node, 'for', 'htmlFor');
  });

  // add ast
  component.ast = parse($.xml());

  // change body to div for path components
  if (component.pathName) {
    changeTag(component.ast.program.body[0].expression, 'div');
  }

  return { component, components, options };
};
