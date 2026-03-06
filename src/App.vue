<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue'; 
import Footer from './components/footer.vue'; 
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 antialiased flex flex-col">
    <Navbar />

    <main class="grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style>
/* Globalni stilovi */
body {
  margin: 0;
  padding: 0;
  background-color: #030712; /* bg-gray-950 */
}

/* Glatka tranzicija između stranica (opcionalno) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>