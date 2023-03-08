/*
 * @Description:
 * @Autor: codeBo
 * @Date: 2023-03-02 14:02:23
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-03-08 15:01:01
 */
import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import pinia from '@/store'
import registerGlobComp from '@/components'
import router from '@/router'
// 引入暗黑模式 element-plus 2.2 内置暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/router/initDynamicRouter'

const app = createApp(App)

/** 导入全部Element-icon */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(registerGlobComp)

app.use(pinia)

app.use(router)

app.mount('#app')
