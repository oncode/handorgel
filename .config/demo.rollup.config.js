import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: `${process.env.DEV_PATH}/demo.js`,
  output: {
    file: `${process.env.DEV_PATH}/js/demo.bundle.js`,
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

