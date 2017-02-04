const expect = require('chai').expect
const df = require('./duration')

describe('Duration Formatter', () => {
  it('should format duration in seconds', () => {
    const duration = 45000000 // nanoseconds
    const result = df.formatDurationInSeconds(duration)
    expect(result).to.equal('0.05 s')
  })

  it('should format duration in seconds and minutes', () => {
    const duration = 90000000000 // nanoseconds
    const result = df.formatDurationInMinutesAndSeconds(duration)
    expect(result).to.equal('1 m 30 s')
  })
})
