<template>
    <div class="mt-8">
      <h3 class="text-2xl font-press-start mb-4">Special Moves</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <span v-for="move in moves.slice(0, 15)" :key="move.move.name" 
              class="bg-gray-200 px-3 py-1 rounded-full text-sm capitalize">
          {{ move.move.name }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PokemonAbilities",
    props: {

      moves: {
        type: Array,
        required: true
      }
    },
   
   
  }
  </script>