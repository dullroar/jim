/* jslint esnext: true */
/* jslint node: true */
"use strict";

let fs = require('fs-extra-promise'),
    jade = require('jade'),
    marked = require('marked'),
    path = require('path'),
    config = require('./config'),
    authors = {},    
    posts = [],
    tags = {};

let getMetadata = function (dir, file, options) {
    console.log(`getMetadata('${dir}', '${file}')`);
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
            options[metaName] = tokens.links[metaName].title;

            // Create an array of tags split on special characters.
            if (metaName === 'tags') {
                options.tags = tokens.links.tags.title.split(/\W/);
            }
        }
    });

    // Site wide metadata.
    // Fill in any well-known values with defaults if they weren't in the file.
    options.author = options.author || config.author;
    options.created = options.created || `${created.toLocaleString()}`;
    options.title = options.title || basename;
    // Fill in the rest.
    options.copyrightDate = created.getFullYear().toString();
    options.dir = dir;
    options.filename = file;
    options.modified = fs.statSync(`${dir}${file}`).mtime.toISOString();
    options.slug = options.slug || `${basename}.html`;
    options.doctype = path.extname(options.slug);
    options.filetype = path.extname(options.slug);
    options.post = marked(markdown);
    posts.push(options);

    if (options.tags) {
        for (let tag of options.tags) {
            if (!tags.hasOwnProperty(tag)) {
                tags[tag] = [];
            }

            tags[tag].push({ title: options.title, slug: options.slug });
        }
    }

    if (!authors.hasOwnProperty(options.author)) {
        authors[options.author] = [];
    }

    authors[options.author].push({ title: options.title, slug: options.slug });
    return options;
};

let logRenderPostsError = function (err) {
    if (err) {
        console.error(`ERROR: renderPosts - ${err}`);
    }
};

let renderLandingPages = function () {
    console.log(`renderLandingPages()`);
    let html,
        options = {
            pretty: true,
            authors: this.authors,
            config: this.config,
            copyrightDate: new Date(Date.now()).getFullYear().toString(),
            created: new Date(Date.now())
        };

    if (config.landingPages) {
        for (let pageType of config.landingPages) {
            console.log(`${pageType}`);
            for (let pageList in this[pageType]) {
                if (pageList) {
                    console.log(`${pageList}`);
                    for (let page of this[pageType][pageList]) {
                        console.log(`${page.title+','+page.slug}`);
                    }
                    
                    try {
                        options.pageList = this[pageType][pageList];
                        options.title = pageList;
                        html = jade.renderFile(`${config.templatesDir}landing.jade`, options);
                        fs.writeFileSync(`${config.outputDir}${pageList}.html`, html, {
                            mode: 0o664
                        });
                    } catch (e) {
                        console.log(`ERROR: renderLandingPages - ${e}`);
                    }
                }
            }
        }
    }
};

let renderFile = function (file) {
    console.log(`renderFile('${file}')`);
    let basename,
        dir = this.currentDir,
        meta,
        html,
        options = {
            pretty: true,
            authors: this.authors,
            config: this.config,
            allTags: this.tags
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

    getMetadata(dir, file, options);
    posts[file] = options;
    options.posts = this.posts;

    try {            
        html = jade.renderFile(`${config.templatesDir}${template}`, options);
        return fs.writeFileAsync(`${config.outputDir}${options.slug}`, html, {
            mode: 0o664
        });
    } catch (e) {
        console.log(`ERROR: renderFile - ${e}`);
    }
};

(function () {
    exports.renderPosts = function () {
        console.log(`renderPosts()`);
        let promises,
            self = this;        

        for (let dir of config.postsDir) {
            fs.ensureDirSync(dir);
            let that = {
                authors: authors,
                config: config,
                currentDir: dir,
                posts: posts,
                tags: tags
            };
            promises = fs.readdirAsync(dir)
                .map(renderFile.bind(that))
                .catch(logRenderPostsError);
        }
        
        let that = {
            authors: authors,
            config: config,
            tags: tags
        };
        fs.Promise.settle(promises).then(renderLandingPages.bind(that));
    };
})();