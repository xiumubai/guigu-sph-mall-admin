/*
 * @Author: 朽木白
 * @Date: 2023-02-25 09:19:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-04-19 15:14:00
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
    path: '/data-screen',
    name: 'DataScreen',
    component: () => import('@/views/data-screen/index.vue'),
    meta: {
      icon: 'DataLine',
      title: '数据大屏',
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: LAYOUT,
    redirect: '/test/list-v1',
    meta: {
      title: '测试页面',
      icon: 'ChatRound',
    },
    children: [
      {
        path: '/test/list-v1',
        name: 'List1',
        component: () => import('@/views/chatgpt/list-v1/index.vue'),
        meta: {
          title: '测试表格-v1',
          icon: 'Menu',
        },
      },
      {
        path: '/test/list-v2',
        name: 'List2',
        component: () => import('@/views/chatgpt/list-v2/index.vue'),
        meta: {
          title: '测试表格-v2',
          icon: 'Menu',
        },
      },
      {
        path: '/test/list-v3',
        name: 'List3',
        component: () => import('@/views/chatgpt/list-v3/index.vue'),
        meta: {
          title: '测试表格-v3',
          icon: 'Menu',
        },
      },
      {
        path: '/test/list-v4',
        name: 'List4',
        component: () => import('@/views/chatgpt/list-v4/index.vue'),
        meta: {
          title: '测试表格-v4',
          icon: 'Menu',
        },
      },
    ],
  },
  // 此路由防止控制台出现No match found for location with path的警告
  {
    path: '/:catchAll(.*)',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/error/error-404.vue'), //这个是我自己的路径
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
