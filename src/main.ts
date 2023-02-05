import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'virtual:svg-icons-register'
import pinia from '@/store'
createApp(App).use(ElementPlus).use(pinia).mount('#app')
