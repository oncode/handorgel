import env from '@babel/preset-env'

export default {
  esEnv: {
    exclude: 'node_modules/**',
    presets: [
      [env, { modules: false }]
    ]
  },
  esStage2: {
    exclude: 'node_modules/**',
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
    ]
  }
}
