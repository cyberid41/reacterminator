module.exports = function propByKey(key) {
  return `{this.props['${key}']}`;
};
