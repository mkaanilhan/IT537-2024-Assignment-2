<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getImageUrl } from "@/utils/utils";
import _ from "lodash";

const { name, url } = defineProps({
  name: String,
  url: String,
});

const imageUrl = ref("");
const detailsUrl = ref("");

onMounted(() => {
  const pokemonIndex = parseInt(
    (url as string)?.split("/")?.[(url as string).split("/").length - 2] ?? "0"
  );
  detailsUrl.value = `/pokemon/${pokemonIndex}`;
  imageUrl.value = getImageUrl(pokemonIndex);
});
</script>

<template lang="pug">

RouterLink(:to="detailsUrl" class="bg-white bg-opacity-25 p-5 rounded-lg flex flex-col shadow-2xl items-center cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out")
  img(:src="imageUrl" alt="Vue logo" width="70" height="50")
  p(class="text-black") {{ _.capitalize(name) }}

</template>

<style></style>
