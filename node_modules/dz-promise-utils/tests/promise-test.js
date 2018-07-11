#! /usr/bin/env node
'use strict';

var promiseUtils = require('dz-promise-utils');
var t = require('tia/tmp-light-utils');
t.init(true, true);

function test(msg, resolveTimeout, waitTimeout, delay) {
    delay = delay || 50;
    t.msg(msg);
    t.msg('Test parameters: resolveTimeout: ' + resolveTimeout
        + ', waitTimeout: ' + waitTimeout + ', delay: ' + delay);

    var finishTime = Date.now() + resolveTimeout;

    function getTestPromise() {

        return promiseUtils.getDelayedPromise(delay).then(
            function () {
                if (Date.now() > finishTime) {
                    return 'Ok, take your good value!!!';
                }
                throw 'Eat one more throw!!!';
            }
        );
    }

    return promiseUtils.waitFor(getTestPromise, waitTimeout)
        .then(
            function (res) {
                return res;
            },
            function (err) {
                throw err;
            });
}

function expResolve(res) {
    t.pass('Expected resolve: ' + res);
}

function expReject(err) {
    t.pass('Expected reject: ' + err);
}

function unexpReject(err) {
    t.fail('Unexpected reject: ' + err);
}

function unexpResolve(res) {
    t.fail('Unexpected resolve: ' + res);
}

var p = test('Test good case', 500, 700);
p.then(function (res) {
        expResolve(res);
        return test('Test bad case', 700, 500);
    }, unexpReject)
    .then(unexpResolve, function (err) {
        expReject(err);
        return test('Bad case with incorrect timeout', 700, -500);
    })
    .then(unexpResolve, function (err) {
        expReject(err);
        return test(
            'Good case. Timeout exceeded, but ok because promiseGetter is run at least 1 time (for very slow machine there can be fail)',
            10, 1);
    })
    .then(function (res) {
        expResolve(res);
        return test('Bad case. Negative timeout', 10, -500);
    }, unexpReject)
    .then(unexpResolve, expReject)
    .then(function () {
        t.total();
    });
