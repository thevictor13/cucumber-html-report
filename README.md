![alt text](https://travis-ci.org/leinonen/cucumber-html-report.svg?branch=master "Build status")

# cucumber-html-report

Create HTML reports from cucumber json report files. Uses mustache to transform json to HTML.
Also writes embeddings (base64 encoded PNG images) to disk and includes them in the HTML, 
useful for showing screenshots from Protractor for example. Plain text embeddings are also
included in the HTML, useful for including additional information such as environment details
and values of any randomly generated data.

![](http://www.pharatropic.eu/images/3a84dd33ba7fab98dc62cc272a38258f.jpg)

## Very easy to use

```javascript
var Report = require('cucumber-html-report');

var options = {
  source:    './cucumber_report.json', // source json
  dest:      './reports',          // target directory (will create if not exists)
  name:      'report.html',        // report file name (will be index.html if not exists)
  template:  'mytemplate.html',    // your custom mustache template (uses default if not specified)
  title:     'Cucumber Report',    // Title for default template. (default is Cucumber Report)
  component: 'My Component',       // Subtitle for default template. (default is empty)
};

var report = new Report(options);
report.createReport();
```

## Contribute
You can contribute to this project by submitting a PR.

### TODO
* Refactor code into smaller modules
* Write all tests using cucumber! :)

# Author
Written by Peter Leinonen 2016, with help of contributors. Thanks!
