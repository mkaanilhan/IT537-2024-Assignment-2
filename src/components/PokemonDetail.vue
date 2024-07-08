<template>
  <div class="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto font-roboto">
    <div class="flex flex-col md:flex-row items-center md:items-start mb-8">
      <img :src="pokemonImage" :alt="pokemon.name" class="w-64 h-64 object-contain mb-4 md:mb-0 md:mr-8">
      <div class="text-center md:text-left">
        <h2 class="text-4xl font-press-start capitalize mb-2">{{ pokemon.name }}</h2>
        <!-- <p class="text-2xl text-gray-600 mb-4 font-press-start">#{{ pokemon.id.toString().padStart(3, '0') }}</p> -->
        <div class="flex justify-center md:justify-start gap-2 mb-4">
          <span 
            v-for="type in pokemon.types" 
            :key="type.type.name"
            class="px-4 py-1 rounded-full text-white text-sm font-semibold"
            :class="getTypeColor(type.type.name)"
          >
            {{ type.type.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-2xl font-press-start mb-4">Abilities</h3>
        <ul class="list-disc list-inside">
          <li v-for="ability in pokemon.abilities" :key="ability.ability.name" class="capitalize mb-2">
            {{ ability.ability.name }}
            <span v-if="ability.is_hidden" class="text-sm text-gray-500 ml-2">(Hidden)</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-2xl font-press-start mb-4">Stats</h3>
        <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="mb-4">
          <div class="flex justify-between items-center mb-1">
            <span class="capitalize font-semibold flex items-center">
              <span class="w-8 inline-block font-press-start text-sm mr-2">{{ getStatAbbr(stat.stat.name) }}</span>
              {{ stat.stat.name }}
            </span>
            <span class="font-bold">{{ stat.base_stat }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div 
              :class="['bg-gradient-to-r', getStatColor(stat.stat.name)]"
              class="h-3 rounded-full transition-all duration-500 ease-out" 
              :style="{ width: `${(stat.base_stat / 255) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

const pokemonImage = computed(() => {
  return props.pokemon.sprites.other['official-artwork'].front_default;
});

const getTypeColor = (type) => {
  const colors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300'
  };
  return colors[type] || 'bg-gray-500';
};

const getStatColor = (statName) => {
  const colors = {
    hp: 'from-red-500 to-red-600',
    attack: 'from-orange-500 to-orange-600',
    defense: 'from-yellow-500 to-yellow-600',
    'special-attack': 'from-blue-500 to-blue-600',
    'special-defense': 'from-green-500 to-green-600',
    speed: 'from-pink-500 to-pink-600'
  };
  return colors[statName.toLowerCase()] || 'from-gray-500 to-gray-600';
};

const getStatAbbr = (statName) => {
  const abbrs = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    speed: 'SPD'
  };
  return abbrs[statName.toLowerCase()] || statName.substring(0, 3).toUpperCase();
};
</script>