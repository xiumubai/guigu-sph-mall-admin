import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'virtual:svg-icons-register'
import pinia from '@/store'
import { registerGlobComp } from '@/components'

const app = createApp(App)

registerGlobComp(app)

app.use(ElementPlus)

app.use(pinia)

app.mount('#app')
