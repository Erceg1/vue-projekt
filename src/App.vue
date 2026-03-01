<script setup>
import HomeView from './views/HomeView.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 antialiased">
    <HomeView />
  </div>
</template>

<style>
/* Globalni stilovi ako su potrebni, inače Tailwind rješava sve */
body {
  margin: 0;
  padding: 0;
}
</style>