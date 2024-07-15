<template>
    <div class="p-8 rounded-lg text-gray-200 text-md bg-gray-800">
        <h2 class="text-2xl mb-4 text-white">Stats</h2>
        <table class="w-full">
            <tbody>
                <tr v-for="(value, key) in param" :key="key" class="text-gray-200 text-md">
                    <td class="flex"> {{ key }} </td>
                    <td class="flex items-center justify-center min-w-48 min-h-8"> 
                        <ProgressBarComponent :progress="value" /> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import ProgressBarComponent from '../labels/ProgressBarComponent.vue'

    export default {

        name: 'StatsComponent',

        components: {
            ProgressBarComponent
        },
        props: {
            param: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
</style>
