var CucumberHtmlReport = require('./index');
var report = new CucumberHtmlReport({
  source: './cucumber_report.json',
  dest: './reports2'
  // , template: __dirname + '/templates/template2.html'
});
report.createReport();
