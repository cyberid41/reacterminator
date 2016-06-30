module.exports = Attr

var _ = require('lodash')

function Attr ($node) {
  this.$node = $node
}

Attr.ATTR_NAMES_TO_DATA_NAMES = {
  name: 'data-component-name',
  primary: 'data-component-primary',
  imports: 'data-component-imports',
  path: 'data-component-path'
}
Attr.DATA_NAMES_TO_ATTR_NAMES = _.invert(Attr.ATTR_NAMES_TO_DATA_NAMES)
Attr.DATA_NAMES = _.keys(Attr.DATA_NAMES_TO_ATTR_NAMES)

Attr.prototype.extract = function () {
  var $node = this.$node

  // get all attributes
  var attributes = Attr.DATA_NAMES.reduce(function (attrs, dataName) {
    var dataValue = _.trim($node.attr(dataName))
    if (dataValue) {
      const attributeName = dataName === 'data-component-name'
        ? 'componentName'
        : Attr.DATA_NAMES_TO_ATTR_NAMES[dataName]
      attrs[attributeName] = dataValue
    }

    return attrs
  }, {})

  // remove all attributes from the $node
  Attr.DATA_NAMES.forEach(function (dataName) {
    $node.removeAttr(dataName)
  })

  return attributes
}
