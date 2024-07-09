<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getPokemon } from '@/service/service'
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import _ from 'lodash'
import { getImageUrl } from '@/utils/utils'

const idParam = useRoute().params.id
const imageUrl = getImageUrl(parseInt(idParam as string))
const pokemon = ref(null)

onMounted(async () => {
  pokemon.value = await getPokemon(idParam as string)
})
</script>

<template lang="pug">


div(class="flex flex-col justify-center items-center p-10 h-[calc(100vh-130px)]")
  div(class="bg-gray-200 p-5 w-full md:w-[400px] h-min-[500px] rounded-lg flex flex-col items-center hover:bg-gray-300 transition duration-300 ease-in-out")
    div(class="flex flex-col items-center")
      div(class="flex justify-between w-full")
        img(:src="imageUrl" alt="Vue logo" width="200" height="50" class="m-auto")
        
      div(class="flex flex-col")
        p
          span(class="font-bold") Name:
          span {{  _.capitalize(pokemon?.name)  }}
        p
          span(class="font-bold") Height:
          span {{ pokemon?.height }}
        p
          span(class="font-bold") Weight:
          span {{ pokemon?.weight }}
        p
          span(class="font-bold") Abilities:
          span(v-for="ability, index in pokemon?.abilities") {{ _.capitalize(ability.ability.name) }}{{ index !== pokemon?.abilities.length - 1 ? `,` : '' }}
        p 
          span(class="font-bold") Types:
          span(v-for="type in pokemon?.types") {{ _.capitalize(type.type.name)  }}
  RouterLink(to="/" class="mt-10 p-3 bg-black text-white rounded-lg hover:bg-orange-500 cursor-pointer") Go Home
         
  
</template>
