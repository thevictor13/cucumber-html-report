// Converts the duration from nanoseconds to seconds and minutes

/**
 * Rouds a number to the supplied decimals. Only makes sense for floats!
 * @param decimals The maximum number of decimals expected.
 * @param number The number to round.
 * @returns {number} The rounded number. Always returns a float!
 */
function round (decimals, number) {
  return Math.round(number * Math.pow(10, decimals)) / parseFloat(Math.pow(10, decimals))
}

function formatDurationInSeconds (duration) {
  return round(2, duration / 1000000000) + ' s'
}

function formatDurationInMinutesAndSeconds (duration) {
  return Math.trunc(duration / 60000000000) + ' m ' + round(2, (duration % 60000000000) / 1000000000) + ' s'
}

function isMinuteOrMore (duration) {
  return duration && duration / 60000000000 >= 1
}

function isMinuteOrLess (duration) {
  return duration && duration / 60000000000 < 1
}

module.exports = {
  formatDurationInSeconds,
  formatDurationInMinutesAndSeconds,
  isMinuteOrMore,
  isMinuteOrLess
}
