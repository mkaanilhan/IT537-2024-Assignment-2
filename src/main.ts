import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "vue-query";
import { plugin, defaultConfig } from "@formkit/vue";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(plugin, defaultConfig);

app.mount("#app");
