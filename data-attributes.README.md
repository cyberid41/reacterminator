# DATA ATTRIBUTES

- data-component-name

  This attribute tells reacterminator that the html is a react component.

- data-component-props

  FROM:
  ```
  <div data-component-name="ComponentA" data-component-props="isBoolean lastName={'Poetic'}"/>
  ```

  TO:
  ```
  <ComponentA isBoolean lastName={'Poetic'}/>
  ```

- data-component-primary

  FROM:
  ```
  <div data-component-name="Unicorn"/>
  <div data-component-name="Unicorn" data-component-primary="true" class="primary" />
  ```

  TO:
  ```
  <div className="primary" />
  ```

- data-component-wrapper

  FROM:
  ```
  <div data-component-wrapper="ComponentA"/>
  ```

  TO:
  `<ComonentA/>`

- data-component-imports

  FROM:
  ```
  <div data-component-imports="import {Router} from 'react-router'; import _ from 'lodash';"/>
  ```

  TO:
  ```
  import {Router} from 'react-router';
  import _ from 'lodash';
  ```

- data-component-value

  FROM:
  ```
  <div data-component-value="{firstName}">Poetic</div>
  ```

  TO:
  ```
  <div>{firstName}</div>
  ```

- data-component-path

  FROM:
  ```
  <div
    data-component-name="Login"
    data-component-path="login">
  </div>
  ```

  TO:
  ```
  // App.jsx
  import React from 'react';
  import LoginContainer from './LoginContainer';

  export default class App extends React.Component {
    render () {
      return (
        <div>
          <LoginContainer/>
        </div>
      )
    }
  }
  ```

- data-component-custom

  FROM:
  ```
  // data-component-custom.html
  <html>
  <body>
    <div data-component-name="Login" data-component-custom="true">
      <form>
        <input type="text" id="user" />
      </form>
    </div>
  </body>
  </html>
  ```

  TO:
  ```
  // DataComponentCustom.jsx
  import React from 'react';

  export default class DataComponentCustom extends React.Component {
    render () {
      return <div><Login/></div>;
    }
  }
  ```
