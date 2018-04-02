'use strict'

const path = require('path')
const fs = require('fs')

const baseTemplate = name => path.join(__dirname, '..', 'templates', name)
const defaultTemplate = baseTemplate('template.mustache')

const loadTemplate = templateFile => fs.readFileSync(templateFile).toString()

function getTemplatePartials (partialDirectory) {
  const partials = {}
  const fileList = fs.readdirSync(partialDirectory).map(file => {
    if (file[0] === '.') {
      return undefined
    }

    const fileInfo = file.split('.')
    return {
      name: fileInfo[0],
      extension: fileInfo[1]
    }
  })

  fileList.forEach(fileInfo => {
    const templateFile = path.join(partialDirectory, fileInfo.name + '.' + fileInfo.extension)
    partials[fileInfo.name] = loadTemplate(templateFile)
  })

  return partials
}

exports.defaultTemplate = defaultTemplate
exports.load = loadTemplate
exports.getTemplatePartials = getTemplatePartials
