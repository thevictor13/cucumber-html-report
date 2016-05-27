var CucumberHtmlReport = require('./index');
var report = new CucumberHtmlReport({
  source: './cucumber_report.json',
  dest: './reports2',
  // name: 'report.html',
  // template: __dirname + '/templates/template2.html'
  title: 'Cucumber Test Report',
  component: 'System under test'
});
report.createReport();
