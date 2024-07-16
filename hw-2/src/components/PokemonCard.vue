<script>
export default {
    props: ["pokemonName", "pokemonId"],
    data() {
        return {

        }
    },
}
</script>

<template>


<RouterLink to="/pokemon">

    <div class="container flex justify-between mx-auto">

        <div class="p-4 bg-gray-400 rounded-lg hover:bg-orange-500">

            <div class="p-4">
                <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`" class="w-32 h-32 mx-auto">
            </div>

            <div class="p-4">
                <h1 class="text-xl font-bold text-center capitalize hover:text-white">
                    {{pokemonName}}
                </h1>

            </div>

        </div>

    </div>

</RouterLink>
</template>
