<script setup lang="ts">
const props = defineProps({
  category: {
    type: String,
    enum: ['movie', 'comic', 'show', 'video_game'],
    default: () => ''
  }
})

const iconMapping: { [key: string]: string } = {
  movie: '🎬',
  comic: '💬',
  show: '📺',
  video_game: '🎮'
}

const textMapping: { [key: string]: string } = {
  movie: 'Film',
  comic: 'BD',
  show: 'Série',
  video_game: 'Jeu vidéo'
}
</script>

<template>
  <Badge variant="secondary">{{ iconMapping[props.category] }} {{ textMapping[props.category] }}</Badge>
</template>