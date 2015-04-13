/* jslint esnext: true */
/*jslint node: true */
'use strict';

var fileutils = require('./modules/fileutils'),
    config = require('./modules/config'),
    render = require('./modules/render');

fileutils.clean(config.outputDir);

if (config.copyDirs && Array.isArray(config.copyDirs)) {
    config.copyDirs.forEach(function (element, index, array) {
        fileutils.copyFiles(element.source, element.dest);
    });
}

render.renderPosts(config.postsDir);
render.renderPosts(config.pagesDir);