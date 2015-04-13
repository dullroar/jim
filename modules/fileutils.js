/**
Various file system utilities.

@module fileutils
@class fileutils
*/

(function () {
    /* jslint esnext: true */
    /* jslint node: true */
    "use strict";

    var fs = require('fs-extra-promise');

    /**
    Delete a directory and all its children, then recreate the
    root directory. Uses fs sync API to avoid race conditions
    with later code that requires the directory to be there.
    
    @method clean
    @param {String} dir The directory to delete and recreate.
    */
    exports.clean = function (dir) {
        console.log(`clean('${dir}')`);
        fs.removeSync(dir)
        fs.ensureDirSync(dir);
    };

    /**
    Recursively copy the source directory to the destination
    directory.
    
    @method copyFiles
    @param {String} fromDir The source directory.
    @param {String} toDir The target directory.
    */
    exports.copyFiles = function (fromDir, toDir) {
        console.log(`copyFiles('${fromDir}', '${toDir}')`);
        let fromDirNorm = this.normalizeDir(fromDir),
            toDirNorm = this.normalizeDir(toDir);
        fs.ensureDirAsync(fromDirNorm)
        .then(fs.ensureDirAsync(toDirNorm))
        .then(fs.copyAsync(fromDirNorm, toDirNorm));
    };

    /**
    Make sure a directory path ends with a trailing slash
    so that it can be concatenated worry-free with file
    names.
    
    @method normalizeDir
    @param {String} dir The directory to check.
    @return {String} The directory with a trailing slash.
    */
    exports.normalizeDir = function (dir) {
        console.log(`normalizeDir('${dir}')`);
        return dir.endsWith('/') ? dir : `${dir}/`;
    };

})();