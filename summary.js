function sum(arr) {
  return arr.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function sumFeatures(features, elementCallback) {
  // Features summary
  return sum(features.map(function(feature) {
    // Elements summary for each feature
    return sum(feature.elements.map(elementCallback));
  }));
}

function sumTotal(features) {
  return sumFeatures(features, function(element) {
    return element.steps.length;
  });
}

function stepSum(features, stepCondition) {
  return sumFeatures(features, function(element) {
    return element.steps.filter(stepCondition).length;
  });
}

function stepPassed(step) {
  return step.result.status.toLocaleLowerCase() === 'passed';
}

function stepFailed(step) {
  return step.result.status.toLocaleLowerCase() === 'failed';
}

exports.calculateSummary = function(features) {
  var totalPassed = stepSum(features, stepPassed);
  var totalFailed = stepSum(features, stepFailed);

  return {
    total: sumTotal(features),
    totalExecuted: totalPassed + totalFailed,
    totalPassed: totalPassed,
    totalFailed: totalFailed,
    status: totalFailed === 0 ? 'OK' : 'NOK'
  };
};