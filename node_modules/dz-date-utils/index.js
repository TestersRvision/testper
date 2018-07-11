'use strict';

/**
 * Adds days to date, does not change passed date.
 *
 * @param date
 * @param days
 * @returns {Date} - a newly created date.
 */
exports.addDaysToDate = function (date, days) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

/**
 * Truncates a date to 'yyyy-mm-dd' string.
 *
 * @param date
 * @returns {String}
 */
exports.trunkDateToDay = function (date) {
    return date.toISOString().split('T')[0];
};

