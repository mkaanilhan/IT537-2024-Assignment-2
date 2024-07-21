<template>
    <div id="spec-attack-container" class="my-4">
      <h4 id="spec-attack-title" class="text-xl font-bold mb-3">Special Attacks</h4>
      <div class="flex flex-wrap gap-2">
        <div v-for="(attack, index) in limitedSpecialAttacks" :key="attack.move.name" class="type-box px-2 py-1 border border-gray-300 rounded-full" :class="getColorClass(index)">
          {{ attack.move.name }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SpecialAttacks",
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    },
    computed: {
      limitedSpecialAttacks() {
        return this.pokemon.moves.slice(0, 5);
      }
    },
    methods: {
      getColorClass(index) {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
        return colors[index % colors.length];
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  