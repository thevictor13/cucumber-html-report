var Template = require('./template');
var expect = require('chai').expect;

describe('Template', function() {
  describe('getTemplatePartials', function() {
    it('should get the partials', function() {
      var partials = Template.getTemplatePartials();
      [
        'browser_logs',
        'footer',
        'header',
        'navigator',
        'report_container',
        'stylesheet',
        'summary',
        'tag_statistics',
        'template_logic'
      ].forEach(function(partial) {
        expect(partials.hasOwnProperty(partial)).to.equal(true);
      });
    });
  });
});