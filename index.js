var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');
var Directory = require('./directory');
var Summary = require('./summary');

var CucumberHtmlReport = function(options) {
  this.options = options || {};
};

module.exports = CucumberHtmlReport;

CucumberHtmlReport.prototype.createReport = function() {
  var options = this.options;
  if (!checkOptions(options)) {
    return false;
  }

  var reports = loadReport(this.options.source);

  function isValidStep(step) {
    return step.name !== undefined;
  }

  reports.forEach(function(report) {
    report.tags = parseTags(report);
    if (report.elements) {
      report.elements.forEach(function(element) {
        saveEmbeddedImages(options.dest, element, element.steps);
        element.steps = element.steps.filter(isValidStep);
      });
    }
  });

  var templateFile = path.join(__dirname, 'templates', 'default.html');
  if (options.template) {
    templateFile = options.template
  }
  var html = Mustache.to_html(loadTemplate(templateFile), {
    title: options.title || 'Cucumber Report',
    component: options.component || '',
    reports: reports,
    summary: Summary.calculateSummary(reports),
    image: mustacheImageHandler
  });

  saveHTML(options.dest, options.name, html);
  console.log('Report created successfully!');
  return true;
};

function loadReport(fileName) {
  return JSON.parse(fs.readFileSync(fileName, 'utf-8').toString());
}

function saveHTML(targetDirectory, reportName, html) {
  fs.writeFileSync(path.join(targetDirectory, reportName || 'index.html'), html);
}

function saveEmbeddedImages(destPath, element, steps) {
  steps.forEach(function(step) {
    if (step.embeddings) {
      step.embeddings.forEach(function(embedding) {
        if (embedding.mime_type === 'image/png') {
          var imageName = createFileName(element.name) + '.png';
          var fileName = path.join(destPath, imageName);
          // Save imageName on element so we use it in HTML
          element.imageName = imageName;
          writeImage(fileName, embedding.data);
        }
      });
    }
  });
}

function parseTags(report) {
  if (report.tags !== undefined) {
    return report.tags.map(function(tag) {
      return tag.name;
    }).join(', ');
  } else {
    return '';
  }
}

function checkOptions(options) {
  // Make sure we have input file!
  if (!fs.existsSync(options.source)){
    console.error('Input file "'+ options.source + '" does not exist! Aborting');
    return false;
  }

  // Make sure we have template file!
  if (options.template && !fs.existsSync(options.template)){
    console.error('Template file "'+ options.template + '" does not exist! Aborting');
    return false;
  }

  // Create output directory if not exists
  if (!fs.existsSync(options.dest)) {
    Directory.mkdirpSync(options.dest);
    console.log(options.dest + ' directory created.');
  }

  return true;
}

function loadTemplate(templateFile) {
  return fs.readFileSync(templateFile).toString();
}

function createFileName(name) {
  return name.split(' ').join('_').toLowerCase();
}

function writeImage(fileName, data) {
  fs.writeFileSync(fileName, new Buffer(data, 'base64'));
  console.log('Wrote %s', fileName);
}

function mustacheImageHandler() {
  return function (text, render) {
    var src = render(text);
    if (src.length > 0) {
      return '<img src="' + src + '"/>';
    } else {
      return '';
    }
  };
}
