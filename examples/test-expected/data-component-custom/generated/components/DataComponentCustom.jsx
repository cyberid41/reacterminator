import React from 'react';
import Login from './Login';
import custom from '../../custom/index';

class DataComponentCustom extends React.Component {
  render() {
    return (
      <div>
        <Login></Login>
      </div>
      );
  }
}
;

const customize = custom['components/DataComponentCustom'] || ((x) => x);
const DataComponentCustomWithCustom = customize(DataComponentCustom, {
  React,
  Login
});

export default DataComponentCustomWithCustom;
