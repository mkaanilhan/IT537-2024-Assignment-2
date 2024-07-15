<template>
    <div class="flex flex-col bg-gray-800 rounded-xl p-8 text-center justify-center">
        <img :src="currentImage" alt="Pokemon Image" class="size-auto mb-4 self-center">
        <div class="flex justify-center items-center mt-4">
            <input type="checkbox" id="shiny" v-model="isShiny" class="hidden">
            <label for="shiny" class="w-3 h-3 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center" title="Toggle Shiny">
                <div v-if="isShiny" class="w-3 h-3 bg-gray-200 rounded-full" title="Toggle Default"></div>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageComponent',
    props: {
        param: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isShiny: false
        };
    },
    computed: {
        currentImage() {
            return this.isShiny ? this.param.shiny : this.param.default;
        }
    }
};
</script>

<style scoped>
</style>
