<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <PokemonCard 
      v-for="pokemon in pokemons" 
      :key="pokemon.name" 
      :pokemon="pokemon" 
    />
  </div>
</template>

<script setup>
import PokemonCard from './PokemonCard.vue';

defineProps({
  pokemons: {
    type: Array,
    required: true
  }
});
</script>