// import './assets/main.css'
import '@/style/init.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/ali/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
