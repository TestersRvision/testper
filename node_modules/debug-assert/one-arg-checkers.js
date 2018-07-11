'use strict';

const validator = require('validator');

//  Checkers with one argument.
// If checker returns string - it is error message, if undefined - it is ok.

exports.true = function checkTrue(condition) {
  if (!condition) {
    return `(${condition}) is not true`;
  }
};

exports.ip = function ip(expr) {
  if (!validator.isIP(expr)) {
    return `(${expr}) is not IP`;
  }
};
