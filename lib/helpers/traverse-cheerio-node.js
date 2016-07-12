module.exports = function traverse(node, $, callback) {
  if (callback(node)) {
    return;
  }

  node.children().each((index, child) => {
    traverse($(child), $, callback);
  });
};
