// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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