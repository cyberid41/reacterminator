module.exports = Attr

const _ = require('lodash')

function Attr ($node) {
  this.$node = $node
}

const DATA_NAMES_TO_ATTR_NAMES = {
  'data-component-name': 'componentName',
  'data-component-primary': 'primary',
  'data-component-path': 'pathName'
}

const DATA_NAMES = _.keys(DATA_NAMES_TO_ATTR_NAMES)

Attr.prototype.extract = function () {
  const $node = this.$node

  // get all attributes
  return DATA_NAMES.reduce(function (attrs, dataName) {
    // get and remove data-component-xxx
    const dataValue = _.trim($node.attr(dataName))
    $node.removeAttr(dataName)

    // put it into attributes
    if (dataValue) {
      attrs[DATA_NAMES_TO_ATTR_NAMES[dataName]] = dataValue
    }

    return attrs
  }, {})
}
