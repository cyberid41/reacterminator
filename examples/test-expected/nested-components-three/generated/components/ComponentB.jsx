import React from 'react';
import ComponentC from './ComponentC';
import custom from '../../custom/index';

class ComponentB extends React.Component {
  render() {
    return (
      <div>
        <ComponentC></ComponentC>
      </div>
      );
  }
}
;

const customize = custom['components/ComponentB'] || ((x) => x);
const ComponentBWithCustom = customize(ComponentB, {
  React,
  ComponentC
});

export default ComponentBWithCustom;
