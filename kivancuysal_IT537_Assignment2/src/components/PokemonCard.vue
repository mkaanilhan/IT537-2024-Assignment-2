<template>
  <div class="p-4 border rounded hover:bg-gray-100">
    <router-link :to="{ name: 'Details', params: { id: pokemon.id }}">
      <h2 class="text-xl text-center">{{ pokemon.name }}</h2>
      <div class="flex justify-center items-center">
        <img :src="pokemon.image" alt="pokemon.name" class="w-32 h-32 object-contain">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
}
</script>

