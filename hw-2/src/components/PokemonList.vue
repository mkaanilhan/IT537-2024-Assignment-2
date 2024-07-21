<script>
import {
    usePokemonDetailStore
} from "../stores/pokemonDetails.js"
import PokemonCard from "../components/PokemonCard.vue"
export default {
    data() {

        return {
            pokemonList: [],
            defaultPage: {
                url: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
                state: true
            },
            store: usePokemonDetailStore(),
            nextUrl: "",
            nextPokemonList: []
        }
    },

    components: {
        PokemonCard,

    },
    methods: {
        async fetchPokemons() {
            const response = await fetch(this.defaultPage.url)
            this.defaultPage.state = false
            const res = await response.json()
            this.pokemonList = res.results
            this.nextUrl = res.next

        },
        async fetchMorePokemons() {
            const responseMore = await fetch(this.nextUrl)
            const resMore = await responseMore.json()
            this.nextUrl = resMore.next
            this.nextPokemonList = resMore.results
            for (let index = 0; index < this.nextPokemonList.length; index++) {
                const nextPokemon = this.nextPokemonList[index];
                this.addMorePokemons(nextPokemon)
            }

        },
        addMorePokemons(pokemonInfo) {
            this.pokemonList.push(pokemonInfo)
        }
    },
    created() {
        this.fetchPokemons()
    },
}
</script>

<template>
<div>

<div class="border border-black-2 p-2">
    <div class="grid grid-cols-5 grid-flow-row">
            {{this.store.removeAllList()}}
        <div v-for="(pokemonItem, index) in pokemonList" :key="index" class="mx-auto p-2">
            <PokemonCard :pokemon="pokemonItem" :pokemonId="index+1" />
            {{store.add(pokemonItem)}}
        </div>

    </div>
</div>
    <button class="p-2 bg-gray-400 rounded-lg text-white hover:bg-orange-500 mx-2 my-2" @click="fetchMorePokemons()">Load more</button>
</div>

</template>
