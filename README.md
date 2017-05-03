![alt text](https://travis-ci.org/leinonen/cucumber-html-report.svg?branch=master "Build status")
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

# cucumber-html-report

Create pretty HTML reports from cucumber json report files. Uses mustache templates to transform json to HTML.
Also writes embeddings (base64 encoded PNG images) to disk and includes them in the HTML, 
useful for showing screenshots from Protractor for example. Plain text embeddings are also
included in the HTML, useful for including additional information such as environment details
and values of any randomly generated data.

![](http://www.pharatropic.eu/images/2f0469eec0559d908ae7a1be7a61c5d8.png)

## New Promise-based API

```javascript
const report = require('cucumber-html-report');
report.create({
  source:       './cucumber_report.json',      // source json
  dest:         './reports',                   // target directory (will create if not exists)
  name:         'report.html',                 // report file name (will be index.html if not exists)
  template:     'mytemplate.html',             // your custom mustache template (uses default if not specified)
  title:        'Cucumber Report',             // Title for default template. (default is Cucumber Report)
  component:    'My Component',                // Subtitle for default template. (default is empty)
  logo:         './logos/cucumber-logo.svg',   // Path to the displayed logo.
  screenshots:  './screenshots',               // Path to the directory of screenshots. Optional.
  maxScreenshots: 10                           // Max number of screenshots to save (default is 1000)
})
.then(console.log)
.catch(console.error);
```

## Goals
Keep it simple, lightweight, robust and tested.
Keep dependencies to a bare minimum.
Cover most common usecases...

## Contribute
Contributions are always welcome. Just submit a Pull Request.

# Author
Written by Peter Leinonen 2016, with help of contributors. Thanks!

