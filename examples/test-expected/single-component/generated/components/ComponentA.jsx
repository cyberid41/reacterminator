import React from 'react';
import custom from '../../custom/index';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

const customize = custom['components/ComponentA'] || ((x) => x);
const ComponentAWithCustom = customize(ComponentA, {
  React
});

export default ComponentAWithCustom;
