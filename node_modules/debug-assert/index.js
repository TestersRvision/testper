const AssertionError = require('assert').AssertionError;
const callsite = require('callsite');
const fs = require('fs');

const oneArgCheckers = require('./one-arg-checkers.js');
const twoArgsCheckers = require('./two-args-checkers.js');

/**
 * Returns src line.
 * @param stack - call stack.
 * @return {string} - line from src file.
 */
function getSrcLine(stack) {
  const call = stack[1];
  const file = call.getFileName();
  const lineno = call.getLineNumber();
  let src = fs.readFileSync(file, 'utf8');
  const line = src.split('\n')[lineno - 1].trim();
  return line;
}

function getSrcInfo(stack) {
  const call = stack[1];
  const file = call.getFileName();
  const lineno = call.getLineNumber();
  let src = fs.readFileSync(file, 'utf8');
  const line = src.split('\n')[lineno - 1].trim();
  return {
    fileLineNo: `${file}:${lineno}`,
    line,
  };
}

function throwError(stack, msg, userMsg) {

  const { fileLineNo, line } = getSrcInfo(stack);

  const err = new AssertionError({
    message: '\nMSG: ' + msg + '\nUSER MSG: ' + userMsg + '\nLINE: ' + line + '\nFILE: ' + fileLineNo,
    stackStartFunction: stack[0].getFunction(),
  });

  throw err;
}

let logger = null;

exports.setLogger = function setLogger(argLogger) {
  logger = argLogger;
};

let logPassed = function() {};
if (process.env.DEBUG_ASSERT_LOG_PASSED) {
  logPassed = function(stack) {
    const logStr = 'OK: ' + getSrcLine(stack);
    if (!logger) {
      console.log(logStr);
      return;
    }
    logger.silly(logStr);
  }
}

exports.dontBeHere = function (userMsg = '') {
  throwError(callsite(), 'dontBeHere assertion failed.', userMsg);
  // There is no logPassed variant.
};

Object.keys(oneArgCheckers)
  .forEach(function (key) {

    if (typeof exports[key] !== 'undefined') {
      throw new Error('Keys duplication');
    }

    if (typeof oneArgCheckers[key] === 'function') {
      exports[key] = function (expr, userMsg = '') {
        const result = oneArgCheckers[key](expr);
        if (typeof result === 'string') {
          throwError(callsite(), result, userMsg);
        }
        logPassed(callsite());
      }
    }
  });

Object.keys(twoArgsCheckers)
  .forEach(function (key) {

    if (typeof exports[key] !== 'undefined') {
      throw new Error('Keys duplication');
    }

    if (typeof twoArgsCheckers[key] === 'function') {
      exports[key] = function (arg1, arg2, userMsg = '') {
        const result = twoArgsCheckers[key](arg1, arg2);
        if (typeof result === 'string') {
          throwError(callsite(), result, userMsg);
        }
        logPassed(callsite());
      }
    }
  });

// =====================================================================
exports.conditional = {}; // Object for conditional checks.

// Let's assign exports.cond to function from export if DEBUG_ASSERT is set,
// or to empty functions, if DEBUG_ASSERT is not set.
if (process.env.DEBUG_ASSERT) {

  Object.keys(exports)
    .forEach(function (key) {
      if (key === 'setLogger') return;
      if (typeof exports[key] === 'function') {
        exports.conditional[key] = exports[key];
      }
    });
} else {
  Object.keys(exports)
    .forEach(function (key) {
      if (typeof exports[key] === 'function') {
        exports.conditional[key] = function () {
        };
      }
    });
}



