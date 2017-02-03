'use strict'

const Summary = require('./summary')
const expect = require('chai').expect
const path = require('path')
let report
let sum
let feature

function loadTestData (name) {
  return require(path.join(__dirname, '..', '/testdata/', name))
}

describe('Calculate Basic Summary', () => {
  beforeEach(() => {
    // Given
    report = loadTestData('feature_passing.json')

    // When
    sum = Summary.calculateSummary(report)
  })

  it('should return the number of features', () => {
    // Then
    expect(sum.totalFeatures).to.equal(1)
  })

  it('should return the number of scenarios', () => {
    // Then
    expect(sum.totalScenarios).to.equal(2)
  })

  it('should return the number of passed scenarios', () => {
    // Then
    expect(sum.scenariosPassed).to.equal(2)
  })

  it('should return the number of failed scenarios', () => {
    // Then
    expect(sum.scenariosFailed).to.equal(0)
  })

  it('should return the status', () => {
    // Then
    expect(sum.status).to.equal('passed')
  })
})

describe('Status for Features and Scenarios', () => {
  it('should return correct status for passing feature', () => {
    // Given
    feature = loadTestData('feature_passing.json')[0]

    // When
    const featureStatus = Summary.getFeatureStatus(feature)
    const scenarioStatus = Summary.getScenarioStatus(feature.elements[0])

    // Then
    expect(featureStatus).to.equal('passed')
    expect(scenarioStatus).to.equal('passed')
  })

  it('should return correct status for failing feature', () => {
    // Given
    feature = loadTestData('feature_failing.json')[0]

    // When
    const featureStatus = Summary.getFeatureStatus(feature)
    const scenarioStatus = Summary.getScenarioStatus(feature.elements[0])

    // Then
    expect(featureStatus).to.equal('failed')
    expect(scenarioStatus).to.equal('failed')
  })

  it('should return correct status for skipped feature', () => {
    // Given
    feature = loadTestData('feature_skipped.json')[0]

    // When
    const featureStatus = Summary.getFeatureStatus(feature)
    const scenarioStatus = Summary.getScenarioStatus(feature.elements[0])

    // Then
    expect(featureStatus).to.equal('failed')
    expect(scenarioStatus).to.equal('failed')
  })
})
