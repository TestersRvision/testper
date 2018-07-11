#!/usr/bin/env node
'use strict';

process.env.DEBUG_ASSERT_LOG_PASSED = 'yes';

const dAssert = require('../index.js');

function foo() {
  dAssert.true(1 === 1, '1 must be equal to 1');
  dAssert.ip('123.123.123.123', 'arg must be ip');
  dAssert.valueStrict('a', 'a', 'a must be strict equal to a');
  dAssert.valueNonStrict(1, '1', '1 must be abstract equal to "1"');
  dAssert.valueSameZero(+0, -0, '+0 must be sameValueZero equal to -0');
  dAssert.conditional.true(2 === 3, '2 must be equal to 3, no such string, cause no DEBUG_ASSERT');
  dAssert.true(1 === 3, '1 must be equal to 3'); // Fail
}

function bar() {
  foo();
}

bar();
