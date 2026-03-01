<script setup>
import {ref, onMounted, computed} from 'vue';
import {movieService} from '../services/api'; // alat koji je osoba 1 napravila
import MovieCard from '../components/MovieCard.vue'; // kalup za karticu

const  movies = ref([]); // ovde se spremaju svi filmovi sa interneta
const search = ref('') // ovde se sprema sve ono sto se tipka u search bar

//Pokreće se čim se stranica učita
onMounted(async () =>{
    //zovemo api i spremamo nase filomove u listu
    movies.value = await movieService.getPopular();
});

// pametna lista koja prati pretragu
const filteredMovies = computed(()=> {
    //uzme sve filmove i zadrzi samo one ciji naslov sadrzi slova iz search-a
    return movies.value.filter(film => 
        film.title.toLowerCase().includes(search.value.toLowerCase())
    );
});
</script>

<template>
    <div class="p-8 bg-gray-950 min-h-screen text-white">
        <h1 class="text-3xl font-bold mb-8 text-center text-red-600">FILMOVI</h1>

        <div class="flex justify-center mb-8">
            <input 
                v-model="search" 
                placeholder="Pretraži..." 
                class="p-3 rounded bg-gray-800 w-full max-w-md border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
            />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MovieCard
                v-for="film in filteredMovies"
                :key="film.id"
                :movie="film"
            />
        </div>
    </div>
</template>