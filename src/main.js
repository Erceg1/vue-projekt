import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css' // Ovdje mora biti import, a ne u routeru!

const app = createApp(App)
app.use(router)
app.mount('#app')
