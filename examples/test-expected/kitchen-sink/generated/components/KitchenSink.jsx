import React from 'react';
import Header from './Header';
import custom from '../../custom/index';

class KitchenSink extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
      </div>
      );
  }
}
;

const customize = custom['components/KitchenSink'] || ((x) => x);
const KitchenSinkWithCustom = customize(KitchenSink, {
  React,
  Header
});

export default KitchenSinkWithCustom;
