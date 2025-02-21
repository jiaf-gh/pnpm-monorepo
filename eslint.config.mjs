import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    './pnpm-lock.yaml',
    '**/node_modules/**',
    '**/dist/**',
  ],
})
