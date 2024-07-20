<template>
  <div>
    <header class="bg-red-500 text-white p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Pokedex</h1>
      <a href="#" class="text-white hover:underline">Login</a>
    </header>

    <main class="p-4">
      <div class="mb-4 flex justify-center">
        <input 
          type="text" 
          v-model="searchTerm" 
          @input="filterPokemons"
          placeholder="Search Pokémon" 
          class="px-4 py-2 border rounded w-full max-w-md"
        />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        <div 
          class="bg-white rounded-lg shadow p-4 hover:bg-gray-100 transition duration-300" 
          v-for="pokemon in filteredPokemons" 
          :key="pokemon.name"
        >
          <router-link :to="{ name: 'details', params: { name: pokemon.name } }">
            <img 
              :src="pokemon.image" 
              alt="Pokemon Image" 
              class="rounded-t-lg w-full mb-2"
            />
            <p class="text-center mt-2 capitalize font-medium">{{ pokemon.name }}</p>
          </router-link>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <button 
          class="bg-red-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50" 
          @click="previousPage" 
          :disabled="page === 1"
        >
          Previous
        </button>
        <button 
          class="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50" 
          @click="nextPage"
          :disabled="page === totalPages"
        >
          Next
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      searchTerm: '',
      page: 1,
      limit: 20,
      totalPages: 0
    }
  },
  async created() {
    await this.fetchPokemons()
  },
  methods: {
    async fetchPokemons() {
      try {
        const offset = (this.page - 1) * this.limit
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.limit}`)
        const data = await response.json()
        const pokemonData = data.results
        
        const detailedDataPromises = pokemonData.map(pokemon => fetch(pokemon.url).then(res => res.json()))
        const detailedDataResponses = await Promise.all(detailedDataPromises)
                
        this.pokemons = detailedDataResponses.map(response => ({
          name: response.name,
          image: response.sprites.front_default
        }))

        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.includes(this.searchTerm.toLowerCase()))

        this.totalPages = Math.ceil(data.count / this.limit)
      } catch (error) {
        console.error(error)
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++
        this.fetchPokemons()
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page--
        this.fetchPokemons()
      }
    },
    filterPokemons() {
      this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.includes(this.searchTerm.toLowerCase()))
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
button:disabled {
  cursor: not-allowed;
}
</style>
