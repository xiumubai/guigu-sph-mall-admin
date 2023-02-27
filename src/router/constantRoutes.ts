/*
 * @Author: 朽木白
 * @Date: 2023-02-25 09:19:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-25 21:51:24
 * @Description: 静态路由
 */

import { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config/config'

const LAYOUT = () => import('@/layouts/index.vue')

/**
 * @description 静态路由
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/error-404.vue'),
  },
  {
    path: '/',
    component: LAYOUT,
    redirect: HOME_URL,
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: { name: '404' },
  },
]

/**
 * @description 路由未找到
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: { name: '404' },
}
