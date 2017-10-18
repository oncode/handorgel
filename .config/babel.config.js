import externalHelpers from 'babel-plugin-external-helpers'
import env from 'babel-preset-env'
import stage2 from 'babel-preset-stage-2'

export default {
  esEnv: {
    plugins: [externalHelpers],
    presets: [
      [env, { modules: false }]
    ]
  },
  esStage2: {
    plugins: [externalHelpers],
    presets: [stage2]
  }
}
