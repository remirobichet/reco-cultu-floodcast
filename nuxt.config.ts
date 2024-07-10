// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎙️</text></svg>' }]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    "nuxt-security",
    'dayjs-nuxt',
    '@vueuse/nuxt'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          "'unsafe-inline'",
          "data:",
          "http:",
          "https:",
        ],
      }
    },
  },
  dayjs: {
    locales: ['fr'],
    plugins: ['utc', 'timezone', 'localizedFormat'],
    defaultLocale: 'fr',
    defaultTimezone: 'Europe/Paris',
  },
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANNON_KEY: process.env.SUPABASE_ANNON_KEY,
    }
  },
})