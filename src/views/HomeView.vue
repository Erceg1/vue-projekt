<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // 1. Uvezi router
import { movieService } from '../services/api'; // Provjeri zove li se api ili movieService.js
import MovieCard from '../components/MovieCard.vue';
import Footer from '../components/footer.vue';

const router = useRouter(); // 2. Inicijaliziraj router
const movies = ref([]); 
const search = ref('');

onMounted(async () => {
  try {
    movies.value = await movieService.getPopular();
  } catch (error) {
    console.error("Greška pri dohvaćanju filmova:", error);
  }
});

const filteredMovies = computed(() => {
  return movies.value.filter(film => 
    film.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

// 3. Popravi funkciju za navigaciju
const goToDetails = (id) => {
  // Promijeni ime da točno odgovara onome u routeru (movieDetails)
  router.push({ 
    name: 'movieDetails', 
    params: { id: id } 
  });
};
</script>

<template>
  <main class="max-w-7xl mx-auto px-6 py-12">
    <header class="flex flex-col items-center mb-12 space-y-6">
      <h1 class="text-5xl font-black tracking-tighter text-white uppercase italic">
        Film<span class="text-red-600">Sfera</span>
      </h1>
      
      <div class="relative w-full max-w-xl group">
        <span class="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-red-500 transition-colors">
          🔍
        </span>
        <input 
          v-model="search" 
          type="text"
          placeholder="Pretraži naslove filmova..." 
          class="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all shadow-2xl"
        />
      </div>
    </header>

    <div 
      v-if="filteredMovies.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <MovieCard
        v-for="film in filteredMovies"
        :key="film.id"
        :movie="film"
        @view-details="goToDetails"
      />
    </div>

    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
      <div class="text-6xl mb-4">🎬</div>
      <h2 class="text-2xl font-bold text-white">Nema rezultata za "{{ search }}"</h2>
      <p class="text-gray-500 mt-2">Pokušajte upisati neki drugi pojam.</p>
      <button 
        @click="search = ''" 
        class="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
      >
        Prikaži sve filmove
      </button>
    </div>

    <Footer />
  </main>
</template>