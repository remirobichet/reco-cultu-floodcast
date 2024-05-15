<template>
  <div class="text-2xl font-bold line-clamp-3">
    {{ data.podcast.name }}
  </div>
  <p class="text-xs text-muted-foreground line-clamp-3">
    {{ data.podcast.description }}
  </p>
  <p class="text-xs">
    {{ data.podcast.date }}
  </p>

  <div class="flex flex-row gap-4">
    <div class="flex flex-col gap-2">
      <div class="text-lg font-medium">Participants</div>
      <div class="flex flex-row gap-2">
        <NuxtLink v-for="participant in data.participants" :to="`/participant/${participant.id}`">
          {{ participant.name }}
        </NuxtLink>
      </div>
    </div>
  </div>

  <div class="flex flex-row gap-4">
    <div class="flex flex-col gap-2">
      <div class="text-lg font-medium">Recommandations</div>
      <div class="flex flex-row gap-2">
        <div v-for="recommendation in data.recommendations">
          <div>{{ recommendation.participant.name }} :</div>
          <div>{{ recommendation.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  validate({ params }) {
    return /^[0-9]{1,2}-[0-9]{1,2}$/.test(params.id);
  }
});

const route = useRoute()

const { $supabase } = useNuxtApp()

const { data } = await useAsyncData(
  'podcasts',
  async () => {
    const response = {
      podcast: undefined,
      participants: [],
      recommendations: [],
    }

    const season = parseInt(route.params.id.split('-')[0])
    const episode = parseInt(route.params.id.split('-')[1])
    const { data: podcast } = await $supabase
      .from('podcast')
      .select()
      .eq('season', season)
      .eq('episode', episode)
      .single()

    if (podcast) {
      response.podcast = podcast
    }

    const { data: participants } = await $supabase
      .from('podcast_participant')
      .select('*, participant!inner (*)')
      .eq('podcast_id', podcast.id)

    if (participants) {
      response.participants = participants.map((participant) => participant.participant)
    }

    const { data: recommendations } = await $supabase
      .from('recommendation')
      .select('*, participant!inner (*)')
      .eq('podcast_id', podcast.id)

    if (recommendations) {
      response.recommendations = recommendations
    }

    return response
  }
)
</script>
