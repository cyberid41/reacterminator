/* eslint-env mocha */
const assert = require('chai').assert
const parse = require('../../../../../../lib/helpers/parse')
const processEachJsxSnippet = require('../../../../../../lib/plugins/redux/process-each-jsx-snippet')
const generate = require('babel-generator').default

const defaultComponent = {
  componentName: 'User',
  isPath: 'true',
  plugins: {
    redux: {}
  }
}

describe('lib/plugins/redux/process-each-jsx-snippet', function () {
  it('should add value and onChange to input', function () {
    const ast = parse('<input id="name" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(state, ['state.user.name'])
    assert.deepEqual(action, ['action.user.changeName'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<input id="name" value={this.props[\'state.user.name\']} onChange={this.props[\'action.user.changeName\']} />;'
    )
  })

  it('should add value and onChange to textarea', function () {
    const ast = parse('<textarea id="name" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(state, ['state.user.name'])
    assert.deepEqual(action, ['action.user.changeName'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<textarea id="name" value={this.props[\'state.user.name\']} onChange={this.props[\'action.user.changeName\']} />;'
    )
  })

  it('should add value and onChange to input for email', function () {
    const ast = parse('<input id="email" type="email" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(state, ['state.user.email'])
    assert.deepEqual(action, ['action.user.changeEmail'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<input id="email" type="email" value={this.props[\'state.user.email\']} onChange={this.props[\'action.user.changeEmail\']} />;'
    )
  })

  it('should add onClick to button', function () {
    const ast = parse('<button id="delete" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, ['action.user.clickDelete'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<button id="delete" onClick={this.props[\'action.user.clickDelete\']} />;'
    )
  })

  it('should add onSubmit to form', function () {
    const ast = parse('<form id="add-user" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, ['action.user.submitAddUser'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<form id="add-user" onSubmit={this.props[\'action.user.submitAddUser\']} />;'
    )
  })

  it('should not add any props to a div', function () {
    const ast = parse('<div id="add-user" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, [])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<div id="add-user" />;'
    )
  })

  it('should add onClick to input[type=submit]', function () {
    const ast = parse('<input id="name" type="submit" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, ['action.user.clickName'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<input id="name" type="submit" onClick={this.props[\'action.user.clickName\']} />;'
    )
  })

  it('should add onClick to input[type=button]', function () {
    const ast = parse('<input id="name" type="button" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, ['action.user.clickName'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<input id="name" type="button" onClick={this.props[\'action.user.clickName\']} />;'
    )
  })

  it('should add onChange and checked to input[type=radio]', function () {
    const ast = parse('<input id="name" type="radio" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, ['action.user.changeName'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<input id="name" type="radio" checked={this.props[\'state.user.name\']} onChange={this.props[\'action.user.changeName\']} />;'
    )
  })

  it('should add onChange and checked to input[type=checkbox]', function () {
    const ast = parse('<input id="name" type="checkbox" />')
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, ['action.user.toggleName'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      '<input id="name" type="checkbox" checked={this.props[\'state.user.name\']} onChange={this.props[\'action.user.toggleName\']} />;'
    )
  })

  it('should add onChange and selected to select', function () {
    const ast = parse(`\
<select name="select" id="user">
  <option value="value1">Value 1</option>
  <option value="value2" selected>Value 2</option>
  <option value="value3">Value 3</option>
</select>
`)
    const { plugins: { redux: {state, action} } } = processEachJsxSnippet({
      component: Object.assign({ast}, defaultComponent),
    }).component

    assert.deepEqual(action, ['action.user.selectUser'])
    assert.deepEqual(
      generate(ast, {}, '').code,
      `\
<select name="select" id="user" value={this.props['state.user.user']} onChange={this.props['action.user.selectUser']}>
  <option value="value1">Value 1</option>
  <option value="value2" selected>Value 2</option>
  <option value="value3">Value 3</option>
</select>;`
    )
  })
})
