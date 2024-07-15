<template>
    <LabelComponent @update-info="updateInfo" :text="param.ability.name" :desc="this.effect" :bgColor="this.bgColor" :borderStyle="this.borderStyle"/>
</template>

<script>

    import LabelComponent from './LabelComponent.vue'

    export default {
        name: 'AbilityLabel',
        props: {
            param: {
                type: Object,
                required: true
            }
        },
        components: {
            LabelComponent
        },
        data() {
            return {
                effect: "",
                bgColor: "bg-slate-600",
                borderStyle: 'border-solid'
            }
        },
        methods: {
            async fetchAbilityData() {
                try {
                    // fetch data
                    const api_base_url = 'https://pokeapi.co/api/v2/'
                    const ability_response = await fetch(`${api_base_url}/ability/${this.param.ability.name}`);
                    const ability_data = await ability_response.json();

                    // update effect
                    const effect_entries = ability_data.effect_entries.filter(entry => entry.language.name === 'en').map(entry => entry.effect);
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
            this.fetchAbilityData();
            this.bgColor = this.param.is_hidden ? "bg-transparent" : "bg-slate-600";
            this.borderStyle = this.param.is_hidden ? "border-dashed" : "border-solid";
        }
    }
</script>

<style scoped>
</style>
