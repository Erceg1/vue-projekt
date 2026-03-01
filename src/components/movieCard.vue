<script setup>
import { computed } from 'vue';

// Definiranje propsa - Prima objekt 'movie' od roditelja
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

// Definiranje emita - Šalje ID filma roditeljskoj komponenti na klik
const emit = defineEmits(['view-details']);

// Formatiranje ocjene na jednu decimalu (npr. 7.8)
const formattedRating = computed(() => {
  return props.movie.vote_average ? props.movie.vote_average.toFixed(1) : 'N/A';
});

// Izvlačenje samo godine iz datuma (npr. "2024-05-10" -> "2024")
const releaseYear = computed(() => {
  if (!props.movie.release_date) return 'Nepoznato';
  return props.movie.release_date.split('-')[0];
});
</script>

<template>
  <div 
    @click="emit('view-details', movie.id)"
    class="group relative flex flex-col h-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-red-500/10 hover:-translate-y-2"
  >
    <div class="relative aspect-2/3 overflow-hidden">
      <img 
        :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/500x750?text=Nema+Slike'" 
        :alt="movie.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div class="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div class="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-yellow-400 font-bold text-sm shadow-xl">
        <span>⭐</span>
        {{ formattedRating }}
      </div>
    </div>
    
    <div class="flex flex-col grow p-5 space-y-4">
      <h3 class="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-red-500 transition-colors duration-300">
        {{ movie.title }}
      </h3>
      
      <div class="mt-auto flex items-center justify-between pt-4 border-t border-gray-800">
        <div class="flex flex-col">
          <span class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Godina</span>
          <span class="text-sm text-gray-300 font-medium">{{ releaseYear }}</span>
        </div>
        
        <span class="inline-flex items-center gap-1 text-xs font-black uppercase text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          Detalji 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>