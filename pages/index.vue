<template>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
    <template v-if="pending">
      <Skeleton v-for="el in [, , , , , ,]" class="h-[125px] w-[250px] rounded-xl" />
    </template>
    <template v-else>
      <NuxtLink v-for="podcast in podcasts" :to="`/${podcast.season}-${podcast.episode}`">
        <Card class="cursor-pointer hover:bg-accent">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-lg font-medium">
              S{{ podcast.season }}E{{ podcast.episode }}
            </CardTitle>
            <!-- <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon">
                    <Link class="h-4 w-4 text-muted-foreground" />
                    <span class="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    @select="() => { navigateTo('https://open.spotify.com/episode/4T2It9cktMVeChjxa7iY87?si=2970fc5a2d4f4b47', { open: { target: '_blank' } }) }">
                    <span>Spotify</span>
                    <DropdownMenuShortcut>↗</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> -->
          </CardHeader>
          <CardContent class="flex flex-col gap-3">
            <div class="text-2xl font-bold line-clamp-3">
              {{ podcast.name }}
            </div>
            <p class="text-xs text-muted-foreground line-clamp-3">
              {{ podcast.description }}
            </p>
            <p class="text-xs">
              {{ podcast.date }}
            </p>
          </CardContent>
        </Card>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const { $supabase } = useNuxtApp()

const { pending, data: podcasts } = await useAsyncData(
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