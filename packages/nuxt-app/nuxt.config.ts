export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  devServer: {
    host: '0.0.0.0',
    port: 4200,
  },
  typescript: { tsConfig: { extends: '../../tsconfig.base.json' } },
  modules: [
    '@nuxt/eslint',
  ],
  eslint: { config: { standalone: false } },
})
