var CucumberHtmlReport = require('./index');

var report = new CucumberHtmlReport({
  source: './cucumber_report.json',
  dest: './reports'
});

report.createReport();
