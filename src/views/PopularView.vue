<script setup>
import { ref, onMounted, computed } from 'vue';
import { movieService } from '../services/api'; 
import MovieCard from '../components/MovieCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const movies = ref([]);
const search = ref('');

onMounted(async () => {
  try {
    movies.value = await movieService.getPopular();
  } catch (error) {
    console.error("Greška:", error);
  }
});

// Ovdje filtriramo: Ocjena >= 7 I pretraga po imenu
const topRatedMovies = computed(() => {
  return movies.value.filter(film => {
    const isHighRated = film.vote_average >= 7;
    const matchesSearch = film.title.toLowerCase().includes(search.value.toLowerCase());
    return isHighRated && matchesSearch;
  });
});

const goToDetails = (id) => {
  router.push({ name: 'movieDetails', params: { id } });
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <header class="mb-12 text-center">
      <h2 class="text-4xl font-black text-white uppercase italic mb-4">
        Top <span class="text-red-600">Hitovi</span> (7+)
      </h2>
      <p class="text-gray-400 mb-8">Prikazujemo samo najbolje ocijenjene naslove iz naše baze.</p>
      
      <div class="relative max-w-md mx-auto">
        <input 
          v-model="search" 
          type="text"
          placeholder="Pretraži najbolje ocijenjene..." 
          class="w-full pl-6 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600 transition-all"
        />
      </div>
    </header>

    <div v-if="topRatedMovies.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <MovieCard
        v-for="film in topRatedMovies"
        :key="film.id"
        :movie="film"
        @view-details="goToDetails"
      />
    </div>
    
    <div v-else class="text-center py-20">
      <p class="text-gray-500">Trenutno nema filmova s ocjenom iznad 7.0 u ovoj kategoriji.</p>
    </div>
  </div>
</template>