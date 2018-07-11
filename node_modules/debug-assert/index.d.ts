// Type definitions for debug-assert
// Project: debug-assert
// Definitions by: Aleksey Chemakin <https://github.com/Dzenly>

declare namespace DebugAssertJs {

  /**
   * Common functions which exist in both conditional and unconditional assertions.
   */
  interface AssertionFunctions {

    /**
     * Throws error if called. So checks that this string of code is never reached.
     * @param {string} [msg = ''] - Message to print if fail.
     */
    dontBeHere(msg = '') : void;

    /**
     * Checks if the given expression is true.
     * @param condition - Conditional expression to check.
     * @param {string} [msg = ''] - Message to print if fail.
     */
    true(condition: any, msg = '') : void;

    /**
     * Checks if the given string is IP of v4 or v6.
     * @param {string} str - String to check.
     * @param {string} [msg = ''] - Message to print if fail.
     */
    ip(str: string, msg = '') : void;

    /**
     * Checks if the actual === expected.
     * http://ecma-international.org/ecma-262/7.0/#sec-strict-equality-comparison
     * @param {*} actual
     * @param {*} expected
     * @param {string} [msg = ''] - Message to print if fail.
     */
    valueStrict(actual: any, expected: any, msg = '') : void;

    /**
     * Checks if the actual == expected.
     * http://ecma-international.org/ecma-262/7.0/#sec-abstract-equality-comparison
     * @param {*} actual
     * @param {*} expected
     * @param {string} [msg = ''] - Message to print if fail.
     */
    valueNonStrict(actual: any, expected: any, msg = '') : void;


    /**
     * Checks if the SameValueZero(actual, expected).
     * http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero
     * @param {*} actual
     * @param {*} expected
     * @param {string} [msg = ''] - Message to print if fail.
     */
    valueSameZero(actual: any, expected: any, msg = '') : void;
  }

  interface Unconditional extends AssertionFunctions {
    /**
     * Sets logger to log passed assertions.
     * If no logger will be set, console.log will be used.
     * Note: this logging work only with DEBUG_ASSERT_LOG_PASSED env variable
     * is set to some non false value.
     * @param {Object} logger - Logger winston-like object.
     */
    setLogger(logger: Object): void;

    /**
     * Assertions which works only at condition,
     * i.e. when DEBUG_ASSERT env variable is set to some non false value.
     */
    conditional: AssertionFunctions;
  }
}

declare const debugAssert: DebugAssertJs.Unconditional;

declare module "debug-assert" {
  export = debugAssert;
}
