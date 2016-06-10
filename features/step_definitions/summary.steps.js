var Summary = require('../../lib/summary');
var expect = require('chai').expect;
var path = require('path');
var report, sum, feature;

module.exports = function() {

  this.Given(/^a valid JSON file$/, function(callback) {
    report = require(path.join(__dirname, '/testdata/cucumber_report.json'));
    callback();
  });

  this.When(/^I calculate the summary$/, function(callback) {
    sum = Summary.calculateSummary(report);
    callback();
  });

  this.Then(/^it should return number of features/, function(callback) {
    expect(sum.totalFeatures).to.equal(1);
    callback();
  });
  this.Then(/^it should return number of scenarios$/, function(callback) {
    expect(sum.totalScenarios).to.equal(2);
    callback();
  });

  this.Then(/^it should return number of passed scenarios$/, function(callback) {
    expect(sum.scenariosPassed).to.equal(2);
    callback();
  });

  this.Then(/^it should return number of failed scenarios$/, function(callback) {
    expect(sum.scenariosFailed).to.equal(0);
    callback();
  });

  this.Then(/^it should return the status$/, function(callback) {
    expect(sum.status).to.equal('OK');
    callback();
  });

  this.Given(/^a feature with a passing scenario$/, function(callback) {
    feature = require(path.join(__dirname, 'testdata/feature_passing.json'))[0];
    callback();
  });

  this.Given(/^a feature with a failing scenario/, function(callback) {
    feature = require(path.join(__dirname, 'testdata/feature_failing.json'))[0];
    callback();
  });

  this.Given(/^a feature with a skipped scenario/, function(callback) {
    feature = require(path.join(__dirname, 'testdata/feature_skipped.json'))[0];
    callback();
  });

  this.Then(/^it should return status "([^"]*)" for feature$/, function(status, callback) {
    var featureStatus = Summary.getFeatureStatus(feature);
    expect(featureStatus).to.equal(status);
    callback();
  });

  this.Then(/^it should return status "([^"]*)" for scenario$/, function(status, callback) {
    var scenarioStatus = Summary.getScenarioStatus(feature.elements[0]);
    expect(scenarioStatus).to.equal(status);
    callback();
  });

};
