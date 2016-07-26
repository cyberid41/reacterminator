#! /usr/bin/env node

const program = require('commander')
const reacterminator = require('../lib/index')

const action = (path) => {
  if (!path) {
    console.error('ERROR: No path given!')
    process.exit(1)
  }

  reacterminator(
    {type: 'path', content: path},
    {
      outputPath: program.outputPath,
      recursive: !program.notRecursive,
      fileToComponent: !program.notFileToComponent,
      generateFiles: true,
    }
  )
}

program
  .option('-p, --output-path [./reacterminator]', 'specify output path')
  .option('-r, --not-recursive', 'find files in the input folder NONE-recursivly')
  .option('-f, --not-file-to-component', 'NOT create one component for each html file')
  .arguments('<path>')
  .action(action)

program.on('--help', () => {
  console.log('convert html files into react component files.')
  process.exit(0)
})

program.parse(process.argv)
