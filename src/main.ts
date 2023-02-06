import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'virtual:svg-icons-register'
import pinia from '@/store'
import registerGlobComp from '@/components'
import router from '@/router'

const app = createApp(App)

app.use(ElementPlus)

app.use(registerGlobComp)

app.use(pinia)

app.use(router)

app.mount('#app')
