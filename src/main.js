import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import Chat from 'vue3-beautiful-chat'


const app = createApp(App)

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

app.use(ElementPlus)

app.use(router)
app.use(store)
app.use(Chat)

app.use(store).mount('#app')