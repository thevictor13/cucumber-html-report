'use strict'

const Report = require('./report')
const Directory = require('./directory')
const fs = require('fs')
const sinon = require('sinon')
const expect = require('chai').expect
const path = require('path')

const reportNames = ['cucumber_report.json', 'cucumber_2_report.json']

reportNames.forEach(reportName =>
  describe('Report', () => {
    describe('Validate options', () => {
      let options
      beforeEach(() => {
        options = {
          source: path.join(__dirname, '..', 'testdata', reportName),
          dest: './reports',
          name: 'index.html',
          title: 'Cucumber Report',
          component: 'My Component',
          logo: './logos/cucumber-logo.svg',
          screenshots: './screenshots'
        }
      })

      it('should validate valid input', () => {
        return Report.validate(options).then(opts => {
          expect(opts).to.equal(options)
        })
      })

      it('should validate valid source', () => {
        options.source = undefined
        return Report.validate(options).catch(error => {
          expect(error).to.equal('Input file undefined does not exist! Aborting')
        })
      })

      it('should default to index.html if name is not provided', () => {
        options.name = undefined
        return Report.validate(options).then(opts => {
          expect(opts.name).to.equal('index.html')
        })
      })

      it('should validate valid template file', () => {
        options.template = undefined
        return Report.validate(options).catch(error => {
          expect(error).to.equal('Template file undefined does not exist! Aborting')
        })
      })

      it('should set default dest if not specified', () => {
        delete options.dest
        return Report.validate(options).then(opts => {
          expect(opts.dest).to.equal('./reports')
        })
      })

      it('should set default logo if not specified', () => {
        delete options.logo
        return Report.validate(options).then(opts => {
          expect(opts.logo).to.equal(path.join(__dirname, '..', 'logos', 'cucumber-logo.svg'))
        })
      })

      it('should set maxScreenshots if not specified', () => {
        return Report.validate(options).then(opts => {
          expect(opts.maxScreenshots).to.equal(1000)
        })
      })

      it('should set sortReport if not specified', () => {
        return Report.validate(options).then(opts => {
          expect(opts.sortReport).to.equal(true)
        })
      })
    })

    describe('Create directory', () => {
      let options
      let dirSpy
      let fsSpy
      beforeEach(() => {
        options = {
          source: path.join(__dirname, '..', 'testdata', 'feature_passing.json'),
          dest: './reports',
          name: 'index.html',
          title: 'Cucumber Report',
          component: 'My Component',
          logo: './logos/cucumber-logo.svg',
          screenshots: './screenshots'
        }
        dirSpy = sinon.stub(Directory, 'mkdirpSync')
      })

      afterEach(() => {
        dirSpy.restore()
        fsSpy.restore()
      })

      it('should not create directory if it already exists', () => {
        fsSpy = sinon.stub(fs, 'existsSync').returns(true)
        Report.createDirectory(options).then(opts => {
          expect(dirSpy.callCount).to.equal(0)
        })
      })

      it('should create directory if it does not already exists', () => {
        fsSpy = sinon.stub(fs, 'existsSync').returns(false)
        Report.createDirectory(options).then(opts => {
          expect(dirSpy.callCount).to.equal(1)
        })
      })
    })

    describe('Parse Cucumber json file with passing features', () => {
      let options
      beforeEach(() => {
        options = {
          source: path.join(__dirname, '..', 'testdata', 'feature_passing.json'),
          dest: './reports',
          name: 'index.html',
          title: 'Cucumber Report',
          component: 'My Component',
          logo: './logos/cucumber-logo.svg',
          screenshots: './screenshots'
        }
      })

      it('should contain the title and component', () => {
        return Report.createReport(options).then(report => {
          expect(report.title).to.equal('Cucumber Report')
          expect(report.component).to.equal('My Component')
        })
      })

      it('should contain the summary', () => {
        return Report.createReport(options).then(report => {
          const sum = report.summary
          expect(sum.totalFeatures).to.equal(1)
          expect(sum.featuresPassed).to.equal(1)
          expect(sum.featuresFailed).to.equal(0)
          expect(sum.totalScenarios).to.equal(2)
          expect(sum.scenariosPassed).to.equal(2)
          expect(sum.scenariosFailed).to.equal(0)
          expect(sum.status).to.equal('passed')
        })
      })

      it('should contain the features', () => {
        return Report.createReport(options).then(report => {
          expect(report.features.length).to.equal(1)
        })
      })
    })

    describe('Parse Cucumber json file with failures', () => {
      let options
      beforeEach(() => {
        options = {
          source: path.join(__dirname, '..', 'testdata', 'feature_failing.json'),
          dest: './reports',
          name: 'index.html',
          title: 'Cucumber Report',
          component: 'My Component',
          logo: './logos/cucumber-logo.svg',
          screenshots: './screenshots'
        }
      })

      it('should contain the summary', () => {
        return Report.createReport(options).then(report => {
          var summary = report.summary
          expect(summary.totalFeatures).to.equal(1)
          expect(summary.featuresPassed).to.equal(0)
          expect(summary.featuresFailed).to.equal(1)
          expect(summary.totalScenarios).to.equal(2)
          expect(summary.scenariosPassed).to.equal(1)
          expect(summary.scenariosFailed).to.equal(1)
          expect(summary.status).to.equal('failed')
        })
      })
    })

    describe('Parse Cucumber json file with skipped scenario', () => {
      let options
      beforeEach(() => {
        options = {
          source: path.join(__dirname, '..', 'testdata', 'feature_skipped.json'),
          dest: './reports',
          name: 'index.html',
          title: 'Cucumber Report',
          component: 'My Component',
          logo: './logos/cucumber-logo.svg',
          screenshots: './screenshots'
        }
      })

      it('should contain the summary', () => {
        return Report.createReport(options).then(report => {
          var summary = report.summary
          expect(summary.totalFeatures).to.equal(1)
          expect(summary.featuresPassed).to.equal(0)
          expect(summary.featuresFailed).to.equal(1)
          expect(summary.totalScenarios).to.equal(2)
          expect(summary.scenariosPassed).to.equal(0)
          expect(summary.scenariosFailed).to.equal(2)
          expect(summary.status).to.equal('failed')
        })
      })
    })
  })
)
