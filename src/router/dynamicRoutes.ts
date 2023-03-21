/*
 * @Author: 朽木白
 * @Date: 2023-02-25 09:19:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-21 14:27:41
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
      icon: 'Lock',
    },
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
  },
  // 商品管理
  {
    name: 'Product',
    path: '/product',
    component: LAYOUT,
    redirect: '/product/attr',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    children: [
      {
        name: 'Attr',
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Trademark',
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Category',
        path: '/product/category',
        component: () => import('@/views/product/category/index.vue'),
        meta: {
          title: '分类列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Spu',
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'spu列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'sku列表',
          icon: 'Grid',
        },
      },
    ],
  },
  // 营销管理
  {
    name: 'Marketing',
    path: '/marketing',
    component: LAYOUT,
    redirect: '/marketing/attr',
    meta: {
      title: '营销管理',
      icon: 'Coin',
    },
    children: [
      {
        name: 'Activity',
        path: '/marketing/activity',
        component: () => import('@/views/marketing/activity/index.vue'),
        meta: {
          title: '活动管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Coupon',
        path: '/marketing/coupon',
        component: () => import('@/views/marketing/coupon/index.vue'),
        meta: {
          title: '优惠券管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Seckill',
        path: '/marketing/seckill',
        component: () => import('@/views/marketing/seckill/index.vue'),
        meta: {
          title: '秒杀管理',
          icon: 'Grid',
        },
      },
    ],
  },
  // 客户管理
  {
    name: 'ClientUser',
    path: '/client-user',
    component: LAYOUT,
    redirect: '/client-user/attr',
    meta: {
      title: '客户管理',
      icon: 'User',
    },
    children: [
      {
        name: 'UserList',
        path: '/client-user/list',
        component: () => import('@/views/client-user/list/index.vue'),
        meta: {
          title: '客户列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Label',
        path: '/client-user/label',
        component: () => import('@/views/client-user/label/index.vue'),
        meta: {
          title: '客户标签',
          icon: 'Grid',
        },
      },
      {
        name: 'Level',
        path: '/client-user/level',
        component: () => import('@/views/client-user/level/index.vue'),
        meta: {
          title: '客户等级',
          icon: 'Grid',
        },
      },
    ],
  },
  // 订单管理
  {
    name: 'Order',
    path: '/order',
    component: LAYOUT,
    redirect: '/order/list',
    meta: {
      title: '订单管理',
      icon: 'ShoppingTrolley',
    },
    children: [
      {
        name: 'OrderList',
        path: '/order/list',
        component: () => import('@/views/order/list/index.vue'),
        meta: {
          title: '订单列表',
          icon: 'Grid',
        },
      },
      {
        name: 'Label',
        path: '/order/label',
        component: () => import('@/views/order/refund/index.vue'),
        meta: {
          title: '退款管理',
          icon: 'Grid',
        },
      },
    ],
  },
  // 系统管理
  {
    name: 'Setting',
    path: '/setting',
    component: LAYOUT,
    redirect: '/setting/banner',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    children: [
      {
        name: 'Banner',
        path: '/setting/banner',
        component: () => import('@/views/setting/banner/index.vue'),
        meta: {
          title: 'banner管理',
          icon: 'Grid',
        },
      },
      {
        name: 'Notification',
        path: '/setting/notification',
        component: () => import('@/views/setting/notification/index.vue'),
        meta: {
          title: '消息通知管理',
          icon: 'Grid',
        },
      },
    ],
  },
]
