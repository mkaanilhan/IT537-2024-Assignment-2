<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center my-8 capitalize">{{ pokemon.name }}</h1>
      <div v-if="pokemon" class="flex flex-col items-center">
        <img :src="pokemon.sprites.front_default" alt="Pokemon Image" class="mb-4" />
        <p class="text-lg">Height: {{ pokemon.height }}</p>
        <p class="text-lg">Weight: {{ pokemon.weight }}</p>
        <p class="text-lg">Base Experience: {{ pokemon.base_experience }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['name'],
    data() {
      return {
        pokemon: null
      }
    },
    async created() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`)
        this.pokemon = await response.json()
      } catch (error) {
        console.error(error)
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  </style>
  