<script lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    submit() {
      this.v$.$validate();
      if (this.v$.$error) {
        console.log("Validation error");
        return;
      }
      console.log("Validation success");
    },
  },
};
</script>
<template lang="pug">

form(class="flex flex-col w-[300px] m-auto items-center space-y-5 justify-center h-[calc(100vh-130px)]")
    input(type="text" placeholder="Email" class="p-3 border w-full")
    input(type="password" placeholder="Password" class="p-3 border w-full")
    button(type="submit" class="border p-3 w-full bg-black text-white cursor-pointer") Login

</template>

<style lang=""></style>
