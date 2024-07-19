<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold mb-4 bg-red-600 text-white p-2 rounded">
      Pokedex
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(pokemon, index) in pokemons"
        :key="pokemon.name"
        :class="['shadow-md', 'rounded', 'p-4', 'text-center']"
        :style="bgGradient(pokemon.types)"
      >
        <router-link
          :to="{ name: 'PokemonDetails', params: { name: pokemon.name } }"
        >
          <img
            :src="getPokemonImageUrl(index + 1)"
            :alt="pokemon.name"
            class="w-24 h-24 object-cover mb-2 mx-auto"
          />
          <p class="text-lg font-medium capitalize">{{ pokemon.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pokemons: [],
    };
  },
  mounted() {
    this.fetchPokemons();
  },
  methods: {
    async fetchPokemons() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonDetails = await Promise.all(
          response.data.results.map((pokemon) => axios.get(pokemon.url))
        );
        this.pokemons = pokemonDetails.map((detail) => detail.data);
      } catch (error) {
        console.error(error);
      }
    },
    getPokemonImageUrl(id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    },
    bgGradient(types) {
      const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
      };

      if (types.length > 1) {
        const color1 = typeColors[types[0].type.name] || "#A8A77A";
        const color2 = typeColors[types[1].type.name] || "#C6C6A7";
        return {
          background: `linear-gradient(45deg, ${color1} 45%, ${color2} 55%)`,
        };
      } else {
        const color = typeColors[types[0].type.name] || "#A8A77A";
        return {
          background: color,
        };
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
