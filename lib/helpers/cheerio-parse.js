const cheerio = require('cheerio');

module.exports = function cheerioParse(string) {
  return cheerio.load(string, {
    normalizeWhitespace: true,
    decodeEntities: false,
  });
};
