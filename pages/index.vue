<template>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
    <NuxtLink v-for="podcast in podcasts" :to="`/${podcast.season}-${podcast.episode}`">
      <Card class="flex flex-col h-full cursor-pointer hover:bg-accent">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-lg font-medium">
            S{{ podcast.season }}E{{ podcast.episode }}
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-3">
          <div class="text-2xl font-bold line-clamp-1">
            {{ podcast.name }}
          </div>
          <p class="text-xs text-muted-foreground line-clamp-3">
            {{ podcast.description }}
          </p>
        </CardContent>
        <CardFooter>
          <p class="text-xs">
            {{ podcast.date }}
          </p>
        </CardFooter>
      </Card>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const { $supabase } = useNuxtApp()

const { data: podcasts } = await useAsyncData(
  'podcasts',
  async () => {
    const { data } = await $supabase
      .from('podcast')
      .select()

    if (data) {
      return data
    } else {
      return []
    }
  }
)
</script>