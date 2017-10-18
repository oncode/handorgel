import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel'
import babelConfig from './babel.config'

import pkg from '../package.json'

const COPYRIGHT = `/** ${pkg.name} v${pkg.version}, @license MIT */`
const INPUT = `${process.env.SOURCE_PATH}/js/index.js`
const OUTPUT = `${process.env.LIBRARY_PATH}/js/${process.env.LIBRARY_NAME}.js`

export default [
  {
    input: INPUT,
    output: [
      {
        file: pkg.main,
        name: pkg.name,
        format: 'umd',
        banner: COPYRIGHT
      }, {
        file: pkg.module,
        format: 'es',
        banner: COPYRIGHT
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel(babelConfig.esEnv)
    ]
  }, {
    input: INPUT,
    output: {
      file: OUTPUT,
      name: pkg.name,
      format: 'es',
      banner: COPYRIGHT
    },
    plugins: [
      resolve(),
      commonjs(),
      babel(babelConfig.esStage2)
    ]
  }
]
