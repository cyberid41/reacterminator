module.exports = function components({ name }) {
  return `\
export default (Base) => {
  class ${name} extends Base {
    componentWillMount() {

    }
  }

  return ${name};
};
`;
};
