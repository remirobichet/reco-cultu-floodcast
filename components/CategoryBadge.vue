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
  video_game: '🎮',
  youtube: '▶️',
  book: '📚',
  instagram: '📷',
  podcast: '🎙️',
  website: '🌐',
}

const textMapping: { [key: string]: string } = {
  movie: 'Film',
  comic: 'BD',
  show: 'Série',
  video_game: 'Jeu vidéo',
  youtube: 'Youtube',
  book: 'Livre',
  instagram: 'Instagram',
  podcast: 'Podcast',
  website: 'Site web',
}
</script>

<template>
  <Badge variant="secondary">{{ iconMapping[props.category] }} {{ textMapping[props.category] }}</Badge>
</template>