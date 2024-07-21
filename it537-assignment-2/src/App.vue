<template>
  <div id="app">
    <header class="bg-red-600 py-4 px-6 flex justify-between items-center">
      <div class="flex items-center">
        <img src="/pokeball.png" alt="Pokeball" class="w-8 h-8 mr-2">
        <h1 class="text-3xl font-bold text-white">Pokedex</h1>
      </div>
      <nav class="flex items-center">
        <a href="#" class="text-white font-semibold hover:text-red-200 ml-4">Login</a>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
.header-nav {
  margin-left: auto;
}
</style>


/* You can add any global styles here */