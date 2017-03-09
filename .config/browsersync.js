/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

module.exports = {
  ui: false,
  server: true,
  port: process.env.PORT,
  startPath: process.env.DEV_PATH,
  browser: process.env.BROWSER.split(','),
  files: [
    process.env.DEV_PATH +'/index.html',
    process.env.DEV_CSS_PATH +'/demo.css',
    process.env.DEV_JS_PATH +'/demo.bundle.js'
  ]
}
