<template>
  <div class="container mx-auto max-w-md p-4 shadow-lg rounded-lg bg-white">
    <button @click="$router.go(-1)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300 ease-in-out">
      Back
    </button>
    <div v-if="pokemon" class="text-center p-8 rounded-lg" :style="getTypeBgColor(pokemon.types[0].type.name, true)">
      <h1 class="text-4xl font-bold mb-4 capitalize">{{ pokemon.name }}</h1>
      <img :src="pokemon.sprites.front_default" alt="pokemon image" class="mx-auto mb-4 w-48 h-48 rounded-full shadow-lg">
      
      <div class="text-lg mb-4">
        <p class="mb-2"><strong>Type:</strong></p>
        <div class="flex justify-center space-x-2">
          <div v-for="type in pokemon.types" :key="type.type.name" class="px-4 py-2 rounded-lg text-white" :style="getTypeBgColor(type.type.name)">
            {{ type.type.name }}
          </div>
        </div>
      </div>
      
      <div class="text-lg mb-4">
        <p class="mb-2"><strong>Height:</strong> {{ pokemon.height }}</p>
        <p class="mb-2"><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <p class="mb-2"><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
      </div>
      <div class="text-lg mb-4">
        <p class="mb-2"><strong>Abilities:</strong></p>
        <ul class="list-disc list-inside">
          <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
            {{ ability.ability.name }}
          </li>
        </ul>
      </div>
      <div class="text-lg">
        <p class="mb-2"><strong>Stats:</strong></p>
        <ul class="list-none">
          <li v-for="stat in pokemon.stats" :key="stat.stat.name" class="mb-2">
            <div class="flex justify-between">
              <span>{{ stat.stat.name }}</span>
              <span>{{ stat.base_stat }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4">
              <div :style="{ width: `${stat.base_stat}%` }" class="bg-green-500 h-4 rounded-full"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemon: null,
      randomBgColor: `background-color: ${this.getRandomColor()}`
    };
  },
  created() {
    this.fetchPokemonDetails();
  },
  methods: {
    async fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`);
        this.pokemon = response.data;
      } catch (error) {
        console.error(error);
      }
    },
     getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getTypeBgColor(type, transparent) {
        const typeColors = {
          normal: '#A8A77A',
          fire: '#EE8130',
          water: '#6390F0',
          electric: '#F7D02C',
          grass: '#7AC74C',
          ice: '#96D9D6',
          fighting: '#C22E28',
          poison: '#A33EA1',
          ground: '#E2BF65',
          flying: '#A98FF3',
          psychic: '#F95587',
          bug: '#A6B91A',
          rock: '#B6A136',
          ghost: '#735797',
          dragon: '#6F35FC',
          dark: '#705746',
          steel: '#B7B7CE',
          fairy: '#D685AD'
        }
        const color = typeColors[type] || '#A8A77A'; 
       
        function   hexToRgba(hex, alpha) {
          const bigint = parseInt(hex.slice(1), 16);
          const r = (bigint >> 16) & 255;
          const g = (bigint >> 8) & 255;
          const b = bigint & 255;

          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        if (transparent) {
          
          const rgbaColor = hexToRgba(color, 0.5);
          return {
            backgroundColor: rgbaColor
          };
        }

         return {
          backgroundColor: color
        };
      },

     
  },
};
</script>

<style scoped>
.container {
  padding-left: 64px;
  padding-right: 64px;
}
</style>
