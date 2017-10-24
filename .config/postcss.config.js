var plugins = [
  'autoprefixer',
  'postcss-import',
  'postcss-pxtorem',
  'postcss-assets',
  'css-mqpacker'
]

if (process.env.MODE === 'minified') {
  plugins.push('cssnano')
}

module.exports = {
  'use': plugins,
  'cssnano': {
    zindex: false
  },
  'postcss-pxtorem': {
    rootValue: 16,
    unitPrecision: 5,
    propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    replace: true,
    mediaQuery: false,
    minPixelValue: 2
  },
  'postcss-assets': {
    relative: true,
    cachebuster: true
  }
}
