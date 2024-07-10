<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const { $supabase } = useNuxtApp()

const open = ref()
const search = ref('')
const results = ref()

const getResults = async () => {
  if (!search.value) {
    return
  }
  const { data: resPodcast } = await $supabase
    .from('podcast')
    .select()
    .or(`name.ilike.%${search.value}%,description.ilike.%${search.value}%`)
  results.value = resPodcast
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline" class="hover:bg-background">
        <Search class="w-4 h-4 mr-2 text-muted-foreground" />
        Rechercher
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[400px] md:max-w-[720px]">
      <DialogHeader>
        <DialogTitle>Rechercher</DialogTitle>
        <DialogDescription>
          Rechercher parmis les episodes, les participants ou les recommandations
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex gap-4">
          <Input v-model="search" id="search" class="col-span-3" @keyup.enter="getResults" />
          <Button type="submit" @click="getResults">
            Rechercher
          </Button>
        </div>
        <div v-if="results" class="max-h-[400px] overflow-auto flex flex-col">
          <div v-for="(podcast, $index) in results" class="px-2">
            <NuxtLink :key="podcast.id" :to="`/${podcast.season}-${podcast.episode}`" @click="open = false">
              <div>
                <div class="text-2xl font-bold line-clamp-1">
                  {{ podcast.name }} - S{{ podcast.season }}E{{ podcast.episode }}
                </div>
                <p class="text-xs text-muted-foreground line-clamp-2">
                  {{ $dayjs(podcast.date).format('ll') }} - {{ podcast.description }}
                </p>
              </div>
            </NuxtLink>
            <hr v-if="$index + 1 !== results.length" class="my-6">
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>