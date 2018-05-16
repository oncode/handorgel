import env from '@babel/preset-env'
import stage2 from '@babel/preset-stage-2'

export default {
  esEnv: {
    exclude: 'node_modules/**',
    presets: [
      [env, { modules: false }]
    ]
  },
  esStage2: {
    exclude: 'node_modules/**',
    presets: [
      [stage2, { decoratorsLegacy: true }]
    ]
  }
}
