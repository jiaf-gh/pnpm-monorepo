import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src',
  nitro: { preset: 'node-server' },
  typescript: { tsConfig: { extends: resolve(dirname(fileURLToPath(import.meta.url)), '../../tsconfig.base.json') } },
  css: ['./src/assets/css/styles.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en-US' },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        { name: 'description', content: 'A Nuxt3 Web App.' },
      ],
      title: 'Nuxt3 App',
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      }],
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],
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
  tailwindcss: {},
  pinia: { storesDirs: ['./src/stores/**'] },
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        language: 'en-US',
        file: 'en.yaml',
      },
      {
        name: 'Português',
        code: 'pt',
        language: 'pt-BR',
        file: 'pt.yaml',
      },
    ],
    defaultLocale: 'en',
    restructureDir: false,
    langDir: 'locales',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    baseUrl: process.env.BASE_URL,
    bundle: { optimizeTranslationDirective: false },
  },
})