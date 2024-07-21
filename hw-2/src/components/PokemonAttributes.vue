<script>
import { computed } from 'vue'
import {
    usePokemonDetailStore
} from "../stores/pokemonDetails.js"
export default {
    data() {
        return {
            store: usePokemonDetailStore(),
            pokemonId: this.$route.params.id,
            pokemonName: this.$route.params.name,
            pokemonBaseInfo: [],
            pokemonInfo: [],

        }
    },
    methods: {
        getPokemonBaseInfo(id) {
            this.pokemonBaseInfo = this.store.pokemonDetailList[id - 1]
        },

    },
    async mounted() {

            const responsePa = await fetch(this.pokemonBaseInfo.url)
            this.pokemonInfo  = await responsePa.json()
            
    }
}
</script>

<template>
<div :class="this.getPokemonBaseInfo(pokemonId)">
    <div class="p-4 flex justify-between bg-gray-400 rounded-lg items-center mt-2 ml-2 mr-2">
        <div class="flex gap-4 justify-start">
            <div class="w-10 h-10">
                <img src="https://img.icons8.com/?size=100&id=TYcqVDaDnqWb&format=png&color=000000" />
            </div>
            <div class="text-3xl text-white capitalize">
                {{pokemonName}}
            </div>
        </div>
        <RouterLink to="/" class="text-white">Back</RouterLink>
    </div>

    <div class="flex justify-start">
        <div class="border border-black w-2/5 h-96 mt-2 ml-2">
            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`" class="w-32 h-32 mx-auto my-auto">
        </div>
        <div class="border border-black w-3/5 h-96 mt-2 ml-2 mr-2">
            <div v-for="(type, index) in this.pokemonInfo.types" :key="index">
                {{type.type.name}}
            </div>
        </div>
    </div>
    <div class="flex justify-start">
        <div class="border border-black mt-2 w-3/5 h-96 ml-2">
        <div v-for="(stat, index) in this.pokemonInfo.stats" :key="index">
            {{stat.stat.name}} : {{stat.base_stat}}
        </div>
        </div>
        <div class="border border-black mt-2 w-2/5 h-96 ml-2 mr-2">
        <div>
           Weight: {{pokemonInfo.weight}} -- Height: {{pokemonInfo.height}}
        </div>
        </div>
    </div>
</div>
</template>
