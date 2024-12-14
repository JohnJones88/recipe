'use strict';

var app = require('what-app');

var colors = {
  error: '\u001b[31m',
  warn: '\u001b[33m',
  normal: '\u001b[39m',
  app: '\u001b[32m'
};

var join = function () {
  var i = 1, msg = '';

  for (var arg in arguments) {
    if (arguments.hasOwnProperty(arg)) {
      msg = msg + arguments[arg];
      msg = (i < arguments.length) ? msg + ' ' : msg;
      i += 1;
    }
  }

  return msg;
};

module.exports = {

  error: function () {
    this.log(colors.error + 'ERROR: ' + colors.normal + join.apply(this, arguments));
  },

  warn: function () {
    this.log(colors.warn + 'WARNING: ' + colors.normal + join.apply(this, arguments));
  },

  info: function () {
    console.log('    ', join.apply(this, arguments));
  },

  success: function () {
    this.log(colors.normal + join.apply(this, arguments));
  },

  log: function () {
    console.log(colors.app + app + ' ' + join.apply(this, arguments));
  }

};
