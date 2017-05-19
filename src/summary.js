'use strict'

const add = (a, b) => a + b
const sum = (arr) => arr.reduce(add, 0)
const validStep = step => step.hidden === undefined || step.result.status.toLocaleLowerCase() === 'failed'
const featurePassed = feature => feature.status === 'passed'
const stepPassed = step => step.result.status.toLocaleLowerCase() === 'passed'
const stepFailed = step => step.result.status.toLocaleLowerCase() === 'failed'
const stepSkipped = step => step.result.status.toLocaleLowerCase() === 'skipped'
const isScenarioType = scenario => scenario.type === 'scenario' || scenario.keyword === 'Scenario'
const getStatusText = success => success ? 'passed' : 'failed'
const getValidSteps = scenario => (scenario.steps || []).filter(validStep)
const getNumStepsForScenario = scenario => getValidSteps(scenario).length
const getNumPassedStepsForScenario = scenario => getValidSteps(scenario).filter(stepPassed).length
const getNumFailedStepsForScenario = scenario => getValidSteps(scenario).filter(stepFailed).length
const getNumSkippedStepsForScenario = scenario => getValidSteps(scenario).filter(stepSkipped).length
const getScenarios = feature => (feature.elements || []).filter(isScenarioType)

function getScenarioResult (scenario) {
  return {
    numSteps: getNumStepsForScenario(scenario),
    passedSteps: getNumPassedStepsForScenario(scenario),
    failedSteps: getNumFailedStepsForScenario(scenario),
    skippedSteps: getNumSkippedStepsForScenario(scenario)
  }
}

function getFeatureResult (feature) {
  const scenarios = getScenarios(feature)
  const scenarioResults = scenarios.map(getScenarioResult)
  const passedScenarios = sum(scenarioResults.map(res => res.numSteps === res.passedSteps ? 1 : 0))
  const failedScenarios = sum(scenarioResults.map(res => res.passedSteps === res.numSteps ? 0 : 1))

  return {
    numScenarios: scenarios.length,
    passedScenarios: passedScenarios,
    failedScenarios: failedScenarios
  }
}

exports.getFeatureStatus = function (feature) {
  const result = getFeatureResult(feature)
  return getStatusText(result.failedScenarios === 0)
}

exports.getScenarioStatus = function (scenario) {
  const result = getScenarioResult(scenario)
  return getStatusText(
    result.failedSteps === 0 &&
    result.skippedSteps === 0
  )
}

exports.calculateSummary = function (features) {
  const featureResults = features.map(getFeatureResult)
  const featuresPassed = sum(features.map(featurePassed))
  const scenariosPassed = sum(featureResults.map(result => result.passedScenarios))
  const scenariosFailed = sum(featureResults.map(result => result.failedScenarios))

  return {
    totalFeatures: features.length,
    featuresPassed: featuresPassed,
    featuresFailed: features.length - featuresPassed,
    totalScenarios: scenariosPassed + scenariosFailed,
    scenariosPassed: scenariosPassed,
    scenariosFailed: scenariosFailed,
    status: scenariosFailed === 0 ? 'passed' : 'failed'
  }
}
