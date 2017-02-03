const report = require('./report')

exports.create = (options) => report.validate(options)
  .then(report.createDirectory)
  .then(report.createReport)
  .then(report.writeReport)
