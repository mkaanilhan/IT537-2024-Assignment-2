<template>
  <div class="pokemon-details bg-gradient-to-r from-blue-400 to-indigo-500 text-white min-h-screen p-6">
    <template v-if="isLoading">
      <p class="text-center text-xl font-semibold">Loading...</p>
    </template>
    <template v-else>
      <h1 class="text-5xl font-bold mb-6 text-center capitalize">{{ pokemon.name }}</h1>
      <div class="flex justify-center mb-6">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="w-64 h-64 rounded-full border-4 border-white shadow-lg">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(detail, key) in pokemonDetails" :key="key" class="bg-white text-gray-800 p-6 rounded-md shadow-md">
          <h2 class="text-lg font-semibold capitalize">{{ key }}</h2>
          <p>{{ detail }}</p>
        </div>
      </div>
      <router-link to="/" class="mt-6 block text-center text-lg font-semibold underline">Back to Home</router-link>
    </template>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pokemon = ref(null);
const pokemonDetails = ref({});
const isLoading = ref(true);

onMounted(async () => {
  const { id } = route.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemon.value = response.data;
    pokemonDetails.value = {
      'Height': `${response.data.height / 10} m`,
      'Weight': `${response.data.weight / 10} kg`,
      'Base Experience': response.data.base_experience,
      'Abilities': response.data.abilities.map(a => a.ability.name).join(', '),
      'Types': response.data.types.map(t => t.type.name).join(', '),
      'Base Stats': response.data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')
    };
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.pokemon-details {
  max-width: 800px;
  margin: 0 auto;
}

.pokemon-details img {
  max-width: 100%;
  height: auto;
}
</style>
