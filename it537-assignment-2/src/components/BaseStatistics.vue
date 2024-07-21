<template>
    <div id="base-stats-container" class="mt-8 w-full">
      <table class="w-full border-collapse">
        <tr>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Height</span><br />{{ pokemon.height / 10 }} m
          </td>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Weight</span><br />{{ pokemon.weight / 10 }} kg
          </td>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Type</span><br />{{ pokemon.types.map(t => t.type.name).join('/') }}
          </td>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Generation</span><br />{{ pokemon.species.generation.name.split(' ')[1] }}
          </td>
        </tr>
        <tr>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Max HP</span><br />{{ pokemon.stats[0].base_stat }}
          </td>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Max CP</span><br />{{ pokemon.base_experience }}
          </td>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Attack</span><br />{{ pokemon.stats[1].base_stat }}
          </td>
          <td class="p-2 border border-gray-300 text-left">
            <span class="text-blue-500 font-bold">Defense</span><br />{{ pokemon.stats[2].base_stat }}
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "BaseStatistics",
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  