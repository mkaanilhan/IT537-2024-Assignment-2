<template>
  <div class="pokemon-details bg-gray-800 text-white min-h-screen p-6 rounded-lg shadow-md mx-auto max-w-4xl">
    <template v-if="isLoading">
      <p class="text-center text-xl font-semibold">Loading...</p>
    </template>
    <template v-else>
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex-shrink-0">
          <img :src="pokemon.imageUrl" :alt="pokemon.name" class="w-64 h-64 mx-auto md:mx-0">
        </div>
        <div class="mt-4 md:mt-0 md:ml-6">
          <h1 class="text-5xl font-bold mb-4 capitalize">{{ pokemon.name }}</h1>
          <p class="text-lg">{{ getFlavorText(pokemon.species.flavor_text_entries) }}</p>
        </div>
      </div>
      <BaseStatistics :pokemon="pokemon" />
      <SpecialAttacks :pokemon="pokemon" />
      <Weaknesses :pokemon="pokemon" />
      <Evolutions :pokemon="pokemon" />
      <div class="mt-6">
        <button @click="goHome" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Back to Home</button>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue';
import HeaderInformation from '@/components/HeaderInformation.vue';
import BaseStatistics from '@/components/BaseStatistics.vue';
import SpecialAttacks from '@/components/SpecialAttacks.vue';
import Weaknesses from '@/components/Weaknesses.vue';
import Evolutions from '@/components/Evolutions.vue';

export default {
  data() {
    return {
      pokemon: null,
      isLoading: true,
      evolutionChain: null,
    };
  },
  async created() {
    await this.fetchPokemon();
  },
  watch: {
    '$route.params.name': 'fetchPokemon'
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
        this.pokemon = { ...pokemonData, species: speciesData, imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png` };

        // Fetch evolution chain
        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();
        this.evolutionChain = evolutionChainData;
        this.pokemon.previous_evolution = await this.getPreviousEvolutions(evolutionChainData.chain, pokemonData.name);
        this.pokemon.next_evolution = await this.getNextEvolutions(evolutionChainData.chain, pokemonData.name);

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
      this.$router.push({ name: 'Home' });
    },
    getFlavorText(entries) {
      const entry = entries.find(entry => entry.language.name === 'en');
      return entry ? entry.flavor_text : 'No description available.';
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
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async getPreviousEvolutions(chain, name) {
      const evolutions = [];
      let current = chain;
      while (current && current.species.name !== name) {
        const speciesResponse = await fetch(current.species.url);
        const speciesData = await speciesResponse.json();
        evolutions.push({
          name: current.species.name,
          url: speciesData.varieties[0].pokemon.url,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesData.id}.png`,
        });
        current = current.evolves_to[0];
      }
      return evolutions.reverse();
    },
    async getNextEvolutions(chain, name) {
      const evolutions = [];
      let current = chain;
      while (current && current.species.name !== name) {
        current = current.evolves_to[0];
      }
      if (current) {
        for (const evolution of current.evolves_to) {
          const speciesResponse = await fetch(evolution.species.url);
          const speciesData = await speciesResponse.json();
          evolutions.push({
            name: evolution.species.name,
            url: speciesData.varieties[0].pokemon.url,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesData.id}.png`,
          });
        }
      }
      return evolutions;
    }
  },
  components: {
    HeaderInformation,
    BaseStatistics,
    SpecialAttacks,
    Weaknesses,
    Evolutions
  }
};
</script>

<style scoped>
.pokemon-details {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 0.5rem;
  background-color: #2d3748;
  padding: 2rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.pokemon-details img {
  max-width: 100%;
  height: auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
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

button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2563eb;
}
</style>
