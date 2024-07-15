<template>
    <div class="flex flex-col md:flex-row items-center md:items-start mb-8">
      <img :src="pokemonImage" :alt="pokemon.name" class="w-64 h-64 object-contain mb-4 md:mb-0 md:mr-8">
      <div class="text-center md:text-left">
        <h2 class="text-4xl font-press-start capitalize mb-2">{{ pokemon.name }}</h2>
        <p class="text-2xl text-gray-600 mb-4 font-press-start">#{{ pokemon.id.toString().padStart(3, '0') }}</p>
        <div class="flex justify-center md:justify-start gap-2 mb-4">
          <span v-for="type in pokemon.types" :key="type.type.name" 
                class="px-4 py-1 rounded-full text-white text-sm font-semibold"
                :class="getTypeColor(type.type.name)">
            {{ type.type.name }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const pokemonImage = computed(() => props.pokemon.sprites.other['official-artwork'].front_default);
  
      const getTypeColor = (type) => {
        const colors = {
          normal: 'bg-gray-400',
          fire: 'bg-red-500',
          water: 'bg-blue-500',
          // ... diğer tipler için renkler
        };
        return colors[type] || 'bg-gray-500';
      };
  
      return {
        pokemonImage,
        getTypeColor
      };
    }
  }
  </script>