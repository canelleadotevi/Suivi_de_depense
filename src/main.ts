
import {createPinia } from 'pinia'
import './assets/main.css'
import './assets/homeStyle.css'
import "./assets/js/bootstrap.min.js"
import { createApp } from 'vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast();
import 'vue-toast-notification/dist/theme-sugar.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
