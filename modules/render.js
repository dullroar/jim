/**
Jade render helpers.

@module render
@class render
*/

(function () {
    /* jslint esnext: true */
    /* jslint node: true */
    "use strict";

    var fs = require('fs-extra-promise'),
        jade = require('jade'),
        marked = require('marked'),
        path = require('path'),
        config = require('./config');

    /**
    Metadata about posts.
    
    @property posts
    @type Array
    */
    exports.posts = [];

    /**
    Process a directory of posts written in Markdown or HTML using Jade templates.
    
    @method renderPosts
    @param {String} dir The directory containing source posts to process.
    */
    exports.renderPosts = function (dir) {
        console.log(`renderPosts('${dir}')`);
        var self = this;
        fs.ensureDirSync(dir);
        fs.readdirAsync(dir)
        .map(function (file) {
            let basename,
                meta,
                html,
                options = {
                    pretty: true,
                    config: config
                },
                template;

            basename = path.basename(file, path.extname(file));

            // Look for a template named the same as the post or page file.
            // Otherwise use post.jade by default.
            try {
                fs.statSync(`${config.templatesDir}${basename}.jade`);
                template = `${basename}.jade`;
            } catch (e) {
                template = 'post.jade';
            }
            
            meta = self.getMetadata(dir, file);
            options.author = meta.author;
            options.created = meta.created || Date.now();
            options.title = meta.title || basename;
            options.tags = meta.tags;
            options.copyrightDate = meta.copyrightDate || new Date(Date.now()).getFullYear().toString();
            options.filename = template;
            options.filetype = meta.filetype;
            options.post = meta.post;
            options.slug = meta.slug;
            options.dir = meta.dir;
            options.modified = meta.modified;
            self.posts[file] = options;
            options.posts = self.posts;
            options.doctype = path.extname(meta.slug);
            html = jade.renderFile(`${config.templatesDir}${template}`, options);
            console.log(`${config.outputDir}${meta.slug}`);
            return fs.writeFileAsync(`${config.outputDir}${meta.slug}`, html, {
                mode: 0o664
            });
        })
        .catch(logFSWriteFileError);
    };

    /**
    Fill in the metadata for a post or page.
    
    @method getMetadata
    @param {String} dir The directory containing source posts to process.
    @param {String} file The file being processed.
    */
    exports.getMetadata = function (dir, file) {
        let basename = path.basename(file, path.extname(file)),
            created = new Date(Date.now()),
            meta = {},
            markdown,
            tokens;

        markdown = fs.readFileSync(`${dir}${file}`, {
            encoding: 'utf8'
        });
        tokens = marked.lexer(markdown);
        // Find all "well-known" metadata attributes.
        config.metaNames.forEach(function (metaName) {
            if (tokens && tokens.links && tokens.links[metaName] && tokens.links[metaName].href && tokens.links[metaName].href === '#' && tokens.links[metaName].title) {
                meta[metaName] = tokens.links[metaName].title;

                // Create an array of tags split on special characters.
                if (metaName === 'tags') {
                    meta.tags = tokens.links.tags.title.split(/\W/);
                }
            }
        });

        // Site wide metadata.
        meta.siteAddress = config.siteAddress;
        meta.siteTitle = config.siteTitle;
        meta.siteSubTitle = config.siteSubTitle;
        // Fill in any well-known values with defaults if they weren't in the file.
        meta.author = meta.author || config.author;
        meta.created = meta.created || `${created.toISOString().substring(0, 10)}`;
        meta.title = meta.title || basename;
        // Fill in the rest.
        meta.copyrightDate = meta.created.substring(0, 4);
        meta.dir = dir;
        meta.filename = file;
        meta.modified = fs.statSync(`${dir}${file}`).mtime.toISOString();
        meta.slug = meta.slug || `${basename}.html`;
        meta.filetype = path.extname(meta.slug);
        meta.post = marked(markdown);
        this.posts.push(meta);
        return meta;
    };

    var logFSWriteFileError = function (err) {
        if (err) {
            console.error(`fs.writeFile err: ${err}`);
        }
    };
})();