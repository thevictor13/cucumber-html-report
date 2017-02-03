var report = require('./lib/report')

exports.create = function (options) {
  return report.validate(options)
    .then(report.createDirectory)
    .then(report.createReport)
    .then(report.writeReport)
}
