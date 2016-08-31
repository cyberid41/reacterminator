import React from 'react';

export default (Base) => {
  class Unicorn extends React.Component {
    render () {
      return <Base/>
    }
  }

  return Unicorn;
};
