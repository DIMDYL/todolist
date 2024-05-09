// import './assets/main.css'
import '@/style/init.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'animate.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
