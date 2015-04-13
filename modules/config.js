/**
Config file.

@module config
@class config
*/

/*jslint node: true */
var config = {};

// File locations.
/**
Where rendered/processed files will be output.

@property outputDir
@type String
@default output/
*/
config.outputDir = 'output/';
/**
The source Markdown/HTML for pages. 

@property pagesDir
@type String
@default pages/
*/
config.pagesDir = 'pages/';
/**
The source Markdoan/HTML for posts.

@property postsDir
@type String
@default posts/
*/
config.postsDir = 'posts/';
/**
Jade templates.

@property templatesDir
@type String
@default templates/
*/
config.templatesDir = 'templates/';
/**
Array of directories whose contents will be copied without
modification to the specified output location.

@property copyDirs
@type Array
@example
    config.copyDirs = [
        {
            source: 'css',
            dest: config.outputDir + 'css'
        },
        ...
    ];
*/
config.copyDirs = [
    {
        source: 'css',
        dest: config.outputDir + 'css'
    },
    {
        source: 'fonts',
        dest: config.outputDir + 'fonts'
    },
    {
        source: 'img',
        dest: config.outputDir + 'img'
    },
    {
        source: 'js',
        dest: config.outputDir + 'js'
    },
    // Files to be copied into the root directory,
    // favicon.ico, Google Analytics, etc.
    {
        source: 'rootassets',
        dest: config.outputDir
    }
];

// Tags
/**
A list of "well-known" tag names. 

@property metaNames
@type Array
@example
    config.metaNames = ['author', 'created', 'slug', 'tags', 'title'];
*/
config.metaNames = ['author', 'created', 'slug', 'tags', 'title'];

// Default metadata.
/**
The site's base address.

@property siteAddress
@type String
*/
config.siteAddress = 'http://yoursitehere.com/'

/**
The site's title.

@property siteTitle
@type String
*/
config.siteTitle = "YOUR SITE NAME";

/**
The site's subtitle.

@property siteSubTitle
@type String
*/
config.siteSubTitle = "blah blah rant rant";

/**
The default value to use as the author of posts and pages.

@property author
@type String
*/
config.author = "Your Name";

module.exports = config;