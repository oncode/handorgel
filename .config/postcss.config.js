module.exports = (ctx) => {
  return {
    map: ctx.options.map,
    plugins: {
      'autoprefixer': {},
      'postcss-import': {},
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
      },
      'css-mqpacker': {},
      'cssnano': ctx.env !== 'minified' ? false : {
        zindex: false
      }
    }
  }
}
