<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { siteMetaData } from './_data'

useHead({
  titleTemplate: '%s - Recommandations culturelles Floodcast',
  htmlAttrs: {
    lang: 'fr',
  },
  meta: () => siteMetaData,
})
</script>