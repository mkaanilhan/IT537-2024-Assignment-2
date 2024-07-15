<script>
    import Router from './router/index.js'
    import HeaderComponent from './components/cards/HeaderComponent.vue'

    export default{

        name:"YAPA",

        components: {
            HeaderComponent,
        }
    }
</script>

<template>
    <body class="bg-slate-900">

        <HeaderComponent />
        
        <RouterView />
    </body>
</template>

<style>
</style>
