'use strict';
var fs = require('fs');
var path = require('path');

/**
 * Removes a file. If file is already absent it is OK.
 * @param fPath
 */
exports.rmFile = function (fPath) {
    try {
        fs.unlinkSync(fPath);
    } catch (e) {}
};

/**
 * Removes files. If some file is already absent it is OK.
 * @param {Array} files
 */
exports.rmFiles = function (files) {
    for (var i = 0, len = files.length; i < len; i++) {
        exports.rmFile(files[i]);
    }
};

/**
 * Returns file size using stat size.
 * @param fPath
 * @returns {Number} - stat file size if file exists. -1 if file is absent, -2 if fPath is not file., -3 of some other error.
 */
exports.getStatFileSize = function (fPath) {

    var st;
    try {
        st = fs.statSync(fPath);
    } catch (e) {
        if (e.code && e.code === 'ENOENT') {
            return -1;
        }
        return -3;
    }

    if (!st.isFile()) {
        return -2;
    }

    return st.size;
};

/**
 * If fs object is absent or empty or is not file - returns false, if exists, is file and non empty - returns true.
 * @param fPath
 * @returns {boolean}
 * @throws if fs.stat throws not 'ENOENT'.
 */
exports.checkFileExistsAndNonEmpty = function (fPath) {
    var st;
    try {
        st = fs.statSync(fPath);
    } catch (e) {
        if (e.code && e.code === 'ENOENT') {
            return false;
        }
        throw e;
    }

    if (st.isFile() && st.size > 0) {
        return true;
    }

    return false;
};

/**
 * Checks whether a file exists or absent.
 *
 * @param {String} fPath
 * @returns {boolean} - true if file presents, false if file absents.
 *
 * @throws {Error} - If the fs object exists but this is not file.
 */
exports.checkFileExists = function (fPath) {
    var st;
    try {
        st = fs.statSync(fPath);
    } catch (e) {
        if (e.code && e.code === 'ENOENT') {
            return false;
        }
        throw e;
    }

    if (st.isFile()) {
        return true;
    }

    throw new Error('The "' + fPath + '" exists but, this is not file');
};

/**
 * Try to remove a file and checks that file is absent.
 * @param {String} fPath
 * @throws Error if file is still present.
 */
exports.rmFileWithCheck = function (fPath) {
    try {
        fs.unlinkSync(fPath);
    } catch (e) {
    }

    if (exports.checkFileExists(fPath)) {
        throw new Error('The "' + fPath + '" is still presented, but should be deleted.');
    }
};

