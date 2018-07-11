#!/usr/bin/env node
'use strict';

process.env.DEBUG_ASSERT = 'yes';
process.env.DEBUG_ASSERT_LOG_PASSED = 'yes';

const dCondAssert = require('../index.js').conditional;

function foo() {
  dCondAssert.true(1 === 1, '1 must be equal to 1');
  dCondAssert.true(2 === 3, '2 must be equal to 3');
}

function bar() {
  foo();
}

bar();
