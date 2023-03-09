/*
 * @Author: 朽木白
 * @Date: 2023-02-25 09:19:28
<<<<<<< Updated upstream
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-08 22:37:31
=======
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-03-06 16:34:48
>>>>>>> Stashed changes
 * @Description: 静态路由
 */

import { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config/config'

const LAYOUT = () => import('@/layouts/index.vue')

/**
 * @description 静态路由
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: LOGIN_URL,
    name: 'login',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/error/error-404.vue'),
  },
  {
    path: '/',
    name: 'LAYOUT',
    component: LAYOUT,
    redirect: HOME_URL,
    meta: {
      title: '首页',
      icon: 'HomeFilled',
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/echarts',
    component: LAYOUT,
    redirect: '/echarts/barEcharts',
    name: 'echarts',
    meta: {
      title: 'Echarts',
      icon: 'trend-charts',
      roles: ['other'],
    },
    children: [
      {
        path: '/barEcharts',
        component: () => import('@/views/echarts/barEcharts/index.vue'),
        name: 'bar',
        meta: { title: '柱状图', roles: ['other'], icon: 'Menu' },
      },
      {
        path: '/mapEcharts',
        component: () => import('@/views/echarts/mapEcharts/index.vue'),
        name: 'graph',
        meta: { title: '地图', roles: ['other'], icon: 'Menu' },
      },
    ],
  },
]

/**
 * @description 路由未找到
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '404',
}
