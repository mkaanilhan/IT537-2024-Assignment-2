<template>
  <div class="pokemon-card bg-gray-100 p-4 rounded-md shadow-md">
    <router-link :to="`/pokemon/${pokemon.url.split('/').slice(-2)[0]}`">
      <h2 class="text-xl font-semibold capitalize">{{ pokemon.name }}</h2>
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: Object
});
</script>

<style scoped>
</style>
