var Summary = require('./summary');
var expect = require('chai').expect;
var path = require('path');
var report, sum, feature;

function loadTestData(name) {
  return require(path.join(__dirname, '..', '/testdata/', name));
}

describe('Calculate Basic Summary', function() {

  beforeEach(function () {
    // Given
    report = loadTestData('feature_passing.json');

    // When
    sum = Summary.calculateSummary(report);
  });

  it('should return the number of features', function () {
    // Then
    expect(sum.totalFeatures).to.equal(1);
  });

  it('should return the number of scenarios', function () {
    // Then
    expect(sum.totalScenarios).to.equal(2);
  });

  it('should return the number of passed scenarios', function () {
    // Then
    expect(sum.scenariosPassed).to.equal(2);
  });

  it('should return the number of failed scenarios', function () {
    // Then
    expect(sum.scenariosFailed).to.equal(0);
  });

  it('should return the status', function () {
    // Then
    expect(sum.status).to.equal('OK');
  });
});

describe('Status for Features and Scenarios', function() {

  it('should return correct status for passing feature', function() {
    // Given
    feature = loadTestData('feature_passing.json')[0];

    // When
    var featureStatus = Summary.getFeatureStatus(feature);
    var scenarioStatus = Summary.getScenarioStatus(feature.elements[0]);

    // Then
    expect(featureStatus).to.equal('passed');
    expect(scenarioStatus).to.equal('passed');
  });

  it('should return correct status for failing feature', function() {
    // Given
    feature = loadTestData('feature_failing.json')[0];

    // When
    var featureStatus = Summary.getFeatureStatus(feature);
    var scenarioStatus = Summary.getScenarioStatus(feature.elements[0]);

    // Then
    expect(featureStatus).to.equal('failed');
    expect(scenarioStatus).to.equal('failed');
  });

  it('should return correct status for skipped feature', function() {
    // Given
    feature = loadTestData('feature_skipped.json')[0];

    // When
    var featureStatus = Summary.getFeatureStatus(feature);
    var scenarioStatus = Summary.getScenarioStatus(feature.elements[0]);

    // Then
    expect(featureStatus).to.equal('failed');
    expect(scenarioStatus).to.equal('failed');
  });

});
