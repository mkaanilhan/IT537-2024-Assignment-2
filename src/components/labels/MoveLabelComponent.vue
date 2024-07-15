<template>
    <LabelComponent @update-info="updateInfo" :text="param" :desc="this.effect" :bgColor="this.bgColor"/>
</template>

<script>

    import LabelComponent from './LabelComponent.vue'

    export default {
        name: 'MoveLabel',
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
                damageClass: null,
                type: null,
                effect: "",
                bgColor: "bg-transparent",
            }
        },
        methods: {
            async fetchMoveData() {
                try {
                    // fetch data
                    const api_base_url = 'https://pokeapi.co/api/v2/'
                    const move_response = await fetch(`${api_base_url}/move/${this.param}`);
                    const move_data = await move_response.json();

                    //update damage class
                    this.damageClass = move_data.damage_class.name;

                    // update type
                    this.type = move_data.type.name;

                    // update effect
                    const effect_entries = move_data.effect_entries.filter(entry => entry.language.name === 'en').map(entry => entry.effect);
                    this.effect = effect_entries[0];

                } catch (error) {
                    console.error('Error fetching ability data:', error);
                }
            },
            updateInfo(info) {
                this.$emit('update-info', info);
            }
        },
        mounted() {
            this.fetchMoveData();
        }
    }
</script>

<style scoped>
</style>
