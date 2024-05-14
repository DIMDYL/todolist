// import './assets/main.css'
import '@/style/init.css'
import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import '@/assets/ali/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css'
import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
