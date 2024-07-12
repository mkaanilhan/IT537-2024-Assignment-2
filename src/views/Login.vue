<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";

const state = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const submit = () => {
  v$.value.$touch();
  if (v$.value.$error) {
    console.log(v$.value.$silentErrors.values());
    console.log("error");
    return;
  }
  console.log("success");
};
</script>

<template lang="pug">

form(class="flex flex-col w-[300px] m-auto items-center space-y-5 justify-center h-[calc(100vh-130px)]" @submit.prevent="submit")
    input(type="text" placeholder="Email" class="p-3 border w-full focus:outline-none" v-model="state.email")
    input(type="password" placeholder="Password" class="p-3 border w-full focus:outline-none" v-model="state.password")
    button(type="submit" class="border p-3 w-full bg-black text-white cursor-pointer border-none") Login

</template>

<style lang=""></style>
