<template>
  <div class="text-lg font-medium">Participants</div>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
    <NuxtLink v-for="participant in participants" :to="`participant/${participant.id}`">
      <Card class="cursor-pointer hover:bg-accent">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-1">
        </CardHeader>
        <CardContent class="flex items-center gap-3">
          <Avatar class="flex h-9 w-9">
            <AvatarImage :src="participant.avatar" :alt="`${participant.name} avatar`" />
            <AvatarFallback>{{ participant.name[0] }}</AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">
              {{ participant.name }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ participant.participationCount }} participations
            </p>
          </div>
        </CardContent>
      </Card>
    </NuxtLink>
  </div>
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const { $supabase } = useNuxtApp()

const { data: participants } = await useAsyncData(
  'participants',
  async () => {
    const { data: participants } = await $supabase
      .from('participant')
      .select()

    const { data: participations } = await $supabase
      .from('podcast_participant')
      .select()
      .in('participant_id', participants.map((participant) => participant.id))

    participants.forEach((participant) => {
      const participationCount = participations.filter((participation) => participation.participant_id === participant.id).length
      participant.participationCount = participationCount
    })

    if (participants) {
      return participants
    } else {
      return []
    }
  }
)
</script>
