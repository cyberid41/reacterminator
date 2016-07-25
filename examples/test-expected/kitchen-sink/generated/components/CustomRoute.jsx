import React from 'react';
import custom from '../../custom/index';

class CustomRoute extends React.Component {
  render() {
    return (
      <Route>
        I am a &nbsp route
      </Route>
      );
  }
}
;

const customize = custom['components/CustomRoute'] || ((x) => x);
const CustomRouteWithCustom = customize(CustomRoute);

export default CustomRouteWithCustom;
