import baseConfig from '../../eslint.config.mjs'

export default baseConfig.append([
  { ignores: ['generated/**'] },
])
