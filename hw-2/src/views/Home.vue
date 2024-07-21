<script>
import HomeHeader from "../components/HomeHeader.vue"
import PokemonList from "../components/PokemonList.vue"
export default {
    data() {
        return {

            test: null

        }
    },
    components: {
        HomeHeader,
        PokemonList
    },
}
</script>
<template>
<div>

<div class="mx-auto w-640 my-4 p-2">
    <HomeHeader />
</div>

<div class="mx-auto w-640 my-4 p-2">
    <PokemonList />
</div>

</div>

</template>
