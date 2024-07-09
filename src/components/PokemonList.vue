<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PokemonCard from './PokemonCard.vue'
import { computed, onMounted, ref } from 'vue'
import _ from 'lodash'
import { getPokemons } from '@/service/service'
//import { useQuery } from 'vue-query'

const search = ref('')
const pokemonList = ref<Record<string, any>[]>([])

const filteredPokemonList = computed(() => {
  return pokemonList.value.filter((pokemon) => {
    return _.includes(pokemon.name, _.lowerCase(search.value))
  })
})

onMounted(() => {
  getPokemons().then((response) => {
    pokemonList.value = response.results
  })
})
</script>

<template lang="pug">


main(class="text-red-400 max-w-7xl mx-auto flex justify-center flex-col items-center")
  input(class="p-2  m-auto border border-gray-300 rounded-lg  mt-7 w-[80%] md:w-[50%]" type="text" placeholder="Search Pokemon" v-model="search")
  div(class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-10 w-full")
    PokemonCard(v-for="pokemon in filteredPokemonList" :key="pokemon.name" :name="pokemon.name" :url="pokemon.url")


</template>
