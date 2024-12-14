'use strict';

var col = require('../col');

describe('col', sandbox(function () {

  beforeEach(function () {
    this.stub(col, 'log');
  });

  describe('error', function () {

    beforeEach(function () {
      col.error('foo');
    });

    it('logs the message as an error', function () {
      var msg = '\u001b[31mERROR: \u001b[39mfoo';

      col.log.should.have.been.calledWith(msg);
    });

    describe('with multiple arguments', function () {

      beforeEach(function () {
        col.error('foo', 'bar', 'baz');
      });

      it('joins the message and logs it as an error', function () {
        var msg = '\u001b[31mERROR: \u001b[39mfoo bar baz';

        col.log.should.have.been.calledWith(msg);
      });

    });

  });

  describe('warn', function () {

    beforeEach(function () {
      col.warn('foo');
    });

    it('logs the message as a warning', function () {
      var msg = '\u001b[33mWARNING: \u001b[39mfoo';

      col.log.should.have.been.calledWith(msg);
    });

    describe('with multiple arguments', function () {

      beforeEach(function () {
        col.warn('foo', 'bar', 'baz');
      });

      it('joins the message and logs it as an error', function () {
        var msg = '\u001b[33mWARNING: \u001b[39mfoo bar baz';

        col.log.should.have.been.calledWith(msg);
      });

    });

  });

  describe('success', function () {

    beforeEach(function () {
      col.success('foo');
    });

    it('logs the message as a success', function () {
      var msg = '\u001b[39mfoo';

      col.log.should.have.been.calledWith(msg);
    });

    describe('with multiple arguments', function () {

      beforeEach(function () {
        col.success('foo', 'bar', 'baz');
      });

      it('joins the message and logs it as an error', function () {
        var msg = '\u001b[39mfoo bar baz';

        col.log.should.have.been.calledWith(msg);
      });

    });

  });

}));
