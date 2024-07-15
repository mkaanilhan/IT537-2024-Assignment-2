<template>
    <div class="flex justify-center p-8">
        <div class="w-2/3">
            <div class="grid gap-8 grid-cols-1 2xl:grid-cols-2">
                <ImageComponent :param="images" />
                <BasicComponent :param="basics" />
                <StatsComponent :param="stats" />
                <MovesComponent :param="moves" />
            </div>
        </div>
    </div>
</template>

<script>

    import ImageComponent from '../components/cards/ImageComponent.vue'
    import StatsComponent from '../components/cards/StatsComponent.vue'
    import BasicComponent from '../components/cards/BasicsComponent.vue'
    import MovesComponent from '../components/cards/MovesComponent.vue'

    export default {

        name: 'Pokemon Details',
        
        components: {
            ImageComponent,
            StatsComponent,
            BasicComponent,
            MovesComponent
        },

        data() {

            return {
                basics: {},
                images: {},
                stats: {},
                moves: [],
                cries: null,
            }

        },

        computed: {

            name() {
                    return this.$route.params.name;
                },

            paddedId() {
                return this.id ? this.id.toString().padStart(4, '0') : '';
            }

        },

        methods: {

            async fetchPokemonData() {
                try {

                    // fetch data
                    const api_base_url = 'https://pokeapi.co/api/v2/'
                    const pokemon_response = await fetch(`${api_base_url}/pokemon/${this.name}`);
                    const pokemon_data = await pokemon_response.json();

                    // basics
                    this.basics.id = pokemon_data.id;
                    this.basics.name = pokemon_data.name;
                    this.basics.types = pokemon_data.types.map(T => T.type.name);
                    this.basics.base_experience = pokemon_data.base_experience;
                    this.basics.weight = pokemon_data.weight;
                    this.basics.height = pokemon_data.height;
                    this.basics.abilities = pokemon_data.abilities;
                    this.basics.species_url = pokemon_data.species.url;              

                    // images
                    const image_repo = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
                    this.images.default = `${image_repo}/${this.basics.id}.png`;
                    this.images.shiny = `${image_repo}/shiny/${this.basics.id}.png`;
                    
                    // stats
                    this.stats = pokemon_data.stats.reduce((acc, stat) => {acc[stat.stat.name] = stat.base_stat; return acc;}, {});

                    // moves
                    this.moves = pokemon_data.moves.map(entry => entry.move.name);
                    
                    //other
                    this.cries = pokemon_data.cries;

                } catch (error) {
                    console.error('Error fetching Pokémon data:', error);
                }
            }
        },

        beforeMount() {
            this.fetchPokemonData();
        },
    }

</script>