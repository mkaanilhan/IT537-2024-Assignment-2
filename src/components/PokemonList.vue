<script>
import PokemonCard from "../components/PokemonCard.vue"
export default {
    data() {
        return {
            pokemonList: [],
            nextUrl:"",
            previousUrl:""
        }
    },
    components: {
        PokemonCard,
    },
    methods: {

    },
    async created() {

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=10')
        const res = await response.json()
        const pokemonData = await res.results
        this.pokemonList = pokemonData
        this.nextUrl = res.next
        this.previousUrl = res.previous
    }
}
</script>

<template>

<div v-for="(pokemonItem, index) in pokemonList" class="p-4">
    <PokemonCard :pokemonName='pokemonItem.name' :pokemonId="index+1" />
</div>

<div class="container flex justify-between gap-4 mx-auto">

    <button class="p-4 bg-gray-400 rounded-lg mx-auto">
    Previous --{{previousUrl}}
    </button>
    <button class="p-4 bg-gray-400 rounded-lg mx-auto">
    Next -- {{nextUrl}}
    </button>

</div>

</template>
