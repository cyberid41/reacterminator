import React from 'react';
import custom from '../../custom/index';

class ComponentC extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

const customize = custom['components/ComponentC'] || ((x) => x);
const ComponentCWithCustom = customize(ComponentC, {
  React
});

export default ComponentCWithCustom;
