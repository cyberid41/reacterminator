// provide ast
const _ = require('lodash');
const cheerio = require('cheerio');
const parse = require('../../helpers/parse');
const traverse = require('../../helpers/traverse-cheerio-node');
const changeTag = require('../../helpers/change-tag');
const REACT_HTML_ATTRIBUTES_TABLE = require('./react-html-attributes-table.json');
const REACT_SVG_ATTRIBUTES_TABLE = require('./react-svg-attributes-table.json');

function replaceAttrName($node, oldAttr, newAttr) {
  // add new attribute
  const attrValue = $node.attr(oldAttr);
  if (attrValue && newAttr) {
    $node.attr(newAttr, attrValue);
  }

  // remove previous attribute
  $node.removeAttr(oldAttr);
}

function replaceAttrNames($node, TABLE) {
  const attributesToChange = _.intersection(_.keys(TABLE), _.keys($node.attr()));
  attributesToChange.forEach((oldAttr) => replaceAttrName($node, oldAttr, TABLE[oldAttr]));
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
  traverse($root, $, ($node) => {
    replaceAttrNames($node, REACT_HTML_ATTRIBUTES_TABLE);
    const isSvg = $node.get(0).tagName === 'svg';
    if (isSvg) {
      replaceAttrNames($node, REACT_SVG_ATTRIBUTES_TABLE);
    }
  });

  // TODO: add hooks and move this into redux plugin
  // add error div tag after input for redux
  $('input[type=text], select').each((index, element) => {
    const $element = $(element);
    const id = $element.attr('id');

    if (!id) {
      return;
    }

    const errorElement = `\
<div class="error-explanation" data-component-redux-error-explanation="${id}-error">
</div>`;

    $element.after($(errorElement));
  });

  // add ast
  component.ast = parse($.xml());

  // change body to div for path components
  if (component.pathName) {
    changeTag(component.ast.program.body[0].expression, 'div');
  }

  return { component, components, options };
};
