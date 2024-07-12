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
import { Quote as QuoteIcon, Podcast } from 'lucide-vue-next'

const { $supabase } = useNuxtApp()

const open = ref()
const search = ref('')
const resultsEpisode = ref()
const resultsRecommandation = ref()

const getResults = async () => {
  if (!search.value) {
    return
  }
  const { data: resEpisode } = await $supabase
    .from('podcast')
    .select()
    .or(`name.ilike.%${search.value}%,description.ilike.%${search.value}%`)
  resultsEpisode.value = resEpisode || []

  const { data: resRecommandation } = await $supabase
    .from('recommendation')
    .select('*, podcast!inner (*), participant!inner (*)')
    .or(`text.ilike.%${search.value}%`)
  resultsRecommandation.value = resRecommandation || []
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
        <!-- <code class="max-h-[400px] overflow-auto"><pre>{{ [...resultsEpisode, ...resultsRecommandation] }}</pre></code> -->
        <div v-if="resultsEpisode || resultsRecommandation" class="max-h-[400px] overflow-auto flex flex-col">
          <div v-if="resultsEpisode.length > 0" class="flex items-center gap-2 my-6">
            <Podcast class="h-6 w-6" />
            <span class="text-lg">Parmis les épisodes</span>
          </div>
          <div v-for="(podcast, $index) in resultsEpisode" class="px-2">
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
            <hr v-if="$index + 1 !== resultsEpisode.length" class="my-6">
          </div>
          <div v-if="resultsRecommandation.length > 0" class="flex items-center gap-2 my-6">
            <QuoteIcon class="h-6 w-6" />
            <span class="text-lg">Parmis les recommandations</span>
          </div>
          <div v-for="(recommandation, $index) in resultsRecommandation" class="px-2">
            <NuxtLink :key="recommandation.podcast.id"
              :to="`/${recommandation.podcast.season}-${recommandation.podcast.episode}`" @click="open = false">
              <div>
                <div class="text-2xl font-bold line-clamp-1">
                  {{ recommandation.podcast.name }} - S{{ recommandation.podcast.season }}E{{
                    recommandation.podcast.episode }}
                </div>
                <div class="flex gap-3 items-center">
                  <Avatar class="flex h-9 w-9">
                    <AvatarImage v-if="recommandation.participant.avatar" :src="recommandation.participant.avatar"
                      :alt="`${recommandation.participant.name} avatar`" />
                    <AvatarFallback>{{ recommandation.participant.name[0] }}</AvatarFallback>
                  </Avatar>
                  <div class="flex flex-col">
                    <span class="text-lg">{{ recommandation.participant.name }}</span>
                    <span class="text-xs text-muted-foreground">{{ recommandation.text }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
            <hr v-if="$index + 1 !== resultsRecommandation.length" class="my-6">
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>