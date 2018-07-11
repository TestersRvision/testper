## What is this.

This is an assertion library, like built in node.js `assert` module, but:

* Prints the whole source string containing assertion (like https://www.npmjs.com/package/better-assert).
* Contains much more checks. We are going to support many checks from https://www.npmjs.com/package/validator.
* Allows to print messages for passed assertions, using DEBUG_ASSERT_LOG_PASSED env var.

## Installation

npm i debug-assert [-S]

## Usage

[Tests](https://github.com/Dzenly/debug-assert.js/tree/master/__tests__/)

## Conditional assertions.

You can use `require(debug-assert).conditional` object
to create conditional assertions
which work when you set DEBUG_ASSERT env var to some non empty value. 

[Tests conditional](https://github.com/Dzenly/debug-assert.js/blob/master/__tests__/test-cond.js)

## Logging passed assertions

* Set DEBUG_ASSERT_LOG_PASSED env var to some non empty value.
* Use `setLogger()` method to set some logger (like winston) and silly level will be used for passed assertions.
* If no logger is set, logs will be printed by console.log().

## Known Issues

* If assertion consists of many strings, only the first one will be printed.
* DEBUG_ASSERT env var is checked only at first require call.

## License

MIT
