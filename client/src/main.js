import './style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import createPersistedState from 'pinia-plugin-persistedstate'
const { VITE_API_URL: API_URL  } = import.meta.env

import App from './App.vue'
import router from './router'
import axios from 'axios'

window.axios = axios

window.axios.defaults.baseURL = API_URL || 'http://localhost/api'
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.headers.common['x-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// window.axios.defaults.withCredentials = true;


const pinia = createPinia()
pinia.use(({store})=> {
    store.router = markRaw(router)
});

pinia.use(createPersistedState)

const app = createApp(App)

app.use(pinia)

app.use(router)

app.mount('#app')
