var Template = require('./template')
var expect = require('chai').expect

describe('Template', function () {
  describe('getTemplatePartials', function () {
    it('should get the partials', function () {
      var partials = Template.getTemplatePartials()
      var expectedPartials = [
        'browser_logs',
        'footer',
        'header',
        'navigator',
        'report_container',
        'stylesheet',
        'summary',
        'tag_statistics',
        'template_logic'
      ]
      expectedPartials.forEach(function (partial) {
        expect(partials.hasOwnProperty(partial)).to.equal(true)
      })
    })
  })
})
