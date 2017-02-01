var path = require('path');
var fs = require('fs');

var baseTemplate = function(name) {
  return path.join(__dirname, "..", "templates", name);
};

var defaultTemplate = baseTemplate("template.mustache");
var partialDirectory = path.join(__dirname, "..", "templates", "partials");

function getTemplatePartials() {
  var partials = {};
  var fileList = fs.readdirSync(partialDirectory).map(function(file) {
    if (file[0] === ".") {
      return undefined;
    }

    var fileInfo = file.split(".");
    return {
      name: fileInfo[0],
      extension: fileInfo[1]
    };

  });
  fileList.forEach(function(fileInfo) {
    var templateFile = path.join(partialDirectory, fileInfo.name + "." + fileInfo.extension);
    partials[fileInfo.name] = loadTemplate(templateFile);
  });
  return partials;
}

function loadTemplate(templateFile) {
  return fs.readFileSync(templateFile).toString();
}

exports.defaultTemplate = defaultTemplate;
exports.load = loadTemplate;
exports.getTemplatePartials = getTemplatePartials;
