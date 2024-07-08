<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="pokemon" class="pokemon-detail">
      <PokemonDetail :pokemon="pokemon" />
    </div>
    <div v-else class="text-center text-2xl font-bold">Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PokemonDetail from '@/components/PokemonDetail.vue';

const route = useRoute();
const pokemon = ref(null);

const fetchPokemonDetails = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`);
    pokemon.value = await response.json();
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
  }
};

onMounted(fetchPokemonDetails);
</script>