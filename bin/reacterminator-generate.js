#! /usr/bin/env node

const program = require('commander')
const generate = require('../lib/generate/index')

const action = (path) => {
  generate(path)
}

program
  .arguments('<path>')
  .action(action)

program.on('--help', () => {
  console.log('<path> is the path you want to override in the generated folder.')
  console.log('')
  console.log('  Examples:')
  console.log('')
  console.log('    $ rc g reducers/my-path/my-reducer')
  console.log('    $ rc g components/MyComponent')
  console.log('')
  process.exit(0)
})

program.parse(process.argv)
