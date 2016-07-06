module.exports = function changeTag (node, tagName) {
  node.openingElement.name.name = tagName

  if (node.closingElement) {
    node.closingElement.name.name = tagName
  }
}
