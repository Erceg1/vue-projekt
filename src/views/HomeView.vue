<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
// VAŽNO: Provjeri u folderu 'services' zove li se fajl 'tmdb.ts' ili 'api.ts' 
// Ako je 'api.ts', promijeni putanju ispod u '../services/api'
import { getPopularMovies } from '../services/tmdb'; 
import MovieCard from '../components/MovieCard.vue';

const movies = ref([]);
const searchQuery = ref('');

// 1. Dohvaćanje podataka (Bodovi za HTTP)
onMounted(async () => {
  try {
    const data = await getPopularMovies();
    movies.value = data;
  } catch (error) {
    console.error("Greška pri dohvaćanju filmova:", error);
  }
});

// 2. Logika pretrage (Bodovi za Computed)
const filteredMovies = computed(() => {
  return movies.value.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center text-white">Popularni Filmovi</h1>

    <div class="flex justify-center mb-10">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Pretraži filmove po naslovu..." 
        class="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <div v-if="filteredMovies.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <MovieCard 
        v-for="film in filteredMovies" 
        :key="film.id" 
        :movie="film" 
      />
    </div>

    <div v-else class="text-center text-gray-400 mt-10 text-xl">
      Nije pronađen nijedan film s tim nazivom.
    </div>
  </div>
</template>