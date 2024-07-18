<template>
  <main>
    
    <div v-if="loading" class="text-center">
      Loading...
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      <div 
        v-for="pokemon in pokemonList" 
        :key="pokemon.name" 
        class="bg-white rounded-lg shadow p-4 cursor-pointer"
        @click="goToPokemonDetail(pokemon.name)"
      >
        <img :src="pokemon.image" :alt="pokemon.name" class="rounded-t-lg w-full">
        <p class="text-center mt-2 capitalize">{{ pokemon.name }}</p>
      </div>
    </div>
    <div class="mt-4 text-center">
      <button @click="loadMore" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Load More
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pokemonList: [],
      loading: true,
      offset: 0
    }
  },
  methods: {
    async fetchPokemons() {
      this.loading = true
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${this.offset}`)
      const data = await response.json()
      
      const newPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          const details = await res.json()
          return {
            name: pokemon.name,
            image: details.sprites.front_default
          }
        })
      )
      
      this.pokemonList = [...this.pokemonList, ...newPokemon]
      this.loading = false
    },
    loadMore() {
      this.offset += 30
      this.fetchPokemons()
    },
    goToPokemonDetail(name) {
      this.$router.push({ name: 'PokemonDetails', params: { name } })
    }
  },
  async created() {
    await this.fetchPokemons()
    
    // Fetch Ditto as requested
    const dittoResponse = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    const dittoData = await dittoResponse.json()
    console.log('Ditto data:', dittoData)
  }
}
</script>