/* eslint-env mocha */
const { assert } = require('chai')
const reacterminator = require('../../lib/index')

describe('kitchen-sinck', function () {
  it('should show all the functions', function () {
    const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body data-component-name="KitchenSink">
  <header
    class="header"
    data-component-name="Header"
    style="font-size: 18">
    <div class="list-item" data-component-name="ListItem">Not Primary</div>
    <div class="list-item"
      data-component-name="ListItem"
      data-component-primary="true">
      Primary
    </div>
    <div
      data-component-props="isBoolean firstName={'Poetic'}"
      data-component-name="CustomRoute"
      data-component-imports="import {Route} from 'react-router'"
      data-component-wrapper="Route">
      I am a &nbsp route
    </div>
    <img src="logo.jpg">
    <div data-component-value="{firstName}">Poetic</div>
    <script type="text/javascript" src="js/webflow.js"></script>
  </header>
</body>
`

    const expectedHeader = `\
import React from 'react';
import ListItem from './ListItem';
import CustomRoute from './CustomRoute';

class Header extends React.Component {
  render() {
    return (
      <header style={{  fontSize: '18'}} className="header">
        <ListItem></ListItem>
        <ListItem></ListItem>
        <CustomRoute isBoolean firstName={'Poetic'}></CustomRoute> <img src="logo.jpg" />
        <div>
          {firstName}
        </div>
      </header>
      );
  }
}
;

export default Header;\n`

    const expectedListItem = `\
import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <div className="list-item">
        Primary
      </div>
      );
  }
}
;

export default ListItem;\n`

    const expectedCustomRoute = `\
import React from 'react';

class CustomRoute extends React.Component {
  render() {
    return (
      <Route data-component-imports="import {Route} from 'react-router'">
        I am a &nbsp route
      </Route>
      );
  }
}
;

export default CustomRoute;\n`

    const components = reacterminator({type: 'string', content: content})

    assert.deepEqual(components.Header.formattedFileSnippet, expectedHeader)
    assert.deepEqual(components.ListItem.formattedFileSnippet, expectedListItem)
    assert.deepEqual(components.CustomRoute.formattedFileSnippet, expectedCustomRoute)

    assert.deepEqual(components.Header.removedScriptTags, [
      '<script type="text/javascript" src="js/webflow.js"></script>'
    ])
  })
})
