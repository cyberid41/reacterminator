import React from 'react';
import ComponentB from './ComponentB';
import custom from '../../custom/index';

class ComponentA extends React.Component {
  render() {
    return (
      <div>
        <ComponentB></ComponentB>
      </div>
      );
  }
}
;

const customize = custom['components/ComponentA'] || ((x) => x);
const ComponentAWithCustom = customize(ComponentA, {
  React,
  ComponentB
});

export default ComponentAWithCustom;
