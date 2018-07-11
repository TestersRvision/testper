'use strict';

const _ = require('lodash');

//  Checkers with two arguments.
// If checker returns string - it is error message, if undefined - it is ok.

// http://ecma-international.org/ecma-262/7.0/#sec-strict-equality-comparison
exports.valueStrict = function valueStrict(actual, expected) {
  if (actual !== expected) {
    return `${actual} !== ${expected}`;
  }
};

// http://ecma-international.org/ecma-262/7.0/#sec-abstract-equality-comparison
exports.valueNonStrict = function valueNonStrict(actual, expected) {
  if (actual != expected) {
    return `${actual} != ${expected}`;
  }
};

// http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero
exports.valueSameZero = function valueSameZero(actual, expected) {
  if (!_.eq(actual, expected)) {
    return `${actual} !sameValueZero ${expected}`;
  }
};

/**
 * Checks that value equals to expected value.
 * @param {*} actVal - actual value.
 * @param {*} expVal - expected value.
 * @param {String} [msg] - message to describe the entity which you expect.
 * @returns {Boolean} comparision result.
 */
// exports.valueStrict = function value(actVal, expVal, msg, mode) {
//   if (typeof msg !== 'undefined') {
//     if (actVal === expVal) {
//       gT.l.pass(`${msg}: ${actVal}`, mode);
//       return true;
//     }
//     msg += `\nAct: ${actVal}\nExp: ${expVal}`;
//     failWrapper(msg, mode);
//     return false;
//   }
//   if (actVal === expVal) {
//     msg = `Act: "${actVal}" = Exp: "${expVal}"`;
//
//     // TODO: (Yellow color ??) It is strange situation to compare smth without message.
//     gT.l.pass(msg, mode);
//     return true;
//   }
//   msg = `Equality checking:\nAct: ${actVal}\nExp: ${expVal}`;
//   failWrapper(msg, mode);
//   return false;
// };

/**
 * Checks that two objects or values are equal.
 * Functions are not supported.
 * @param actVal - actual value.
 * @param expVal - expected value.
 * @param msg - message to describe the entity which you expect.
 * @returns {boolean}
 */
// exports.valueDeep = function valueDeep(actVal, expVal, msg, mode) {
//   function handleVals(actVal, expVal, path) {
//     const actType = typeof actVal;
//     const expType = typeof expVal;
//
//     if (actType !== expType) {
//       msg += `\nPath: '${path}', Act type: ${actType}, 'Exp type: ${expType}`;
//       failWrapper(msg, mode);
//       return false;
//     }
//
//     if (actType === 'object' && actVal !== null && expVal !== null) {
//       const actProps = Object.getOwnPropertyNames(actVal).sort();
//       const expProps = Object.getOwnPropertyNames(expVal).sort();
//
//       if (actProps.length !== expProps.length) {
//         msg += `\nDifferent property counts, \nPath: '${path}', \nAct props: ${actProps}\nExp props: ${expProps}`;
//         failWrapper(msg, mode);
//         return false;
//       }
//
//       for (let i = 0, len = actProps.length; i < len; i++) {
//         const actSubProp = actProps[i];
//         const expSubProp = expProps[i];
//
//         if (actSubProp !== expSubProp) {
//           msg += `\nPath: '${path}', Property names are different: Act : ${actSubProp}, Exp : ${expSubProp}`;
//           failWrapper(msg, mode);
//           return false;
//         }
//
//         if (!handleVals(actVal[actSubProp], expVal[expSubProp], `${path}/${actSubProp}`)) {
//           return false;
//         }
//       }
//     } else if (actVal !== expVal) {
//       msg += `\nPath: ${path}, \nAct val: ${actVal}\nExp val: ${expVal}`;
//       failWrapper(msg, mode);
//       return false;
//     }
//     return true;
//   }
//
//   const res = handleVals(actVal, expVal, '');
//   if (res) {
//     gT.l.pass(msg, mode); // There is no sense to print [object Object].
//     return true;
//   }
//   return false;
// };
