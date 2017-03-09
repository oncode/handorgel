var webpack = require('webpack')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var path = require('path')

const root = path.join(__dirname, '..')
const libraryName = process.env.LIBRARY_NAME

var plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      context: root
    }
  })
]

module.exports = function(env = {}) {

  var entry = path.join(root, process.env.SOURCE_PATH, 'index.js')
  var outputPath = path.join(root, process.env.LIBRARY_PATH)
  var outputFile = libraryName + '.js'

  env.mode = env.mode || 'default'

  if (env.mode === 'minified') {
    plugins.push(new UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
        unused: false
      },
      minimize: true
    }))

    plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true
    }))

    outputFile = libraryName + '.min.js'
  }

  if (env.mode == 'dev') {
    entry = path.join(root, process.env.DEV_PATH, 'demo.js')
    outputPath = path.join(root, process.env.DEV_JS_PATH)
    outputFile = 'demo.bundle.js'
  }

  var config = {
    entry: entry,
    devtool: 'source-map',
    output: {
      path: outputPath,
      filename: outputFile
    },
    module: {
      rules: [
        {
          test: /(\.js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        }
      ]
    },
    resolve: {
      modules: [
        path.join(root, 'src'),
        path.join(root, 'node_modules')
      ],
      extensions: ['.js']
    },
    plugins: plugins
  }

  if (env.mode != 'dev') {
    config.output.library = libraryName
    config.output.libraryTarget = 'umd'
    config.output.umdNamedDefine = true
  }

  return config
}
