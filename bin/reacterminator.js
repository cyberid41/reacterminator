#! /usr/bin/env node

const program = require('commander')
const { version, description } = require('../package.json');

program
  .version(version)
  .description(description)

program
  .command('convert <path>', 'convert html files into react component files.')
  .alias('c')

program
  .command('generate <path>', 'generate custom files.')
  .alias('g')

program.on('--help', () => {
  console.log('  Examples:')
  console.log('')
  console.log('    $ reacterminator -i design.html')
  console.log('    $ reacterminator -i design/')
  console.log('')
  console.log('  Notes:')
  console.log('')
  console.log('    If the input is a folder, the files ends with -ignore.html will be ignored.')
  console.log('')
})

program.parse(process.argv)
