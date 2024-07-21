<template>
  <div class="pokemon-details bg-white text-gray-900 min-h-screen p-8 mx-auto max-w-4xl">
    <template v-if="isLoading">
      <p class="text-center text-xl font-semibold">Loading...</p>
    </template>
    <template v-else>
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex-shrink-0">
          <img :src="pokemon.imageUrl" :alt="pokemon.name" class="w-64 h-64 mx-auto md:mx-0 rounded-lg shadow-md">
        </div>
        <div class="mt-4 md:mt-0 md:ml-8">
          <h1 class="text-4xl font-extrabold mb-4 capitalize text-blue-600">{{ pokemon.name }}</h1>
          <p class="text-lg text-gray-700">{{ getFlavorText(pokemon.species.flavor_text_entries) }}</p>
          <div class="mt-4">
            <p class="text-lg"><span class="font-semibold">Height:</span> {{ pokemon.height }}</p>
            <p class="text-lg"><span class="font-semibold">Weight:</span> {{ pokemon.weight }}</p>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <BaseStatistics :pokemon="pokemon" />
        <SpecialAttacks :pokemon="pokemon" class="special-attacks-list mt-4"/>
        <Weaknesses :pokemon="pokemon" />
        <Evolutions :pokemon="pokemon" />
      </div>
      <div class="mt-8 text-center">
        <button @click="goHome" class="bg-green-500 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 transition">Back to Home</button>
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
  background-color: #ffffff;
  padding: 2rem;
}

.pokemon-details img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.bg-green-500 {
  background-color: #10b981;
}

.text-gray-900 {
  color: #1a202c;
}

.text-gray-700 {
  color: #4a5568;
}

button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: #10b981;
  color: white;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #059669;
}

.special-attacks-list p {
  margin-bottom: 0.5rem;
}
</style>
