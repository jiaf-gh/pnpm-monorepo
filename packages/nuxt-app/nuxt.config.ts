export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  devServer: {
    host: '0.0.0.0',
    port: 4200,
  },
  typescript: { tsConfig: { extends: '../../tsconfig.base.json' } },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image'],
  eslint: { config: { standalone: false } },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './src/assets/icons',
      },
    ],
  },
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          width: 64,
          height: 64,
        },
      },
    },
  },
})