/*jslint node: true */
var config = {};
config.outputDir = 'output/';
config.postsDir = ['posts/', 'pages/' ];
config.templatesDir = 'templates/';
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
config.metaNames = ['author', 'created', 'slug', 'tags', 'title'];
config.landingPages = ['tags'];
config.siteAddress = 'http://yoursitehere.com/';
config.siteTitle = "YOUR SITE NAME";
config.siteSubTitle = "blah blah rant rant";
config.author = "Your Name";
module.exports = config;