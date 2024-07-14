<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import logo from "./assets/pngegg.png";
import "./assets/main.css";
import "./index.css";
import { onMounted, ref } from "vue";
import { checkUser } from "@/utils/utils";
import { logOutUser } from "@/service/service";

const isSessionExist = ref(false);

onMounted(() => {
  isSessionExist.value = checkUser();
});

const handleClick = () => {
  window.location.href = "/";
};
</script>

<template lang="pug">

header(class="bg-gray-800 bg-opacity-40 text-white  flex justify-between items-center px-10")
    div
      img(:src="logo" alt="Vue logo" width="70" height="50" class="cursor-pointer" @click="handleClick")
    nav(class="flex space-x-5") 
        RouterLink(to="/") Home
        RouterLink(v-if="!isSessionExist" to="/login") Login
        span(v-if="isSessionExist") Welcome
        span(v-if="isSessionExist" @click="logOutUser" class="cursor-pointer") Log Out
      

RouterView
footer(class="bg-gray-800 bg-opacity-40 text-white flex justify-center items-center p-5")
  p(class="text-sm") © 2024 Pokemon  - Hakan KARAYILMAZ

</template>
