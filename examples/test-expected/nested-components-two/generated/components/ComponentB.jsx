import React from 'react';
import custom from '../../custom/index';

class ComponentB extends React.Component {
  render() {
    return (
      <div>
      </div>
      );
  }
}
;

const customize = custom['components/ComponentB'] || ((x) => x);
const ComponentBWithCustom = customize(ComponentB);

export default ComponentBWithCustom;
