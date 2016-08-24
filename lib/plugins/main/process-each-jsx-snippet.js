// provide ast
const _ = require('lodash');
const cheerio = require('cheerio');
const parse = require('../../helpers/parse');
const traverse = require('../../helpers/traverse-cheerio-node');
const changeTag = require('../../helpers/change-tag');
const upperCamelCase = require('../../helpers/upper-camel-case');
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

function formatDataComponentName($, $root) {
  traverse($root, $, ($node) => {
    const componentName = $node.attr('data-component-name');
    if (componentName) {
      $node.attr('data-component-name', upperCamelCase(componentName));
    }
  });
}

function getDependencies($, $root) {
  const dependencies = [];

  traverse($root, $, ($node) => {
    const componentName = $node.attr('data-component-name');
    if (componentName) {
      if (!_.includes(dependencies, componentName)) {
        dependencies.push(componentName);
      }
      return true;
    }
  });

  return dependencies;
}

function addErrorDivAfterInput($) {
  // TODO: add hooks and move this into redux plugin
  // add error div tag after input for redux
  $('input, select').each((index, element) => {
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
}

function replaceAttrNameForJsx($, $root) {
  traverse($root, $, ($node) => {
    replaceAttrNames($node, REACT_HTML_ATTRIBUTES_TABLE);
    const isSvg = $node.get(0).tagName === 'svg';
    if (isSvg) {
      replaceAttrNames($node, REACT_SVG_ATTRIBUTES_TABLE);
    }
  });
}

module.exports = function processEachJsxSnippet({ component, components, options }) {
  // add plugins
  component.plugins = _.mapValues(options.plugins, () => ({}));

  // parse into cheerio
  const $ = cheerio.load(component.htmlSnippet, {
    normalizeWhitespace: true,
    decodeEntities: false,
  });

  const $root = $.root().children();

  // change data-component-name to upper-camel-case
  formatDataComponentName($, $root);

  // add dependencies
  component.dependencies = getDependencies($, $root);

  // add error div after input
  if (options.addErrorDivAfterInput) {
    addErrorDivAfterInput($, $root);
  }

  // replace attr name for jsx
  replaceAttrNameForJsx($, $root);

  // add ast
  component.ast = parse($.xml());

  // change body to div for path components
  if (component.pathName) {
    changeTag(component.ast.program.body[0].expression, 'div');
  }

  return { component, components, options };
};
