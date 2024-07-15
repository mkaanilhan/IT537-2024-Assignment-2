<template>
    <div @mouseover="startImageRotation" @mouseout="stopImageRotation">
        <router-link :to="{ path: `/pokemon/${name}` }">
            <button :class="['p-6 shadow-lg shadow-black rounded-xl', { 'bg-gray-800': !isHovered, 'bg-gray-700': isHovered, 'hover-outline': isHovered }]">
                <div class="flex justify-between items-center">
                    <div class="text-gray-400">
                        #{{ paddedId }}
                    </div>
                    <div class="flex gap-1 m-1.5">
                        <div v-for="(type, index) in types" :key="index">
                            <TypeIconComponent :param="type" />
                        </div>
                    </div>
                </div>
                <img :src="currentImage" alt="Card Image">
                <h2 class="text-xl font-bold text-white text-center">{{ name }}</h2>
            </button>
        </router-link>
    </div>
</template>



<script>

import TypeIconComponent from '../labels/TypeIconComponent.vue';

export default {
    name: 'CardComponent',

    props: {
        name: {
            type: String,
            required: true
        }
    },

    components: {
        TypeIconComponent
    },

    data() {
        return {
            id: null,
            isHovered: false,
            defaultImage: null,
            hoverImage: null,
            currentImage: null,
            imageInterval: null,
            types: null
        }
    },

    computed: {
        paddedId() {
            return this.id ? this.id.toString().padStart(4, '0') : '';
        }
    },

    methods: {
        async fetchPokemonData() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`);
                const data = await response.json();
                this.id = data.id;
                this.types = data.types.map(T => T.type.name);
                this.defaultImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
                this.hoverImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${this.id}.png`;
                this.currentImage = this.defaultImage; // Set initial image
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        },
        startImageRotation() {
            this.isHovered = true;
            this.currentImage = this.hoverImage;
            this.imageInterval = setInterval(() => {
                this.currentImage = (this.currentImage === this.defaultImage) ? this.hoverImage : this.defaultImage;
            }, 333); 
        },
        stopImageRotation() {
            this.isHovered = false;
            clearInterval(this.imageInterval);
            this.currentImage = this.defaultImage;
        }
    },

    mounted() {
        this.fetchPokemonData();
    },

    beforeDestroy() {
        clearInterval(this.imageInterval);
    }
}
</script>

<style scoped>

    .hover-outline {
        border: 2px solid yellow;
    }

</style>
