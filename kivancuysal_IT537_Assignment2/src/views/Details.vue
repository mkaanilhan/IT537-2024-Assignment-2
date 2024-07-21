<template>
  <div>
    <router-link to="/" class="text-blue-500">Back to Home</router-link>
    <div v-if="pokemon" class="mt-8">
      <h1 class="text-3xl">{{ pokemon.name }}</h1>
      <img :src="pokemon.sprites.front_default" alt="pokemon.name" class="my-4">
      <p><strong>Height:</strong> {{ pokemon.height }}</p>
      <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
      <p><strong>Abilities:</strong> <span v-for="ability in pokemon.abilities" :key="ability.ability.name">{{ ability.ability.name }} </span></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'Details',
  data() {
    return {
      pokemon: null
    }
  },
  async created() {
    const id = this.$route.params.id
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    this.pokemon = response.data
  }
}
</script>

