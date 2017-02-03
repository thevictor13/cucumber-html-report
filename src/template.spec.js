'use strict'

const Template = require('./template')
const expect = require('chai').expect

describe('Template', () => {
  describe('getTemplatePartials', () => {
    it('should get the partials', () => {
      const partials = Template.getTemplatePartials()
      const expectedPartials = [
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
      expectedPartials.forEach(partial => {
        expect(partials.hasOwnProperty(partial)).to.equal(true)
      })
    })
  })
})
