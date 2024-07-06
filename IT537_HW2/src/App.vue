<template>
  <div>
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">Pokedex</router-link>
        <nav>
          <router-link to="/" class="text-gray-300 hover:text-white mr-4">Home</router-link>
          <router-link to="/about" class="text-gray-300 hover:text-white">About</router-link>
        </nav>
      </div>
    </header>
    <main class="container mx-auto mt-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
/* Add your global styles here */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f0f0;
}
</style>
