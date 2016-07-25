import React from 'react';
import ListItem from './ListItem';
import CustomRoute from './CustomRoute';
import custom from '../../custom/index';

class Header extends React.Component {
  render() {
    return (
      <header style={{ fontSize: '18' }} className='header'>
        <ListItem></ListItem>
        <ListItem></ListItem>
        <CustomRoute isBoolean firstName={'Poetic'}></CustomRoute> <img src='logo.jpg' />
        <div>
          {firstName}
        </div>
      </header>
      );
  }
}
;

const customize = custom['components/Header'] || ((x) => x);
const HeaderWithCustom = customize(Header);

export default HeaderWithCustom;
