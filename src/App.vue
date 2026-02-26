<script setup>
import { ref, onMounted } from 'vue';
import { movieService } from './services/api'; 
import MovieCard from './components/MovieCard.vue'; // 1. IMPORTAJ KARTICU

const movies = ref([]);

onMounted(async () => {
  movies.value = await movieService.getPopular();
});
</script>

<template>
  <div class="min-h-screen bg-gray-950 p-8 text-white">
    <h1 class="text-3xl font-bold mb-8">Popularni filmovi</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MovieCard v-for="film in movies" :key="film.id" :movie="film" />
    </div>
  </div>
</template>