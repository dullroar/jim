# jim

A minimal static site generator stack of [Jade](http://jade-lang.com/reference/),
[io.js](https://iojs.org/en/index.html) and
[Markdown](https://help.github.com/articles/github-flavored-markdown/).

The jim stack favors [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
and staying out of the way as much as possible. Hence there are not a lot of bells and whistles.

See the `posts/getting-started.md` file for how to, well, get started.

I wrote it for the following reasons:

* To better learn how to use io.js by scratching my own itch of wanting a ***simple*** static
  site generator.
* To start playing with [ECMAScript 6](https://iojs.org/en/es6.html).
* To overcome the issues I've had with other static site generators, while keeping my content in
  as portable of a format as possible.
* For fun.

While this is a personal project, if you find it useful let me know. And if you find a bug I
will happily accept a bug report or (better) a pull request. Feature requests are also appreciated,
but since I am trying to keep this ***simple***, I may or may not implement them. But it is BSD-licensed,
so fork away!

**Note:** Because this is a project where I am learning new things (io.js, ECMAScript 6, Jade), I
make no representations that the code is good, let alone the best way to do things. However, if you see
something particularly egregious, feel free to point it out.

## Folder Structure

* **css** - stylesheets, copied as is to output/css by default.
* **img** - images, copied as is to output/imgs by default.
* **js** - Javascript files, copied as is to output/js by default.
* **modules** - Javascript modules written as part of this project.
* **node_modules** - where node stuff goes.
* **output** - where the processed files go.
* **pages** - static pages (unlike posts, don't support metadata, slugs).
* **posts** - "articles" written in Markdown.
* **rootassets** - files to be copied as-is to the root of the output.
* **templates** - Jade templates.

## Metadata

See the second answer (and its comments) to [this StackOverflow question](http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
for how metadata is added to Markdown using nothing but Markdown-legal syntax
(and hence no need for a preprocessor).