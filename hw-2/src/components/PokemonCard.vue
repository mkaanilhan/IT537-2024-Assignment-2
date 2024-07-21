<script>
import {usePokemonDetailStore} from "../stores/pokemonDetails.js"
export default {
    props: ["pokemon", "pokemonId"],
    data() {
        return {
            pokemonDetail:[],
            pokemonImgLink: "",
            store: usePokemonDetailStore()
        }
    },
    methods: {

    },
    async created() {
        const response = await fetch(this.pokemon.url)
        const res = await response.json()
        this.pokemonDetail = res
        this.pokemonImgLink = this.pokemonDetail.sprites.front_default
    }
}
</script>

<template>
<div class="flex justify-between mx-auto">
    <RouterLink :to="{ path: `/pokemon/${pokemon.name}/${pokemonId}`}">
        <div class="p-4 bg-gray-400 rounded-lg hover:bg-orange-500">
            <div class="p-4">
                <img :src="`${pokemonImgLink}`" class="w-32 h-32 mx-auto">
            </div>
            <div>
                <h1 class="text-xl font-bold text-center capitalize hover:text-white">
                    {{pokemon.name}}
                </h1>
            </div>
        </div>
    </RouterLink>
</div>
</template>
