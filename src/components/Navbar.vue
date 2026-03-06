<template>
  <nav class="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      
      <router-link to="/" class="text-2xl font-black tracking-tighter text-white uppercase italic">
        Film<span class="text-red-600">Sfera</span>
      </router-link>

      <div class="hidden md:flex items-center space-x-8">
        <router-link to="/" class="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors">Početna</router-link>
        <router-link to="/popular" class="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors">Popularno</router-link>
      </div>

      <div class="flex items-center space-x-4">
        <button class="hidden sm:block bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-all transform hover:scale-105">
          Prijava
        </button>

        <button @click="isOpen = !isOpen" class="md:hidden text-white focus:outline-none p-2">
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-if="isOpen" class="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-gray-800 py-6 px-6 flex flex-col space-y-4">
        <router-link @click="isOpen = false" to="/" class="text-lg font-medium text-gray-300 hover:text-red-500 transition-colors">Početna</router-link>
        <router-link @click="isOpen = false" to="/popular" class="text-lg font-medium text-gray-300 hover:text-red-500 transition-colors">Popularno</router-link>
        <hr class="border-gray-800">
        <button class="w-full bg-red-600 text-white py-3 rounded-xl font-bold">
          Prijava
        </button>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// Stanje za otvaranje/zatvaranje hamburgera
const isOpen = ref(false);
</script>

<style scoped>
.router-link-active {
  color: #ef4444 !important;
}

/* Animacija za glatko otvaranje mobilnog menija */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease-in-out;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>