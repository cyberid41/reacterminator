const _ = require('lodash');
const traverse = require('babel-traverse').default;
const parse = require('../../helpers/parse');
const upperCamelCase = require('../../helpers/upper-camel-case');

function formatStyleName(hyphenated) {
  const capitalizeFirst = hyphenated[0] === '-';
  return capitalizeFirst ? upperCamelCase(hyphenated) : _.camelCase(hyphenated);
}

function formatStyle(style) {
  if (!_.trim(style)) {
    return '';
  }

  const formattedStyle = _(style.split(';'))
    .map(_.trim)
    .filter()
    .map((styleItem) => {
      const styleItemArray = styleItem.split(':').map(_.trim);
      const styleItemName = formatStyleName(styleItemArray[0]);
      const styleItemValue = styleItemArray[1];
      return `${styleItemName}: '${styleItemValue}'`;
    })
    .value()
    .join(', ');

  return formattedStyle;
}

module.exports = function processEachJsxSnippet({ component, components, options }) {
  const { ast } = component;

  traverse(ast, {
    JSXElement(nodePath) {
      const attributes = nodePath.node.openingElement.attributes;

      const styleAttributeIndex = _.findIndex(
        attributes,
        (attribute) => _.get(attribute, 'name.name') === 'style'
      );

      if (styleAttributeIndex === -1) {
        return;
      }

      // string
      const styleAttributeValue = formatStyle(
        attributes[styleAttributeIndex].value.value
      );
      const divWithSameStyleString =
        `<div style={{ ${styleAttributeValue} }}></div>`;

      // ast
      const divWithSameStyleAst = parse(divWithSameStyleString);
      const formattedStyleAttribute = divWithSameStyleAst
        .program
        .body[0]
        .expression
        .openingElement
        .attributes[0];

      attributes[styleAttributeIndex] = formattedStyleAttribute;
    },
  });

  return { component, components, options };
};
