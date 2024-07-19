<template>
  <main>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      <div 
        v-for="pokemon in pokemonList" 
        :key="pokemon.name" 
        class="bg-white rounded-lg shadow p-4 cursor-pointer"
        @click="goToPokemonDetail(pokemon.name)"
      >
        <img :src="pokemon.image" :alt="pokemon.name" class="rounded-t-lg w-full">
        <p class="text-center mt-2 capitalize">{{ pokemon.name }}</p>
      </div>
      <div v-if="loadingMore" v-for="i in 20" :key="`loading-${i}`" class="bg-gray-200 rounded-lg shadow p-4 animate-pulse">
        <div class="w-full h-32 bg-gray-300 rounded-t-lg"></div>
        <div class="h-4 bg-gray-300 rounded mt-2 w-3/4 mx-auto"></div>
      </div>
    </div>
    <div class="mt-4 text-center">
      <button 
        @click="loadMore" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        :disabled="loadingMore"
      >
        {{ loadingMore ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const pokemonList = ref([]);
    const loadingMore = ref(false);
    const offset = ref(0);

    const fetchPokemons = async () => {
      loadingMore.value = true;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset.value}`);
        const data = await response.json();
        
        const newPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              image: details.sprites.front_default
            };
          })
        );
        
        pokemonList.value = [...pokemonList.value, ...newPokemon];
        offset.value += 20;
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        loadingMore.value = false;
      }
    };

    const loadMore = () => {
      fetchPokemons();
    };

    const goToPokemonDetail = (name) => {
      router.push({ name: 'PokemonDetails', params: { name } });
    };

    onMounted(() => {
      fetchPokemons();
    });

    return {
      pokemonList,
      loadingMore,
      loadMore,
      goToPokemonDetail
    };
  }
}
</script>