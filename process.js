/* jslint esnext: true */
/* jslint node: true */
'use strict';

var config = require('./modules/config'),
    fileutils = require('./modules/fileutils'),
    render = require('./modules/render');
fileutils.clean(config.outputDir);

if (config.copyDirs && Array.isArray(config.copyDirs)) {
    config.copyDirs.forEach(function (element) {
        fileutils.copyFiles(element.source, element.dest);
    });
}

render.renderPosts();