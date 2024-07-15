<template>
    <div :class="['p-8 rounded-lg text-gray-200 text-md', bgColor]">
        <InfoComponent @update-info="updateInfo" v-if="info" :param="info" />
        <template v-else>
            <div class="flex justify-between">
                <h1 class="text-4xl mb-4 text-yellow-300">{{ param.name }}</h1>
                <h1 class="mb-4 text-gray-400">#{{ paddedId }}</h1>
            </div>
            <p> {{ flavor_text }}</p>
            <div class="flex justify-between">
                <div class="mt-4">
                    <h3>Weight:</h3>
                    <p>{{ param.weight/10 }} kg</p>
                </div>
                <div class="mt-4">
                    <h3>Height:</h3>
                    <p>{{ param.height*10 }} cm</p>
                </div>
                <div></div>
                <div></div>
            </div>
            <div class="mt-4">
                <h3 class="text-xl">Abilities:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <AbilityLabelComponent @update-info="updateInfo" v-for="ability in param.abilities" :key="ability.ability.name" :param="ability"/>
                </div>
            </div>
            <div class="mt-4">
                <h3 class="text-xl">Types:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <TypeLabelComponent @update-info="updateInfo" v-for="type in param.types" :key="type" :param="type"/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

    import InfoComponent from './InfoComponent.vue';

    import LabelComponent from '../labels/LabelComponent.vue';
    import AbilityLabelComponent from '../labels/AbilityLabelComponent.vue';
    import TypeLabelComponent from '../labels/TypeLabelComponent.vue';

    export default {
        name: 'BasicsComponent',
        props: {
            param: {
                type: Object,
                required: true
            }
        },
        components: {
            LabelComponent,
            AbilityLabelComponent,
            TypeLabelComponent,
            InfoComponent
        },
        data() {
            return {
                flavor_text: "",
                pokedox_number: 0,
                info: null,
            }
        },
        computed: {
            bgColor() {
                return (this.info ? "bg-sky-900" : "bg-gray-800");
            },
            paddedId() {
                return this.param.id ? this.param.id.toString().padStart(4, '0') : '';
            }
        },
        methods: {
            async fetchSpeciesData(url) {
                try {
                    // fetch data
                    const species_response  = await fetch(`${url}`);
                    const species_data = await species_response.json();

                    // national pokedox number
                    this.pokedox_number = species_data.pokedex_numbers.filter(entry => entry.pokedex.name === 'national').map(entry => entry.entry_number)[0];

                    // choose a flavor
                    const flavor_text_entries = species_data.flavor_text_entries.filter(entry => entry.language.name === 'en').map(entry => entry.flavor_text);
                    this.flavor_text = (flavor_text_entries.length > 0 
                                        ? flavor_text_entries[Math.floor(Math.random() * flavor_text_entries.length)] 
                                        : "")
                                       .replace(/\f/g, ' ');
                } catch (error) {
                    console.error('Error fetching species data:', error);
                }
            },
            updateInfo(info) {
                this.info = info;
            },
            resetInfo() {
                this.info = null
            }      
        },
        updated() {
            if (this.param.species_url && this.pokedox_number === 0) {
                this.fetchSpeciesData(this.param.species_url);
            }
        }
    }
</script>

<style scoped>
</style>
