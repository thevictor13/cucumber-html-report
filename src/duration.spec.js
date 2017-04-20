const expect = require('chai').expect
const df = require('./duration')

describe('Duration Formatter', () => {
  it('should format nanoseconds duration into seconds', () => {
    const duration = 45000000
    const result = df.formatDurationInSeconds(duration, false)
    expect(result).to.equal('0.05 s')
  })

  it('should format milliseconds duration into seconds', () => {
    const duration = 45
    const result = df.formatDurationInSeconds(duration, true)
    expect(result).to.equal('0.05 s')
  })

  it('should format nanoseconds duration into seconds and minutes', () => {
    const duration = 90000000000
    const result = df.formatDurationInMinutesAndSeconds(duration, false)
    expect(result).to.equal('1 m 30 s')
  })

  it('should format milliseconds duration into seconds and minutes', () => {
    const duration = 90000
    const result = df.formatDurationInMinutesAndSeconds(duration, true)
    expect(result).to.equal('1 m 30 s')
  })
})
