/*
 * @Author: 朽木白
 * @Date: 2023-02-24 10:49:44
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-25 14:15:40
 * @Description: 路由入口文件
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { staticRoutes } from './constantRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
