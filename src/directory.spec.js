'use strict'

const fs = require('fs')
const Directory = require('./directory')
const sinon = require('sinon')
const expect = require('chai').expect

describe('Directory', () => {
  describe('mkdirpSync', () => {
    it('should create directories recursively', () => {
      let spy = sinon.stub(fs, 'mkdirSync').returns(1)
      Directory.mkdirpSync('/some/long/path')
      expect(spy.getCall(0).args[0]).to.equal('.')
      expect(spy.getCall(1).args[0]).to.equal('some')
      expect(spy.getCall(2).args[0].replace(/\\/g, '/')).to.equal('some/long')
      expect(spy.getCall(3).args[0].replace(/\\/g, '/')).to.equal('some/long/path')
      spy.restore()
    })
  })
})
