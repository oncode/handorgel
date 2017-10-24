import externalHelpers from 'babel-plugin-external-helpers'
import env from 'babel-preset-env'
import stage2 from 'babel-preset-stage-2'

export default {
  esEnv: {
    exclude: 'node_modules/**',
    plugins: [externalHelpers],
    presets: [
      [env, { modules: false }]
    ]
  },
  esStage2: {
    exclude: 'node_modules/**',
    plugins: [externalHelpers],
    presets: [stage2]
  }
}
