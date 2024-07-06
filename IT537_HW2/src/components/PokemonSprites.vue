<template>
  <div class="pokemon-sprites">
    <h2 class="text-xl font-semibold mb-4">Sprites</h2>
    <div class="flex flex-wrap gap-4">
      <div v-for="(sprite, name) in pokemon.sprites" :key="name" class="sprite-item">
        <img :src="sprite" :alt="name" class="w-24 h-24 rounded-lg shadow-md">
        <p class="text-center">{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: Object
});
</script>

<style scoped>
.pokemon-sprites {
  margin-top: 2rem;
}

.sprite-item {
  text-align: center;
}
</style>
