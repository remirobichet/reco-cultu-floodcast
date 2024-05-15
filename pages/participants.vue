<template>
  <div class="flex flex-row gap-4">
    <div class="flex flex-col gap-2">
      <div class="text-lg font-medium">Participants</div>
      <div class="flex flex-row gap-2">
        <div v-for="participant in participants">
          {{ participant.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $supabase } = useNuxtApp()

const { data: participants } = await useAsyncData(
  'participants',
  async () => {
    const { data: participants } = await $supabase
      .from('participant')
      .select()

    if (participants) {
      return participants
    } else {
      return []
    }
  }
)
</script>
