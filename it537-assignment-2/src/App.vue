<template>
  <div id="app">
    <header class="bg-red py-4 px-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-red-600">Pokedex</h1>
      <nav>
        <a href="#" class="text-red-600 font-semibold hover:text-red-700">Login</a>
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

/* You can add any global styles here */