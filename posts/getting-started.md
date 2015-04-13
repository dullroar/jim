[author]: # (Jim Lehmer)
[title]: # (Getting started)
[created]: # (2015-04-13)
[tags]: # (jade iojs markdown)

To get started using the "jim" stack to create a static web site, you will need to:

1. Install [io.js](https://iojs.org/en/index.html). Note that this code will not run
   under node.js due to extensive use of [ECMAScript 6](https://iojs.org/en/es6.html).
2. Clone this repo.
3. Run `npm install` or `npm update` in the root of the project.
4. Make changes to `modules\config.js` as appropriate.
5. Change or add [Jade templates](http://jade-lang.com/reference/) in the `templates` directory.
6. Add your own fixed assets. Add images to the `img` directory, scripts in `js`, stylesheets in `css`,
   and "root assets" (files to be directly copied to the root of the `output` folder, such as `favicon.ico`)
   in `rootassets`.
7. Write some content in the `posts` and/or `pages` directories (feel free to delete this post).
   You can use [GitHub-Flavored Markdown](https://help.github.com/articles/github-flavored-markdown)
   or HTML or both for formatting content. The main differences between posts and pages are:
   
   1. Posts will show up in the Atom feed, pages will not.
   2. Pages are processed after posts and hence have access to the metadata for all posts. For example,
      both `sitemap.xml` and `atom.xml` are implemented as pages for this reason.

8. Run `iojs process` in the root of the project. The results will be in the `output` directory.

## Metadata

See the second answer (and its comments) to [this StackOverflow question](http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
for how metadata is added to Markdown using nothing but Markdown-legal syntax
(and hence no need for a preprocessor). Basically, you set metadata like this:

```
[author]: # (Jim Lehmer)
[title]: # (Getting started)
[created]: # (2015-04-13)
[tags]: # (jade iojs markdown)
```

## Convention Over Configuration

1. Everything other than images, scripts and CSS will end up in the root of the `output` directory (yes,
   that could get unwieldy at thousands of posts - I am not worried about it for now).
2. The Jade template to use is chosen by looking at the post or page file name (without extension).
   If a matching Jade template name is found that is used, otherwise the `post.jade` template is used.
   Note that this means you can create a "fake" page or post and use that solely to drive a template
   getting rendered (e.g., the `atom.md` page is a placeholder file that does nothing more than
   cause the `atom.jade` template to be used to render `atom.xml`).
3. Posts are meant to be like blog posts or articles, while pages are meant to be more "static" and
   fixed. For example, it is better to make anything that will be linked to from the nav bar a page
   rather than a post, but there is nothing that requires it.