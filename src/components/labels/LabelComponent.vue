<template>
    <button @mouseover="addOutline" @mouseout="removeOutline" @click="updateInfo" 
    :class="['w-32 p-1 gap-1 flex justify-center rounded-lg border-2 text-white border-slate-200', bgColor, borderStyle, {'hover-outline': isHovered}]">
        <TypeIconComponent v-if="icon" :param="icon"/>
        <span class="flex-grow text-md">{{ text }}</span>
    </button>
</template>

<script>

import TypeIconComponent from './TypeIconComponent.vue';

export default {

    name: 'LabelComponent',
    props: {
        text: {
            type: String,
            required: true
        },
        desc: {
            required: true
        },
        icon: {
            type: String,
            default: null
        },
        bgColor: {
            type: String,
            default: 'bg-transparent'
        }, 
        borderStyle: {
            type: String,
            default: 'border-solid'
        }
    },
    components: {
        TypeIconComponent
    },
    data() {
        return {
            isHovered: false
        };
    },
    computed: {
        info(){
            return {title: this.text, desc: this.desc}
        }
    },
    methods: {
        addOutline() {
            this.isHovered = true;
        },
        removeOutline() {
            this.isHovered = false;
        },
        updateInfo() {
            this.$emit('update-info', this.info);
        }
    }
};
</script>

<style scoped>

    .hover-outline {
        border: 2px solid yellow;
    }

</style>