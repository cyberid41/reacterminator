const fs = require('fs')
const chalk = require('chalk')

module.exports = function generateFile ({filePath, content, override}) {
  let fileExists
  try {
    fileExists = fs.statSync(filePath).isFile()
  } catch (e) {
    fileExists = false
  }

  const shouldCreate = !fileExists || override
  if (shouldCreate) {
    fs.writeFileSync(filePath, content)
    console.log('CREATED: ' + chalk.green.underline(filePath))
  }

  return shouldCreate
}