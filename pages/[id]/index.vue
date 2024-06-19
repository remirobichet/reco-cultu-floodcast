<template>
  <div class="flex items-end gap-5">
    <span class="text-6xl font-bold">
      <span class="text-muted-foreground">S</span>
      <span>{{ data.podcast?.season }}</span>
      <span class="text-muted-foreground">E</span>
      <span>{{ data.podcast?.episode }}</span>
    </span>
    <span class="text-5xl font-bold line-clamp-3">
      {{ data.podcast?.name }}
    </span>
  </div>
  <p class="text-md text-muted-foreground line-clamp-3">
    {{ data.podcast?.description }}
  </p>
  <p class="text-md">
    {{ $dayjs(data.podcast?.date).format('ll') }}
  </p>

  <div class="flex flex-row gap-4">
    <div class="flex flex-col gap-2">
      <div class="text-2xl font-medium mb-8">Recommandations</div>
      <div class="flex flex-col gap-4">
        <div v-if="data.groupedRecommendations?.length < 1" class="text-xl text-muted-foreground italic">Aucune
          recommandation pour cet épisode 😴</div>
        <div v-else v-for="group in data.groupedRecommendations">
          <NuxtLink :to="`participant/${group.participant.id}`">
            <div class="flex items-center gap-2">
              <Avatar class="flex h-9 w-9">
                <AvatarImage v-if="group.participant.avatar" :src="group.participant.avatar"
                  :alt="`${group.participant.name} avatar`" />
                <AvatarFallback>{{ group.participant.name[0] }}</AvatarFallback>
              </Avatar>
              <p class="text-lg font-bold">{{ group.participant.name }}</p>
            </div>
          </NuxtLink>
          <blockquote v-for="recommendation in group.recommendations" class="p-4 my-4 border-s-4">
            <CategoryBadge v-for="category in recommendation.categories" :category="category" class="mb-2 mr-2" />
            <pre v-html="recommendation.text" class="text-xl leading-relaxed font-sans whitespace-break-spaces"></pre>
          </blockquote>
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
      groupedRecommendations: [],
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

    const { data: recommendations } = await $supabase
      .from('recommendation')
      .select('*, participant!inner (*)')
      .eq('podcast_id', podcast.id)

    if (recommendations) {
      const groupedRecommendations = recommendations.reduce((acc, recommendation) => {
        if (!acc.find(el => el.participant.id === recommendation.participant_id)) {
          acc.push({ participant: recommendation.participant, recommendations: [] })
        }
        const participantRecommendations = acc.find(el => el.participant.id === recommendation.participant.id).recommendations
        participantRecommendations.push(recommendation)
        return acc
      }, [])
      response.groupedRecommendations = groupedRecommendations
    }

    return response
  }
)
</script>
