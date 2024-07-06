<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card bg-gray-100 p-4 rounded-md shadow-md">
      <router-link :to="`/pokemon/${pokemon.id}`">
        <h2 class="text-xl font-semibold capitalize">{{ pokemon.name }}</h2>
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="mt-2">
      </router-link>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const pokemons = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    pokemons.value = response.data.results.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
});

{ pokemons }
</script>

<style scoped>
.pokemon-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.pokemon-card:hover {
  transform: translateY(-5px);
}
</style>
