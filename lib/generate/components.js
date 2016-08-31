module.exports = function components({ name }) {
  return `\
import React from 'react';

export default (Base) => {
  class ${name} extends React.Component {
    render () {
      return <Base/>
    }
  }

  return ${name};
};
`;
};
