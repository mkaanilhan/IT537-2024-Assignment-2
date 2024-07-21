<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold mb-4 bg-red-600 text-white p-2 rounded">Pokedex</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(pokemon, index) in pokemons"
        :key="pokemon.name"
        :class="['shadow-md', 'rounded', 'p-4', 'text-center', bgColor(index)]"
      >
        <router-link :to="{ name: 'PokemonDetails', params: { name: pokemon.name } }">
          <img :src="getPokemonImageUrl(index + 1 + offset)" :alt="pokemon.name" class="w-24 h-24 object-cover mb-2 mx-auto" />
          <p class="text-lg font-medium capitalize">{{ pokemon.name }}</p>
        </router-link>
      </div>
    </div>
    <button
      @click="loadMore"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Load More
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemons: [],
      offset: 0,
      limit: 10,
    };
  },
  mounted() {
    this.fetchPokemons();
  },
  methods: {
    async fetchPokemons() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`);
        this.pokemons = this.pokemons.concat(response.data.results);
        this.offset += this.limit;
      } catch (error) {
        console.error(error);
      }
    },
    getPokemonImageUrl(id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    },
    bgColor(index) {
      const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200'];
      return colors[index % colors.length];
    },
    loadMore() {
      this.fetchPokemons();
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
