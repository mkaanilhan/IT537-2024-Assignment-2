<template>    
    <div class="flex flex-col gap-2 text-gray-200">
        <div class="flex justify-between align-bottom mb-4 text-white">
            <h1 class="text-4xl font-bold"> ⓘ </h1>
            <h1 class="text-2xl mt-1">{{ param.title }}</h1>
            <button @click="resetInfo" class="w-6 h-6 mt-2 rounded-full cursor-pointer font-bold bg-red-400"></button>
        </div>
        <div v-if="typeof param.desc === 'string'">
            <p>{{ param.desc }}</p>
        </div>
        <template v-else>
            <div v-if="param.desc.no_damage_from.length">
                <h3 class="text-md">No Damage From:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <TypeLabelComponent @update-info="updateInfo" v-for="type in param.desc.no_damage_from" :key="type" :param="type"/>
                </div>
            </div>
            <div v-if="param.desc.half_damage_from.length">
                <h3 class="text-md">Half Damage From:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <TypeLabelComponent @update-info="updateInfo" v-for="type in param.desc.half_damage_from" :key="type" :param="type"/>
                </div>
            </div>
            <div v-if="param.desc.double_damage_to.length">
                <h3 class="text-md">Double Damage To:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <TypeLabelComponent @update-info="updateInfo" v-for="type in param.desc.double_damage_to" :key="type" :param="type"/>
                </div>
            </div>
            <div v-if="param.desc.double_damage_from.length">
                <h3 class="text-md">Double Damage From:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <TypeLabelComponent @update-info="updateInfo" v-for="type in param.desc.double_damage_from" :key="type" :param="type"/>
                </div>
            </div>
            <div v-if="param.desc.half_damage_to.length">
                <h3 class="text-md">Half Damage To:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <TypeLabelComponent @update-info="updateInfo" v-for="type in param.desc.half_damage_to" :key="type" :param="type"/>
                </div>
            </div>
            <div v-if="param.desc.no_damage_to.length">
                <h3 class="text-md">No Damage To:</h3>
                <div class="flex flex-wrap gap-1 p-1">
                    <TypeLabelComponent @update-info="updateInfo" v-for="type in param.desc.no_damage_to" :key="type" :param="type"/>
                </div>
            </div>
        </template>    
    </div>
</template>

<script>
import LabelComponent from '../labels/LabelComponent.vue';
import TypeLabelComponent from '../labels/TypeLabelComponent.vue';

export default {
    name: 'InfoComponent',
    props: {
        param: {
            type: Object,
            required: true
        }
    },
    components: {
        LabelComponent,
        TypeLabelComponent
    },
    methods: {
        updateInfo(info) {
            this.$emit('update-info', info);
        },
        resetInfo() {
            this.$emit('update-info', null);
        }
    }
};
</script>

<style scoped>
</style>
