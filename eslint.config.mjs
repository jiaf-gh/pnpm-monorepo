import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    './nx/**',
    './pnpm-lock.yaml',
    '**/node_modules/**',
    '**/dist/**',
  ],
  formatters: { css: true },
}, {
  rules: {
    'node/prefer-global/process': ['off'],
    'object-curly-newline': ['warn', {
      multiline: true,
      minProperties: 3,
    }],
    'style/eol-last': ['off'],
  },
})
