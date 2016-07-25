import React from 'react';
import custom from '../../custom/index';

class ListItem extends React.Component {
  render() {
    return (
      <div className='list-item'>
        Primary
      </div>
      );
  }
}
;

const customize = custom['components/ListItem'] || ((x) => x);
const ListItemWithCustom = customize(ListItem);

export default ListItemWithCustom;
