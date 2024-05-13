import { createClient } from '@supabase/supabase-js'
export default defineNuxtPlugin({
  name: 'supabase',
  async setup() {
    const runtimeConfig = useRuntimeConfig()
    const supabase = createClient(runtimeConfig.public.SUPABASE_URL, runtimeConfig.public.SUPABASE_ANNON_KEY)

    return {
      provide: {
        supabase
      }
    }
  }
})
