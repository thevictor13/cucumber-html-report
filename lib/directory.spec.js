var fs = require('fs');
var Directory = require('./directory');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('Directory', function() {
  describe('mkdirpSync', function() {
    it('should create directories recursively', function() {
      var spy = sinon.stub(fs, 'mkdirSync').returns(1);
      Directory.mkdirpSync('/some/long/path');
      expect(spy.getCall(0).args[0]).to.equal('.');
      expect(spy.getCall(1).args[0]).to.equal('some');
      expect(spy.getCall(2).args[0]).to.equal('some/long');
      expect(spy.getCall(3).args[0]).to.equal('some/long/path');
      spy.restore();
    });

  });
});