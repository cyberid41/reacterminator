# reacterminator

<p align="center">
  <img src="https://raw.githubusercontent.com/poetic/reacterminator/develop/reacterminator.jpg" width="300px"/>
</p>

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![semantic-release][semantic-release-image]][semantic-release-url]
[![coverall][coverall-image]][coverall-url]

[travis-image]:            https://img.shields.io/travis/poetic/reacterminator.svg?branch=master
[travis-url]:              https://travis-ci.org/poetic/reacterminator
[npm-image]:               https://img.shields.io/npm/v/reacterminator.svg
[npm-url]:                 https://npmjs.org/package/reacterminator
[semantic-release-image]:  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:    https://github.com/semantic-release/semantic-release
[coverall-image]:          https://img.shields.io/coveralls/poetic/reacterminator.svg
[coverall-url]:            https://coveralls.io/github/poetic/reacterminator

## Node >= 6.0.0

## Usage

### How to use reacterminator?
reacterminator converts html into es6 react components.

To use, you need to annotate your html tags with several simple
[data attributes](data-attributes.README.md) that reacterminator recognizes.

For example, you can add a `data-component-name` attribute to your html to let
reacterminator know that it is a react component:
```
// file: example.html
<body>
  <div data-component-name="Unicorn"></div>
</body>
```

Then let reacterminator do the work:
```
$ reacterminator convert example.html
```

A file named 'Unicorn.jsx' will be generated at './components/Unicorn.jsx'
with the following content:
```
import React from 'react';

export default class Unicorn extends React.Component {
  render() {
    return (
      <div/>
      );
  }
}
```

Please check the [kitchen sink test](test/integration/kitchen-sink.js)
for a comprehensive example of what reacterminator is capable of.

### [DATA ATTRIBUTES](data-attributes.README.md)

### [REDUX INTEGRATION](redux.README.md)

### CLI
```
npm i -g reacterminator
```

You can use `reacterminator` or `rt` for short.

```
  Usage: reacterminator [options] [command]


  Commands:

    convert|c <path>   convert html files into react component files.
    generate|g <path>  generate custom files.
    help [cmd]         display help for [cmd]

  Convert html files to react components

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Examples:

    $ reacterminator c design.html
    $ reacterminator c design/
    $ reacterminator g components/MyCustom

  Notes:

    If the input is a folder, files ending with -ignore.html will be ignored.
```

### NODE
```
/**
 * convert html to react components
 *
 * @param {Object} input
 * {('path'|'string')} input.type
 * {string} input.content
 *          When input.type is 'string', input.content is the html content.
 *          When input.type is 'path', input.content specifies the path.
 *          The path can be a directory or a file.
 *
 * @param {Object} options
 * {boolean} [options.generateFiles=false]
 * {string}  [options.outputPath='./components']
 * {boolean} [options.recursive=false]
 *           When options.recursive is true, reacterminator will find .html files recursivly
 *           and convert them into react components.
 *           When false, reacterminator will only find the .html files
 *           in the current directory.
 **/

var reacterminator = require('reacterminator');

var components = reacterminator(
  {
    type: 'string',
    content: '<div data-component-name="Unicorn""></div>'
  },
  {
    generatefiles: false,
  }
);

console.log(components.Unicorn.formattedFileSnippet)

// import React from 'react';
//
// export default class Unicorn extends React.Component {
//   render() {
//     return (
//       <div/>
//       );
//   }
// }
```

## Alternatives
- [htmltojsx](https://github.com/reactjs/react-magic/blob/master/README-htmltojsx.md)
- [html2react](https://github.com/roman01la/html-to-react-components)

## Development

### Workflow
- write spec in read me
- write tests
- implementation ( please practic TDD by `npm run test:watch:mocha` )
- ensure the following before you do a PR ( `npm test` )
  - linting pass
  - tests pass
  - 100% coverage

### Setup
- install correct node version
```
nvm install # .nvmrc is used to specify node version
nvm use
```
- make sure you can run this command:
```
npm run test
// Coverall will give you an error since your local is not a travis-ci environment.
// That is OK.
```

### Resouces
- [cheerio](https://github.com/cheeriojs/cheerio)
- [babel](https://github.com/babel/babel)
- [Trello](https://trello.com/b/n7iRAJ7M/reacterminator)
