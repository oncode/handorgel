import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

import pkg from '../package.json'

const COPYRIGHT = `/** ${pkg.name} v${pkg.version}, @license MIT */`

export default [
  {
    input: `${process.env.SOURCE_PATH}/index.js`,
    output: {
      file: pkg.main,
      name: pkg.name,
      format: 'umd',
      banner: COPYRIGHT
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
]
