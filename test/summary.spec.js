var report = require('../cucumber_report.json');
var Summary = require('../lib/summary');
var expect = require('chai').expect;

describe('Summary module', function() {

  var sum;

  beforeEach(function() {
    sum = Summary.calculateSummary(report);
  });

  it('should return total number of features', function() {
    expect(sum.totalFeatures).to.equal(1);
  });

  it('should return total number of scenarios', function() {
    expect(sum.totalScenarios).to.equal(2);
  });

  it('should return number of passed scenarios', function() {
    expect(sum.scenariosPassed).to.equal(0);
  });

  it('should return number of failed scenarios', function() {
    expect(sum.scenariosFailed).to.equal(2);
  });

  it('should return status of the report', function() {
    expect(sum.status).to.equal('NOK');
  });
});