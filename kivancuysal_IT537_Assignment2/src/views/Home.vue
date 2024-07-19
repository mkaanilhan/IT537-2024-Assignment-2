<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl text-center mb-8">Pokedex</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div class="text-center mt-8">
      <button @click="loadMore" class="bg-blue-500 text-white px-4 py-2 rounded">Load More</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PokemonCard from '../components/PokemonCard.vue'

export default {
  name: 'Home',
  components: {
    PokemonCard
  },
  data() {
    return {
      pokemons: [],
      offset: 0,
      limit: 20,
    }
  },
  async created() {
    this.loadPokemons()
  },
  methods: {
    async loadPokemons() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
      const results = response.data.results
      const newPokemons = await Promise.all(results.map(async (pokemon, index) => {
        const pokemonDetails = await axios.get(pokemon.url)
        return {
          id: this.offset + index + 1,
          name: pokemon.name,
          image: pokemonDetails.data.sprites.front_default
        }
      }))
      this.pokemons = [...this.pokemons, ...newPokemons]
      this.offset += this.limit
    },
    loadMore() {
      this.loadPokemons()
    }
  }
}
</script>
