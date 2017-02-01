var report = require('./report');
var expect = require('chai').expect;
var path = require('path');

describe('Report', function () {

  describe('Validate options', function () {
    var options;
    beforeEach(function () {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'cucumber_report.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      };
    });

    it('should validate valid input', function () {
      return report.validate(options).then(function(opts) {
        expect(opts).to.equal(options);
      });
    });

    it('should validate valid source', function () {
      options.source = undefined;
      return report.validate(options).catch(function(error) {
        expect(error).to.equal('Input file undefined does not exist! Aborting');
      });
    });

    it('should validate valid name', function () {
      options.name = undefined;
      return report.validate(options).catch(function(error) {
        expect(error).to.equal('Template name undefined does not valid! Aborting');
      });
    });

    it('should validate valid template file', function () {
      options.template = undefined;
      return report.validate(options).catch(function(error) {
        expect(error).to.equal('Template file undefined does not exist! Aborting');
      });
    });

    it('should set default dest if not specified', function () {
      delete options.dest;
      return report.validate(options).then(function(opts) {
        expect(opts.dest).to.equal('./reports');
      });
    });

    it('should set default logo if not specified', function () {
      delete options.logo;
      return report.validate(options).then(function(opts) {
        expect(opts.logo).to.equal(path.join(__dirname, '..', 'logos','cucumber-logo.svg'));
      });
    });
  });

  describe('Parse Cucumber json file with passing features', function() {
    var options;
    beforeEach(function() {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'feature_passing.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      };
    });

    it('should contain the title and component', function() {
      return report.createReport(options).then(function(reportData) {
        expect(reportData.title).to.equal('Cucumber Report');
        expect(reportData.component).to.equal('My Component');
      });
    });

    it('should contain the summary', function() {
      return report.createReport(options).then(function(reportData) {
        var summary = reportData.summary;
        expect(summary.totalFeatures).to.equal(1);
        expect(summary.featuresPassed).to.equal(1);
        expect(summary.featuresFailed).to.equal(0);
        expect(summary.totalScenarios).to.equal(2);
        expect(summary.scenariosPassed).to.equal(2);
        expect(summary.scenariosFailed).to.equal(0);
        expect(summary.status).to.equal('passed');
      });
    });

    it('should contain the features', function() {
      return report.createReport(options).then(function(reportData) {
        var features = reportData.features;
        expect(features.length).to.equal(1);
      });
    });

  });

  describe('Parse Cucumber json file with failures', function() {
    var options;
    beforeEach(function() {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'feature_failing.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      };
    });

    it('should contain the summary', function() {
      return report.createReport(options).then(function(reportData) {
        var summary = reportData.summary;
        expect(summary.totalFeatures).to.equal(1);
        expect(summary.featuresPassed).to.equal(0);
        expect(summary.featuresFailed).to.equal(1);
        expect(summary.totalScenarios).to.equal(2);
        expect(summary.scenariosPassed).to.equal(1);
        expect(summary.scenariosFailed).to.equal(1);
        expect(summary.status).to.equal('failed');
      });
    });


  });


  describe('Parse Cucumber json file with skipped scenario', function() {
    var options;
    beforeEach(function() {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'feature_skipped.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      };
    });

    it('should contain the summary', function() {
      return report.createReport(options).then(function(reportData) {
        var summary = reportData.summary;
        expect(summary.totalFeatures).to.equal(1);
        expect(summary.featuresPassed).to.equal(0);
        expect(summary.featuresFailed).to.equal(1);
        expect(summary.totalScenarios).to.equal(2);
        expect(summary.scenariosPassed).to.equal(0);
        expect(summary.scenariosFailed).to.equal(2);
        expect(summary.status).to.equal('failed');
      });
    });


  });
});