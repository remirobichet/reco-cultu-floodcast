<template>
  <h3 class="text-2xl font-bold line-clamp-3">
    Podcasts avec {{ data.participant.name }}
  </h3>

  <NuxtLink v-for="podcast in data.podcasts" :to="`/${podcast.season}-${podcast.episode}`">
    <Card class="cursor-pointer hover:bg-accent">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-lg font-medium">
          S{{ podcast.season }}E{{ podcast.episode }}
        </CardTitle>
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

<script setup>
definePageMeta({
  validate({ params }) {
    return /^[0-9]*$/.test(params.id);
  }
});

const route = useRoute()

const { $supabase } = useNuxtApp()

const { data } = await useAsyncData(
  'participations',
  async () => {
    const response = {
      podcasts: undefined,
      participant: undefined,
    }

    const { data: participant } = await $supabase
      .from('participant')
      .select()
      .eq('id', route.params.id)
      .single()

    if (participant) {
      response.participant = participant
    }

    const { data: podcasts } = await $supabase
      .from('podcast')
      .select('*, podcast_participant!inner (*)')
      .eq('podcast_participant.participant_id', route.params.id)

    if (podcasts) {
      response.podcasts = podcasts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    return response
  }
)
</script>
