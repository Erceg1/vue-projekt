<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
  </div>

  <div v-else-if="movie" class="container mx-auto p-6">
    <div class="flex flex-col md:flex-row gap-8 bg-gray-900 text-white rounded-xl overflow-hidden shadow-2xl">
      
      <div class="md:w-1/3">
        <img 
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
          :alt="movie.title"
          class="w-full h-full object-cover shadow-lg"
        />
      </div>

      <div class="md:w-2/3 p-8 flex flex-col justify-center">
        <h1 class="text-4xl font-bold mb-2">{{ movie.title }}</h1>
        <p class="text-gray-400 italic mb-4">{{ movie.tagline }}</p>
        
        <div class="flex items-center gap-4 mb-6">
          <span class="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
            ⭐ {{ movie.vote_average.toFixed(1) }}
          </span>
          <span class="text-gray-300">{{ movie.release_date.split('-')[0] }}</span>
          <span class="text-gray-300">{{ movie.runtime }} min</span>
        </div>

        <h3 class="text-xl font-semibold mb-2 text-blue-400">Opis</h3>
        <p class="leading-relaxed text-gray-300 mb-6">
          {{ movie.overview }}
        </p>

        <div class="border-t border-gray-700 pt-4">
          <p><span class="text-gray-500">Žanrovi:</span> {{ movie.genres.map(g => g.name).join(', ') }}</p>
          <p><span class="text-gray-500">Produkcija:</span> {{ movie.production_companies.map(c => c.name).slice(0, 2).join(', ') }}</p>
        </div>
        
        <button @click="$router.back()" class="mt-8 self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
          Nazad
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { movieService } from '../services/movieService.js';

const route = useRoute();
const movie = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    
    // 1. Uzmi ID iz URL-a
    const movieId = route.params.id;
    
    movie.value = await movieService.getDetails(movieId);
    
  } catch (error) {
    console.error("Greška pri učitavanju detalja filma:", error);
  } finally {
    loading.value = false;
  }
});
</script>