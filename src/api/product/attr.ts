/*
 * @Author: 朽木白
 * @Date: 2023-03-18 11:06:15
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-18 11:09:25
 * @Description: 商品属性相关的接口
 */

import http from '@/utils/http'
import type { UserRes } from './types'

/**
 * 获取属性列表
 */
export function getlist() {
  return http.get<UserRes>('/admin/acl/index/info')
}

/**
 * 获取属性值列表
 */
export function getAttrList(attrId: string) {
  return http.get<UserRes>(`/admin/product/getAttrValueList/${attrId}`)
}
