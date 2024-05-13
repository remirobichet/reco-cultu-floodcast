<template>
  coucou
  <Button @click="retrieveSupabaseData">click for get</Button>

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