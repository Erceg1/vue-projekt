<script setup>
import { computed } from 'vue';

// Osoba 1: Definiranje propsa - 20 bodova
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['view-details']);

// Korištenje computed propertija za zaokruživanje ocjene - 5 bodova
const formattedRating = computed(() => {
  return props.movie.vote_average ? props.movie.vote_average.toFixed(1) : 'N/A';
});
</script>

<template>
  <div 
    @click="emit('view-details', movie.id)"
    class="group bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-800 flex flex-col transform hover:-translate-y-1"
  >
    <div class="relative overflow-hidden aspect-[2/3]">
      <img 
        :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'https://via.placeholder.com/500x750?text=Nema+Slike'" 
        :alt="movie.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-gray-700">
        ⭐ {{ formattedRating }}
      </div>
    </div>
    
    <div class="p-5 flex-grow flex flex-col justify-between bg-gray-900">
      <div>
        <h3 class="text-white font-extrabold text-lg leading-tight line-clamp-2 group-hover:text-red-500 transition-colors">
          {{ movie.title }}
        </h3>
      </div>
      <div class="flex justify-between items-center mt-4 pt-3 border-t border-gray-800">
        <span class="text-gray-500 text-xs font-medium uppercase tracking-wider">
          {{ movie.release_date ? movie.release_date.split('-')[0] : 'Nepoznato' }}
        </span>
        <span class="text-red-500 text-xs font-bold uppercase group-hover:underline">
          Detalji →
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dodatak za skraćivanje naslova na 2 reda (line-clamp) ako Tailwind plugin nije instaliran */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>