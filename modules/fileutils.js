/* jslint esnext: true */
/* jslint node: true */
"use strict";

(function () {
    var fs = require('fs-extra-promise');
    exports.clean = function (dir) {
        console.log(`clean('${dir}')`);
        fs.removeSync(dir);
        fs.ensureDirSync(dir);
    };

    exports.copyFiles = function (fromDir, toDir) {
        console.log(`copyFiles('${fromDir}', '${toDir}')`);
        let fromDirNorm = this.normalizeDir(fromDir),
            toDirNorm = this.normalizeDir(toDir);
        fs.ensureDirAsync(fromDirNorm)
        .then(fs.ensureDirAsync(toDirNorm))
        .then(fs.copyAsync(fromDirNorm, toDirNorm));
    };

    exports.normalizeDir = function (dir) {
        console.log(`normalizeDir('${dir}')`);
        return dir.endsWith('/') ? dir : `${dir}/`;
    };
})();