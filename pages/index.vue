<template>
  coucou
  <button @click="retrieveSupabaseData">click for get</button>

  <code><pre>{{ podcast }}</pre></code>
</template>

<script setup>
const { $supabase } = useNuxtApp()

const podcast = ref(null)

const retrieveSupabaseData = async () => {
  const { data } = await $supabase
    .from('podcast')
    .select()

  if (data) {
    podcast.value = data
  }
}
</script>