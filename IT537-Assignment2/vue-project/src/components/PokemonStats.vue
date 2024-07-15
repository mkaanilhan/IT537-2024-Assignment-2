<template>
    <div>
      <h3 class="text-2xl font-press-start mb-4">Stats</h3>
      <div v-for="stat in stats" :key="stat.stat.name" class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="capitalize font-semibold flex items-center">
            <span class="w-8 inline-block font-press-start text-sm mr-2">{{ getStatAbbr(stat.stat.name) }}</span>
            {{ stat.stat.name }}
          </span>
          <span class="font-bold">{{ stat.base_stat }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3">
          <div :class="['bg-gradient-to-r', getStatColor(stat.stat.name)]"
               class="h-3 rounded-full transition-all duration-500 ease-out"
               :style="{ width: `${(stat.base_stat / 255) * 100}%` }">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      stats: {
        type: Array,
        required: true
      }
    },
    setup() {
      const getStatColor = (statName) => {
        const colors = {
          hp: 'from-red-500 to-red-600',
          attack: 'from-orange-500 to-orange-600',
          // ... diğer statlar için renkler
        };
        return colors[statName.toLowerCase()] || 'from-gray-500 to-gray-600';
      };
  
      const getStatAbbr = (statName) => {
        const abbrs = {
          hp: 'HP',
          attack: 'ATK',
          // ... diğer statlar için kısaltmalar
        };
        return abbrs[statName.toLowerCase()] || statName.substring(0, 3).toUpperCase();
      };
  
      return {
        getStatColor,
        getStatAbbr
      };
    }
  }
  </script>