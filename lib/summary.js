'use strict';

function add(a, b) {
  return a + b;
}

function sum(arr) {
  return arr.reduce(add, 0);
}

function validStep(step) {
  return step.hidden === undefined;
}

function stepPassed(step) {
  return 'passed' === step.result.status.toLocaleLowerCase();
}

function stepFailed(step) {
  return 'failed' === step.result.status.toLocaleLowerCase();
}

function stepSkipped(step) {
  return 'skipped' === step.result.status.toLocaleLowerCase();
}

function getValidSteps(scenario) {
  return (scenario.steps || []).filter(validStep);
}

function getNumStepsForScenario(scenario) {
  return getValidSteps(scenario).length;
}

function getNumPassedStepsForScenario(scenario) {
  return getValidSteps(scenario).filter(stepPassed).length;
}

function getNumFailedStepsForScenario(scenario) {
  return getValidSteps(scenario).filter(stepFailed).length;
}

function getNumSkippedStepsForScenario(scenario) {
  return getValidSteps(scenario).filter(stepSkipped).length;
}

function isScenario(scenario) {
  return scenario.type === 'scenario';
}

function getScenarios(feature) {
  return (feature.elements || []).filter(isScenario);
}

function getScenarioResult(scenario) {
  return {
    numSteps:    getNumStepsForScenario(scenario),
    passedSteps: getNumPassedStepsForScenario(scenario),
    failedSteps: getNumFailedStepsForScenario(scenario),
    skippedSteps: getNumSkippedStepsForScenario(scenario)
  };
}

function getFeatureResult(feature) {
  var scenarios = getScenarios(feature);
  var scenarioResults = scenarios.map(getScenarioResult);

  var passedScenarios = sum(scenarioResults.map(function(res) {
    return res.numSteps === res.passedSteps ? 1 : 0;
  }));

  var failedScenarios = sum(scenarioResults.map(function(res) {
    return res.passedSteps === res.numSteps ? 0 : 1;
  }));

  return {
    numScenarios: scenarios.length,
    passedScenarios: passedScenarios,
    failedScenarios: failedScenarios
  };
}

function getStatusText(success) {
  return success ? 'passed': 'failed';
}

exports.getFeatureStatus = function(feature) {
  var result = getFeatureResult(feature);
  return getStatusText(result.failedScenarios === 0);
};

exports.getScenarioStatus = function(scenario) {
  var result = getScenarioResult(scenario);
  return getStatusText(
    result.failedSteps === 0 &&
    result.skippedSteps === 0
  );
};

exports.calculateSummary = function(features) {
  var featureResults = features.map(getFeatureResult);
    
  var featuresPassed = sum(features.map(function(feature) {
    return feature.status === 'passed';
  }));

  var scenariosPassed = sum(featureResults.map(function(result) {
    return result.passedScenarios;
  }));

  var scenariosFailed = sum(featureResults.map(function(result) {
    return result.failedScenarios;
  }));

  return {
    totalFeatures: features.length,
    featuresPassed: featuresPassed,
    featuresFailed: features.length - featuresPassed,
    totalScenarios: scenariosPassed + scenariosFailed,
    scenariosPassed: scenariosPassed,
    scenariosFailed: scenariosFailed,
    status: scenariosFailed === 0 ? 'OK' : 'NOK'
  };
};
