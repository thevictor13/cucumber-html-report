var
  fs = require('fs'),
  path = require('path'),
  Mustache = require('mustache'),
  Directory = require('./lib/directory'),
  Summary = require('./lib/summary');

var defaultTemplate = path.join(__dirname, 'templates', 'default.html');

var CucumberHtmlReport = module.exports = function(options) {
  this.options = options || {};
};

CucumberHtmlReport.prototype.createReport = function() {
  var options = this.options;
  if (!checkOptions(options)) {
    return false;
  }

  var features = parseFeatures(options, loadCucumberReport(this.options.source));
  var templateFile = options.template || defaultTemplate;
  var template = loadTemplate(templateFile);
  var mustacheOptions = {
    title: options.title || 'Cucumber Report',
    component: options.component || '',
    features: features,
    summary: Summary.calculateSummary(features),
    image: mustacheImageHandler
  };

  var html = Mustache.to_html(template, mustacheOptions);
  saveHTML(options.dest, options.name, html);
  console.log('Report created successfully!');

  return true;
};

function isValidStep(step) {
  return true; //step.name !== undefined;
}

function loadCucumberReport(fileName) {
  return JSON.parse(fs.readFileSync(fileName, 'utf-8').toString());
}

function parseFeatures(options, features) {
  return features
    .map(getStatus)
    .map(parseTags)
    .map(function(feature) {
      return saveEmbeddings(feature, options);
    });
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
    console.log('Created directory: %s', options.dest);
  }

  return true;
}

function loadTemplate(templateFile) {
  return fs.readFileSync(templateFile).toString();
}

function createFileName(name) {
  return name.split('\W+').join('_').toLowerCase();
}

function saveHTML(targetDirectory, reportName, html) {
  fs.writeFileSync(path.join(targetDirectory, reportName || 'index.html'), html);
}

function writeImage(fileName, data) {
  fs.writeFileSync(fileName, new Buffer(data, 'base64'));
  console.log('Wrote %s', fileName);
}

function getStatus(feature) {
  var result = Summary.getFetureResult(feature);
  feature.status = result.failedScenarios === 0 ? 'passed': 'failed';
  return feature;
}

function parseTags(feature) {
  if (feature.tags !== undefined) {
    feature.tags = feature.tags.map(function(tag) {
      return tag.name;
    }).join(', ');
  } else {
    feature.tags = '';
  }
  return feature;
}

function saveEmbeddings(feature, options) {
  if (feature.elements) {
    feature.elements.forEach(function(element) {
      saveEmbeddedImages(options.dest, element, element.steps);
      element.steps = element.steps.filter(isValidStep);
    });
  }
  return feature;
}

function saveEmbeddedImages(destPath, element, steps) {
  steps = steps || [];
  steps.forEach(function(step) {
    if (step.embeddings) {
      step.embeddings.forEach(function(embedding) {
        if (embedding.mime_type === 'image/png') {
          var imageName = createFileName(element.name + ':' + element.line) + '.png';
          var fileName = path.join(destPath, imageName);
          element.imageName = imageName; // Save imageName on element so we use it in HTML
          writeImage(fileName, embedding.data);
        }
      });
    }
  });
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
