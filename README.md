![alt text](https://travis-ci.org/leinonen/cucumber-html-report.svg?branch=master "Build status")


# cucumber-html-report

Create HTML reports from cucumber json report files. Uses mustache to transform json to HTML.
Also writes embeddings (base64 encoded PNG images) to disk and includes them in the HTML, 
useful for showing screenshots from Protractor for example.

## Very easy to use

```javascript
var Report = require('cucumber-html-report');

var options = {
  source: './cucumber_report.json', // source json
  dest: './reports', // target directory (will create if not exists)
  name: 'report.html', // report file name (will be index.html if not exists)
  template: 'mytemplate.html' // your custom mustache template (uses default if not specified)
};

var report = new Report(options);
report.createReport();
```

# Author
Written by Peter Leinonen 2016.
