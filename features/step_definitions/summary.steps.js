var Summary = require('../../lib/summary');
var expect = require('chai').expect;
var report, sum;

module.exports = function() {

  this.Given(/^a valid JSON file$/, function(callback) {
    report = require('../../cucumber_report.json');
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
    expect(sum.totalScenarios).to.equal(4);
    callback();
  });

  this.Then(/^it should return number of passed scenarios$/, function(callback) {
    expect(sum.scenariosPassed).to.equal(4);
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

};