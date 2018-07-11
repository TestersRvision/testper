'use strict';
var Promise = require('bluebird');

exports.getDelayedPromise = function (ms) {
    return new Promise.delay(ms);
    // Implementation for native Promise.
    //return new Promise(
    //    function (resolve) {
    //        setTimeout(function () {
    //            //console.log('Sleep for ' + ms + ' ms');
    //            resolve();
    //        }, ms);
    //    });
};

/**
 * Waiting for some event, periodically calling the promiseGetter function.
 *
 * @param {Function} promiseGetter - Function to get a promise.
 * This function is called in a cycle,
 * until returned promise will be resolved or timeout will be exceeded.
 *
 * @param {Number} timeout - timeout in milliseconds.
 * If this parameter is non negative, there is at least one promiseGetter call.
 * If promiseGetter call will return resolved promise, waitFor returns the resolved promise.
 *
 * @param {Number} [delay = 50] - Delay before promiseGetter calls in milliseconds.
 *
 * @returns {Object} - Resolved Promise if ok, Rejected as 'Timeout exceeded' Promise if fail.
 *
 * @throws  - 'Timeout exceeded' if timeout is a negative value or very small and machine is very slow.
 **/
exports.waitFor = function (promiseGetter, timeout, delay) {
    delay = delay || 50;

    var finishTime = Date.now() + timeout;

    function waiter(/*err*/) {
        //console.log('Reject reason: ' + err);

        if (Date.now() > finishTime) {
            throw 'Timeout exceeded';
        }

        return exports.getDelayedPromise(delay)
            .then(promiseGetter)
            .catch(waiter);
    }

    return waiter(/*'This is the first call and not a reject'*/);

    // If there should not be delay before the first call.
    // In this case the function waitFor can not throw 'Timeout exceeded'.
    //promiseGetter().catch(waiter);
};
