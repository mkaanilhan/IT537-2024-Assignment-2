<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import logo from "./assets/pngegg.png";
import "./assets/main.css";
import "./index.css";
</script>

<template lang="pug">

header(class="bg-gray-800 text-white  flex justify-between items-center px-10")
    .logo
        img(:src="logo" alt="Vue logo" width="70" height="50")
    nav(class="flex space-x-5") 
        RouterLink(to="/") Home
        RouterLink(to="/login") Login

RouterView
footer(class="bg-gray-800 text-white flex justify-center items-center p-5")
  p(class="text-sm") © 2024 Pokemon  - Hakan KARAYILMAZ

</template>
