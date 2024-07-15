<template>
    <div :class="['p-8 rounded-lg text-gray-200', bgColor]">
        <InfoComponent @update-info="updateInfo" v-if="info" :param="info" />
        <template v-else>
            <h2 class="text-2xl mb-4 text-white">Moves</h2>
                <div class="flex flex-wrap gap-1 p-1">
                    <MoveLabelComponent @update-info="updateInfo" v-for="move in paginatedMoves" :key="move" :param="move"/>
                </div>
                <div v-if="totalPages > 1" class="flex justify-center align-bottom gap-4 mt-8">
                    <div v-for="page in totalPages" :key="page" @click="setPage(page)" class="w-3 h-3 rounded-full cursor-pointer" :class="{'bg-gray-200': page === currentPage, 'bg-gray-700': page !== currentPage}"></div>
                </div>
        </template>
    </div>
</template>

<script>

    import InfoComponent from './InfoComponent.vue';

    import MoveLabelComponent from '../labels/MoveLabelComponent.vue';

    export default {
        name: 'MovesComponent',
        props: {
            param: {
                type: Array,
                required: true
            }
        },
        components: {
            MoveLabelComponent,
            InfoComponent
        },
        data() {
            return {
                info: null,
                currentPage: 1,
                itemsPerPage: 36
            }
        },
        computed: {
            bgColor() {
                return (this.info ? "bg-sky-900" : "bg-gray-800");
            },
            paginatedMoves() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.param.slice(start, end)
            },
            totalPages() {
                return Math.ceil(this.param.length / this.itemsPerPage);
            }
        },
        methods: {
            updateInfo(info) {
                this.info = info;
            },
            setPage(page) {
                this.currentPage = page;
            }
        }
    }
</script>

<style scoped>
</style>
