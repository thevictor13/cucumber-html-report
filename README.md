# cucumber-html-report

Create HTML reports from cucumber json report files. Uses mustache to transform json to HTML.
Also writes embeddings (base64 encoded PNG images) to disk and includes them in the HTML (screenshots).

## Very easy to use

```javascript
var CucumberHtmlReport = require('cucumber-html-report');

var report = new CucumberHtmlReport({
  source: './cucumber_report.json', // source json
  dest: './reports', // target directory (will create if not exists)
  name: 'report.html' // report file name (will be index.html if not exists)
});

report.createReport();
```

# Author
Written by Peter Leinonen 2015.
