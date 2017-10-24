module.exports = {
  ui: false,
  server: true,
  startPath: process.env.DEMO_PATH,
  files: [
    process.env.DEMO_PATH +'/index.html',
    process.env.DEMO_PATH +'/css/demo.css',
    process.env.DEMO_PATH +'/js/demo.bundle.js'
  ]
}
