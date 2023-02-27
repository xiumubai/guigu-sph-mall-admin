/*
 * @Author: 朽木白
 * @Date: 2023-02-25 09:19:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-25 17:20:10
 * @Description: 动态路由
 */

import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 权限管理
  {
    name: 'Acl',
    path: '/acl',
    component: LAYOUT,
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock',
    },
    children: [
      {
        name: 'User',
        path: 'user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'Permission',
        path: 'permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
        },
      },
    ],
  },
]
