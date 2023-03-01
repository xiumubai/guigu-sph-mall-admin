import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import pinia from '@/store'
import registerGlobComp from '@/components'
import router from '@/router'

import '@/router/initDynamicRouter'

const app = createApp(App)

/** 导入全部Element-icon */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)

app.use(registerGlobComp)

app.use(pinia)

app.use(router)

app.mount('#app')
