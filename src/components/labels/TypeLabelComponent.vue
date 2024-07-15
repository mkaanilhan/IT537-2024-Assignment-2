<template>
    <LabelComponent @update-info="updateInfo" :text="this.param" :icon="this.param" :desc="this.damage_relations" :bgColor="this.bgColor"/>
</template>

<script>

    import LabelComponent from './LabelComponent.vue'

    export default {
        name: 'TypeLabel',
        props: {
            param: {
                type: String,
                required: true
            }
        },
        components: {
            LabelComponent
        },
        data() {
            return {
                damage_relations: {},
                //%25 darker colors computed via tinycolor2
                darkColorMap: {                  
                    bug: 'bg-[#425514]',
                    dark: 'bg-[#1b1b1e]',
                    dragon: 'bg-[#052a50]',
                    electric: 'bg-[#b39a0d]',
                    fire: 'bg-[#c36504]',
                    fairy: 'bg-[#dd22cd]',
                    fighting: 'bg-[#791c2f]',
                    flying: 'bg-[#376ed7]',
                    ghost: 'bg-[#2e376e]',
                    grass: 'bg-[#2f6b2a]',
                    ground: 'bg-[#8b411d]',
                    ice: 'bg-[#329383]',
                    normal: 'bg-[#60625f]',
                    poison: 'bg-[#732a88]',
                    psychic: 'bg-[#f2110a]',
                    rock: 'bg-[#917f43]',
                    steel: 'bg-[#2a4950]',
                    water: 'bg-[#1c5d96]'
                }
            }
        },
        computed: {
            bgColor() {
                return this.darkColorMap[this.param] || 'bg-gray-600';
            } 
        },
        methods: {
            async fetchTypeData() {
                try {
                    // fetch data
                    const api_base_url = 'https://pokeapi.co/api/v2/'
                    const type_response = await fetch(`${api_base_url}/type/${this.param}`);
                    const type_data = await type_response.json();

                    // update damage relations
                    this.damage_relations['double_damage_from'] = type_data.damage_relations.double_damage_from.map(entry => entry.name);
                    this.damage_relations['double_damage_to'] = type_data.damage_relations.double_damage_to.map(entry => entry.name);
                    this.damage_relations['half_damage_from'] = type_data.damage_relations.half_damage_from.map(entry => entry.name);
                    this.damage_relations['half_damage_to'] = type_data.damage_relations.half_damage_to.map(entry => entry.name);
                    this.damage_relations['no_damage_from'] = type_data.damage_relations.no_damage_from.map(entry => entry.name);
                    this.damage_relations['no_damage_to'] = type_data.damage_relations.no_damage_to.map(entry => entry.name);                    
                } catch (error) {
                    console.error('Error fetching ability data:', error);
                }
            },
            updateInfo(info) {
                this.$emit('update-info', info);
            }
        },
        mounted() {
            this.fetchTypeData();
        }
    }
</script>

<style scoped>

    @import '../pokemon-types/pokemon-types.css';

</style>
