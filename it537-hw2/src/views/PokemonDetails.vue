<template>
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
        <div class="bg-blue-500 p-4 rounded-lg shadow-md text-black">
          <h2 class="text-xl font-bold">Height</h2>
          <p>{{ (pokemon.height / 10).toFixed(1) }} m</p>
        </div>
        <div class="bg-blue-500 p-4 rounded-lg shadow-md text-black">
          <h2 class="text-xl font-bold">Weight</h2>
          <p>{{ (pokemon.weight / 10).toFixed(1) }} kg</p>
        </div>
        <div class="bg-green-500 p-4 rounded-lg shadow-md text-black">
          <h2 class="text-xl font-bold">Category</h2>
          <p>{{ getCategory(pokemon.species.genera) }}</p>
        </div>
        <div class="bg-green-500 p-4 rounded-lg shadow-md text-black">
          <h2 class="text-xl font-bold">Abilities</h2>
          <p>{{ pokemon.abilities.map(a => a.ability.name).join(', ') }}</p>
        </div>
        <div class="bg-purple-500 p-4 rounded-lg shadow-md text-black">
          <h2 class="text-xl font-bold">Types</h2>
          <p>{{ pokemon.types.map(t => t.type.name).join(', ') }}</p>
        </div>
        <div class="bg-purple-500 p-4 rounded-lg shadow-md text-black">
          <h2 class="text-xl font-bold">Base Experience</h2>
          <p>{{ pokemon.base_experience }}</p>
        </div>
        <div class="bg-yellow-500 p-4 rounded-lg shadow-md text-black">
          <h2 class="text-xl font-bold">Stats</h2>
          <canvas id="statsChart"></canvas>
        </div>
      </div>
      <div class="mt-6">
        <button @click="goHome" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Back to Home</button>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      pokemon: null,
      isLoading: true,
    };
  },
  async created() {
    await this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      const { name } = this.$route.params;
      this.isLoading = true;
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();
        this.pokemon = { ...pokemonData, species: speciesData };
        this.$nextTick(() => {
          this.createChart();
        });
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
      } finally {
        this.isLoading = false;
      }
    },
    goHome() {
      this.$router.push('/');
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
</style>
