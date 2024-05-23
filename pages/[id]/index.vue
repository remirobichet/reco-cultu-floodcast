<template>
  <div class="text-5xl font-bold line-clamp-3">
    {{ data.podcast?.name }}
  </div>
  <p class="text-md text-muted-foreground line-clamp-3">
    {{ data.podcast?.description }}
  </p>
  <p class="text-md">
    {{ data.podcast?.date }}
  </p>

  <div class="flex flex-row gap-4">
    <div class="flex flex-col gap-2">
      <div class="text-2xl font-medium mb-8">Recommandations</div>
      <div class="flex flex-col gap-4">
        <div v-for="recommendation in data.recommendations">
          <NuxtLink :to="`participant/${recommendation.participant.id}`">
            <div class="flex items-center gap-2">
              <Avatar class="flex h-9 w-9">
                <AvatarImage :src="recommendation.participant.avatar"
                  :alt="`${recommendation.participant.name} avatar`" />
                <AvatarFallback>{{ recommendation.participant.name[0] }}</AvatarFallback>
              </Avatar>
              <p class="text-lg font-bold">{{ recommendation.participant.name }}</p>
            </div>
          </NuxtLink>
          <blockquote class="p-4 my-4 border-s-4">
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
