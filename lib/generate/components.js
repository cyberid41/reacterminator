const fs = require('fs');

module.exports = function components({ name }) {
  return  `\
export default (Base) => {
  class ${name} extends Base {
    compoenntWillMount() {

    }
  }

  return ${name};
};
`;
};
