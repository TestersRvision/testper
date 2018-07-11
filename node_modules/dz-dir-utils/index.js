'use strict';
var fs = require('fs');
var path = require('path');

exports.checkDirExists = function (dir) {
    var st;
    try {
        st = fs.statSync(dir);
    } catch (e) {
        if (e.code && e.code === 'ENOENT') {
            return false;
        }
        throw e;
    }

    if (st.isDirectory()) {
        return true;
    }

    throw new Error('Inconsistency concerned with ' + dir);
};

exports.mkdirSync = function (fPath) {
    try {
        fs.mkdirSync(fPath);
    } catch (e) {}
};

exports.rmDir = function (dir, removeSelf) {
    var files;
    try {
        files = fs.readdirSync(dir);
    }    catch (e) {
        return;
    }
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var filePath = path.join(dir, files[i]);
            var fData = fs.lstatSync(filePath);
            //try {
            if (fData.isSymbolicLink()) {
                fs.unlinkSync(filePath);
            }
            if (fData.isFile()) {
                fs.unlinkSync(filePath);
            }
            //} catch (e) {
            //
            //}
            if (fData.isDirectory()) {
                exports.rmDir(filePath, true);
            }
        }
    }
    if (removeSelf) {
        fs.rmdirSync(dir);
    }
};

exports.rmDirs = function (dirs, removeSelf) {
    for (var i = 0, len = dirs.length; i < len; i++) {
        exports.rmDir(dirs[i], removeSelf);
    }
};


