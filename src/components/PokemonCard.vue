<template>
  <router-link 
    :to="{ name: 'pokemonDetail', params: { id: pokemonId } }"
    class="block bg-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
  >
    <div class="border-4 border-gray-200 rounded-lg overflow-hidden">
      <div class="bg-gray-100 p-4">
        <img :src="pokemonImage" :alt="pokemon.name" class="w-32 h-32 mx-auto">
      </div>
      <div class="p-4 border-t-4 border-gray-200">
        <h2 class="text-xl font-bold text-center capitalize">{{ pokemon.name }}</h2>
        <!-- <p class="text-center text-gray-600">#{{ pokemonId.padStart(3, '0') }}</p> -->
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

const pokemonId = computed(() => {
  return props.pokemon.url.split('/').filter(Boolean).pop();
});

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`;
});
</script>