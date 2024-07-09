<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card bg-gray-100 p-4 rounded-md shadow-md">
        <router-link :to="`/pokemon/${pokemon.id}`">
          <h2 class="text-xl font-semibold capitalize">{{ pokemon.name }}</h2>
          <img :src="pokemon.imageUrl" :alt="pokemon.name" class="mt-2">
        </router-link>
      </div>
    </div>
    <button @click="loadMore" class="mt-4 p-2 bg-blue-500 text-white rounded" :disabled="loading">
      Load More
    </button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const pokemons = ref([]);
const offset = ref(0);
const limit = 20;
const loading = ref(false);

const fetchPokemons = async (offset, limit) => {
  try {
    loading.value = true;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const pokemonResults = response.data.results;

    const pokemonDetails = pokemonResults.map((pokemon, index) => ({
      id: offset + index + 1,
      name: pokemon.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${offset + index + 1}.svg`
    }));

    pokemons.value = [...pokemons.value, ...pokemonDetails];
    loading.value = false;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    loading.value = false;
  }
};

onMounted(() => {
  fetchPokemons(offset.value, limit);
});

const loadMore = () => {
  offset.value += limit;
  fetchPokemons(offset.value, limit);
};
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
