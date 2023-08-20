# The Ghost version of Jekyll "the-plain"

Based on https://heiswayi.github.io/the-plain/

Used in https://chepanov.com

# Development

## Setup

1. Install ghost-cli:
    
    `npm install -g ghost-cli@latest`

1. Create new workspace (outside of the git tree!)

    `mkdir ghost-workspace && cd ghost-workspace && ghost install local`

1. Symlink this repository folder inside `content/themes`, for example:

    `ln -s /Users/nchepanov/dev/the-ghost-plain content/themes/the-ghost-plain`

1. Populate with sample data from current blog. Enter a simple password, like `administrator`
    
    `ghost import ../the-ghost-plain/spiritual-pragmatism.ghost.2023-08-20-17-07-04.json`

1. Start the instance

    `ghost start`

1. Login using `nikita@chepanov.com` as username and `administrator` as password and activate `the-ghost-plain` under advanced 

    http://localhost:2368/ghost/#/settings/design/change-theme

1. Almost there, images are not part of the exported bundle, grab the logo manually

    ```
    mkdir -p content/images/2021/10/
    cd  content/images/2021/10/
    curl -OL https://chepanov.com/content/images/2021/10/chepanov-logo-1x1@2x--1-.png
    ```

# Now to iterate on the theme (setup live reloading)

Styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:


1. All commands run in the git root (not in `ghost-workspace`):

    `yarn install && yarn dev`

2. Now as changes are made to any of the resources, now you can edit `/assets/css/` files,
    which will be compiled to `/assets/built/` automatically.

# Package and upload the theme to the website

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
yarn zip
```

# First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

We've documented our default theme pretty heavily so that it should be fairly easy to work out what's going on just by reading the code and the comments. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://themes.ghost.org) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

One neat trick is that you can also create custom one-off templates just by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for the `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive

&nbsp;

# PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- [Color Mod](https://github.com/jonathantneal/postcss-color-mod-function)

&nbsp;

# Copyright & License

Copyright (c) 2013-2021 Ghost Foundation - Released under the [MIT license](LICENSE).
