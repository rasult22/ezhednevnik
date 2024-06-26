import './assets/main.css'
import '@fontsource/ubuntu'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import { initSafeArea } from './utils/safeArea'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
initSafeArea()

app.mount('#app')
