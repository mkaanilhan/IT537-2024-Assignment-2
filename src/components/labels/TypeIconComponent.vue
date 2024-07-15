<template>
    <img :class="`w-6 h-6 icon ${param}`" :src="`/src/components/pokemon-types/${this.param}.svg`" :title="param">
</template>

<script>
    export default {
        name: 'TypeIconComponent',

        props: {
            param: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

    @import '../pokemon-types/pokemon-types.css';

</style>
