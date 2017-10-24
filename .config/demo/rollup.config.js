import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel'
import babelConfig from '../babel.config'

export default {
  input: `${process.env.DEMO_PATH}/demo.js`,
  output: {
    file: `${process.env.DEMO_PATH}/js/demo.bundle.js`,
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(babelConfig.esEnv)
  ]
}

