import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'  // This imports main.css, which in turn imports tailwind.css

createApp(App).use(router).mount('#app')