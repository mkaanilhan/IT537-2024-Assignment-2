<template>
  <div id="app">
    <header class="bg-yellow-500 text-white p-4 flex justify-between items-center">
      <div class="flex items-center">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="Pokemon Ball"
          class="w-10 h-10 cursor-pointer mr-2"
          @click="goHome"
        />
        <h1 class="text-2xl font-bold cursor-pointer" @click="goHome">Pokedex</h1>
      </div>
      <a href="#" class="text-white hover:underline">Login</a>
    </header>
    <main class="p-4" v-if="currentView === 'Home'">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          class="bg-white rounded-lg shadow p-4 hover:bg-gray-100 transition cursor-pointer"
          v-for="item in displayedList"
          :key="item.name"
          @click="viewDetails(item.name)"
        >
          <img
            :src="getPokemonImageUrl(item.url)"
            alt="Pokemon Image"
            class="rounded-t-lg w-full"
          />
          <p class="text-center mt-2 font-bold text-black">{{ item.name }}</p>
        </div>
      </div>
    </main>
    <main class="p-4" v-else-if="currentView === 'Details'">
      <div class="pokemon-details bg-gray-800 text-white min-h-screen p-6 rounded-lg shadow-md mx-auto" style="max-width: 800px;">
        <template v-if="isLoading">
          <p class="text-center text-xl font-semibold">Loading...</p>
        </template>
        <template v-else>
          <div class="flex flex-col md:flex-row md:items-center">
            <div class="flex-shrink-0">
              <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`" :alt="pokemon.name" class="w-64 h-64 mx-auto md:mx-0">
            </div>
            <div class="mt-4 md:mt-0 md:ml-6">
              <h1 class="text-5xl font-bold mb-4 capitalize">{{ pokemon.name }}</h1>
              <p class="text-lg">{{ getFlavorText(pokemon.species.flavor_text_entries) }}</p>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg shadow-md text-black">
              <h2 class="text-xl font-bold bg-blue-500 p-2 rounded">Height</h2>
              <p>{{ (pokemon.height / 10).toFixed(1) }} m</p>
            </div>
            <div class="p-4 rounded-lg shadow-md text-black">
              <h2 class="text-xl font-bold bg-blue-500 p-2 rounded">Weight</h2>
              <p>{{ (pokemon.weight / 10).toFixed(1) }} kg</p>
            </div>
            <div class="p-4 rounded-lg shadow-md text-black">
              <h2 class="text-xl font-bold bg-green-500 p-2 rounded">Category</h2>
              <p>{{ getCategory(pokemon.species.genera) }}</p>
            </div>
            <div class="p-4 rounded-lg shadow-md text-black">
              <h2 class="text-xl font-bold bg-green-500 p-2 rounded">Abilities</h2>
              <p>{{ pokemon.abilities.map(a => a.ability.name).join(', ') }}</p>
            </div>
            <div class="p-4 rounded-lg shadow-md text-black">
              <h2 class="text-xl font-bold bg-purple-500 p-2 rounded">Types</h2>
              <p>{{ pokemon.types.map(t => t.type.name).join(', ') }}</p>
            </div>
            <div class="p-4 rounded-lg shadow-md text-black">
              <h2 class="text-xl font-bold bg-purple-500 p-2 rounded">Base Experience</h2>
              <p>{{ pokemon.base_experience }}</p>
            </div>
            <div class="p-4 rounded-lg shadow-md text-black">
              <h2 class="text-xl font-bold bg-yellow-500 p-2 rounded">Stats</h2>
              <canvas id="statsChart"></canvas>
            </div>
          </div>
          <div class="mt-6">
            <button @click="goHome" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Back to Home</button>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      list: [],
      displayedList: [],
      limit: 12,
      offset: 0,
      currentView: 'Home',
      pokemon: null,
      isLoading: true,
    };
  },
  async created() {
    await this.fetchPokemon();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`);
      const res = await response.json();
      this.list = [...this.list, ...res.results];
      this.displayedList = this.list.slice(0, this.displayedList.length + this.limit);
      this.offset += this.limit;
    },
    getPokemonImageUrl(url) {
      const pokemonId = url.split('/')[6];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.displayedList.length < this.list.length) {
        this.displayedList = this.list.slice(0, this.displayedList.length + this.limit);
      } else {
        this.fetchPokemon();
      }
    },
    async viewDetails(name) {
      this.isLoading = true;
      this.currentView = 'Details';
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();
        this.pokemon = { ...pokemonData, species: speciesData };
        nextTick(() => {
          this.createChart();
        });
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
      } finally {
        this.isLoading = false;
      }
    },
    goHome() {
      this.currentView = 'Home';
      window.scrollTo(0, 0);
    },
    getFlavorText(entries) {
      const entry = entries.find(entry => entry.language.name === 'en');
      return entry ? entry.flavor_text : 'No description available.';
    },
    getCategory(genera) {
      const genus = genera.find(genus => genus.language.name === 'en');
      return genus ? genus.genus : 'Unknown';
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    createChart() {
      const ctx = document.getElementById('statsChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.pokemon.stats.map(stat => this.capitalize(stat.stat.name)),
          datasets: [{
            label: 'Base Stats',
            data: this.pokemon.stats.map(stat => stat.base_stat),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

header {
  background-color: #ffcb05;
  color: white;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 2rem;
  font-weight: bold;
}

header img {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
}

main {
  padding: 1em;
  flex-grow: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1em;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.bg-white {
  background-color: white;
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-4 {
  padding: 1rem;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.transition {
  transition: background-color 0.2s;
}

.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 0.5rem;
}

.font-bold {
  font-weight: bold;
}

.text-black {
  color: black;
}

.w-full {
  width: 100%;
}

.rounded-t-lg {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.cursor-pointer {
  cursor: pointer;
}

.pokemon-details {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 0.5rem;
}

.pokemon-details img {
  max-width: 100%;
  height: auto;
}

h2 {
  margin-top: 0.5rem;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.bg-green-500 {
  background-color: #10b981;
}

.bg-purple-500 {
  background-color: #8b5cf6;
}

.bg-yellow-500 {
  background-color: #f59e0b;
}

.text-black {
  color: #000;
}

.bg-blue-500, .bg-green-500, .bg-purple-500, .bg-yellow-500 {
  padding: 0.5rem;
  border-radius: 0.25rem;
}
</style>
