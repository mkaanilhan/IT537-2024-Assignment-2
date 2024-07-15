<template>
    <div v-if="loading" class="text-center">
      Loading...
    </div>
    <div v-else-if="pokemon" class="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto font-roboto">
      <PokemonHeader :pokemon="pokemon" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PokemonAbilities :abilities="pokemon.abilities" />
        <PokemonStats :stats="pokemon.stats" />
      </div>
      <PokemonMoves :moves="pokemon.moves" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import PokemonHeader from '@/components/PokemonHeader.vue';
  import PokemonAbilities from '@/components/PokemonAbilities.vue';
  import PokemonStats from '@/components/PokemonStats.vue';
  import PokemonMoves from '@/components/PokemonMoves.vue';
  
  export default {
    components: {
      PokemonHeader,
      PokemonAbilities,
      PokemonStats,
      PokemonMoves
    },
    setup() {
      const route = useRoute();
      const pokemon = ref(null);
      const loading = ref(true);
  
      onMounted(async () => {
        const name = route.params.name;
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          pokemon.value = await response.json();
        } catch (error) {
          console.error('Error fetching Pokemon details:', error);
        } finally {
          loading.value = false;
        }
      });
  
      return {
        pokemon,
        loading
      };
    }
  }
  </script>